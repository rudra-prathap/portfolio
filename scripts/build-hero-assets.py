#!/usr/bin/env python3
"""
scripts/build-hero-assets.py

Builds hero video and portrait assets from raw intro video:
1. Tight crop & center person (head to toe) -> 768x960 (4:5 ratio).
2. Background whitening via colorlevels.
3. Seamless 7.5s video/audio looping:
   - xfade on video (0.5s transition)
   - Sample-accurate numpy linear crossfade on audio
4. Exports:
   - public/hero/hero.mp4 (H.264 yuv420p, CRF 24, AAC 96k, +faststart)
   - public/hero/hero.webm (VP9, CRF 36, Opus 80k)
5. Exports:
   - public/portrait-bust.webp (480x600 head-to-shirt)
   - public/og.jpg (1200x630 OpenGraph card)
   - public/resume.pdf (copied from original resume)
"""

import os
import sys
import shutil
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def get_ffmpeg_cmd():
    # Check if ffmpeg is in path
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        raise RuntimeError("ffmpeg not found in PATH or imageio_ffmpeg")

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    default_src = r"c:\Users\Admin\Downloads\New folder\Intro.mp4"
    src_video = sys.argv[1] if len(sys.argv) > 1 else default_src
    
    if not os.path.exists(src_video):
        print(f"Error: source video not found at {src_video}")
        sys.exit(1)

    ffmpeg = get_ffmpeg_cmd()
    print(f"Using ffmpeg: {ffmpeg}")
    print(f"Source video: {src_video}")

    os.makedirs(os.path.join(root_dir, "public", "hero"), exist_ok=True)
    os.makedirs(os.path.join(root_dir, "temp_build"), exist_ok=True)
    temp_dir = os.path.join(root_dir, "temp_build")

    # 1. Video and audio specs
    # Source is 1280x720, 24fps, duration 8.0s, audio 48000Hz stereo.
    # Person center is at x=632. Full height is 720.
    # 4:5 aspect ratio crop: w = 576, h = 720, x = 344, y = 0.
    # Scaled to 768x960.
    # Whitened: colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
    
    sr = 48000
    fade_dur = 0.5
    fade_samples = int(fade_dur * sr) # 24000
    total_dur = 8.0
    loop_dur = 7.5
    loop_samples = int(loop_dur * sr) # 360000

    print("--- 1. Processing sample-accurate audio cross-fade in numpy ---")
    raw_orig_path = os.path.join(temp_dir, "audio_orig.raw")
    subprocess.run([
        ffmpeg, "-y", "-i", src_video,
        "-f", "f32le", "-acodec", "pcm_f32le", "-ar", str(sr), "-ac", "2",
        raw_orig_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    raw_audio = np.fromfile(raw_orig_path, dtype=np.float32).reshape(-1, 2)
    # Stream 1: 0.5s to 8.0s (samples [fade_samples : fade_samples + loop_samples])
    stream1 = raw_audio[fade_samples:fade_samples + loop_samples]
    # Stream 2: 0.0s to 0.5s (samples [0 : fade_samples])
    stream2 = raw_audio[:fade_samples]

    offset_samples = loop_samples - fade_samples
    unfaded = stream1[:offset_samples]
    tail1 = stream1[offset_samples:]

    # Linear crossfade weight
    w = np.linspace(0.0, 1.0, fade_samples, endpoint=False, dtype=np.float32)[:, None]
    blended = (1.0 - w) * tail1 + w * stream2
    loop_audio = np.vstack([unfaded, blended])

    raw_loop_path = os.path.join(temp_dir, "audio_loop.raw")
    loop_audio.tofile(raw_loop_path)
    print(f"Audio processed: {len(loop_audio)} samples ({len(loop_audio)/sr:.2f}s)")

    print("--- 2. Processing video loop with xfade ---")
    # Video xfade:
    # Full clip filtered: crop=576:720:344:0,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
    # Trim 1: start=0.5 to 8.0 -> duration 7.5s
    # Trim 2: start=0.0 to 0.5 -> duration 0.5s
    # xfade: duration=0.5, offset=7.0
    video_loop_path = os.path.join(temp_dir, "video_loop.mp4")
    filter_complex = (
        "[0:v]crop=576:720:344:0,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,split=2[vf1][vf2];"
        "[vf1]trim=start=0.5:end=8.0,setpts=PTS-STARTPTS,fps=24[v1];"
        "[vf2]trim=start=0.0:end=0.5,setpts=PTS-STARTPTS,fps=24[v2];"
        "[v1][v2]xfade=transition=fade:duration=0.5:offset=7.0,format=yuv420p[vout]"
    )

    subprocess.run([
        ffmpeg, "-y", "-i", src_video,
        "-filter_complex", filter_complex,
        "-map", "[vout]",
        "-c:v", "libx264", "-crf", "20", "-preset", "slow",
        video_loop_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Video loop rendered.")

    print("--- 3. Merging and exporting hero.mp4 & hero.webm ---")
    out_mp4 = os.path.join(root_dir, "public", "hero", "hero.mp4")
    subprocess.run([
        ffmpeg, "-y",
        "-i", video_loop_path,
        "-f", "f32le", "-ar", str(sr), "-ac", "2", "-i", raw_loop_path,
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        out_mp4
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Exported: {out_mp4} ({os.path.getsize(out_mp4)} bytes)")

    out_webm = os.path.join(root_dir, "public", "hero", "hero.webm")
    subprocess.run([
        ffmpeg, "-y",
        "-i", video_loop_path,
        "-f", "f32le", "-ar", str(sr), "-ac", "2", "-i", raw_loop_path,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        out_webm
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Exported: {out_webm} ({os.path.getsize(out_webm)} bytes)")

    print("--- 4. Generating portrait-bust.webp (480x600) ---")
    bust_path = os.path.join(root_dir, "public", "portrait-bust.webp")
    subprocess.run([
        ffmpeg, "-y", "-ss", "00:00:00.8", "-i", src_video,
        "-vf", "crop=576:720:344:0,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,crop=480:600:144:15",
        "-vframes", "1",
        bust_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Exported: {bust_path} ({os.path.getsize(bust_path)} bytes)")

    print("--- 5. Generating og.jpg (1200x630) ---")
    og_path = os.path.join(root_dir, "public", "og.jpg")
    # Build clean editorial OG image
    og_img = Image.new("RGB", (1200, 630), "#f4f2ee")
    bust_img = Image.open(bust_path).convert("RGBA")
    # Resize bust to fit right side nicely
    bust_scaled = bust_img.resize((424, 530), Image.Resampling.LANCZOS)
    og_img.paste(bust_scaled, (700, 50), bust_scaled)

    draw = ImageDraw.Draw(og_img)
    # Draw typography
    # In case default font is used, draw clean text
    try:
        font_large = ImageFont.truetype(os.path.join(root_dir, "src", "fonts", "InterTight-VariableFont_wght.woff2"), 56)
        font_sub = ImageFont.truetype(os.path.join(root_dir, "src", "fonts", "InstrumentSerif-Italic.ttf"), 38)
        font_mono = ImageFont.truetype(os.path.join(root_dir, "src", "fonts", "JetBrainsMono-VariableFont_wght.woff2"), 18)
    except Exception:
        font_large = ImageFont.load_default()
        font_sub = font_large
        font_mono = font_large

    draw.text((90, 120), "01 / PORTFOLIO", fill="#77756f", font=font_mono)
    draw.text((90, 170), "Panjam Rudra\nPrathap", fill="#0d0d0d", font=font_large)
    draw.text((90, 320), "Full Stack Developer", fill="#3a3a3a", font=font_sub)
    draw.text((90, 420), "Computer Science Engineering · Network Engineering · Web Dev", fill="#77756f", font=font_mono)
    draw.text((90, 460), "Madanapalle Institute of Technology & Science", fill="#a9a6a0", font=font_mono)

    og_img.save(og_path, quality=92)
    print(f"Exported: {og_path} ({os.path.getsize(og_path)} bytes)")

    print("--- 6. Copying resume.pdf to public/ ---")
    resume_src = r"c:\Users\Admin\Downloads\New folder\RUDRA_RESUME.pdf"
    resume_dst = os.path.join(root_dir, "public", "resume.pdf")
    if os.path.exists(resume_src):
        shutil.copyfile(resume_src, resume_dst)
        print(f"Copied resume to: {resume_dst}")

    # Clean up temp
    shutil.rmtree(temp_dir, ignore_errors=True)
    print("Done building hero assets!")

if __name__ == "__main__":
    main()
