# How to Convert MP3 to WAV for the Ethnomusicology App

## Quick Start (macOS)

### Using Homebrew + FFmpeg
```bash
# Install FFmpeg (one-time setup)
brew install ffmpeg

# Convert single MP3 to WAV
ffmpeg -i yourfile.mp3 yourfile.wav

# Example
ffmpeg -i song.mp3 song.wav
```

### Batch Convert All MP3s
```bash
# Convert all MP3s in current folder
for f in *.mp3; do ffmpeg -i "$f" "${f%.mp3}.wav"; done
```

---

## Installation & Setup

### macOS (Recommended Method)

#### Method 1: Homebrew (Easiest)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install FFmpeg
brew install ffmpeg

# Verify installation
ffmpeg -version
```

#### Method 2: Direct Download
1. Go to https://ffmpeg.org/download.html
2. Download macOS build
3. Extract and add to PATH, or use full path when running

### Windows

#### Method 1: Chocolatey
```bash
choco install ffmpeg
```

#### Method 2: Direct Download
1. Go to https://ffmpeg.org/download.html
2. Download Windows build
3. Extract to a folder
4. Add to PATH or use full path

### Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ffmpeg

# Fedora
sudo dnf install ffmpeg

# CentOS
sudo yum install ffmpeg
```

---

## Basic Conversions

### Convert Single File
```bash
ffmpeg -i input.mp3 output.wav
```

### Convert with Specific Quality
```bash
# High quality (44.1 kHz, 16-bit)
ffmpeg -i input.mp3 -acodec pcm_s16le -ar 44100 output.wav

# Standard quality (sample rate maintained)
ffmpeg -i input.mp3 -c:a pcm_s16le -ar 44100 output.wav
```

### Show File Information
```bash
ffprobe input.mp3
```

---

## Advanced Conversions

### Trim Audio (First 30 seconds)
```bash
ffmpeg -i input.mp3 -t 30 output.wav
```

### Convert All MP3s in Folder
```bash
# macOS/Linux
for f in *.mp3; do ffmpeg -i "$f" "${f%.mp3}.wav"; done

# Windows (PowerShell)
Get-ChildItem *.mp3 | ForEach-Object { ffmpeg -i $_ "$($_.BaseName).wav" }
```

### Normalize Audio (Prevent Clipping)
```bash
ffmpeg -i input.mp3 -af loudnorm output.wav
```

### Convert to Different Sample Rate
```bash
# Convert to 16 kHz (for smaller file)
ffmpeg -i input.mp3 -ar 16000 output.wav

# Convert to 48 kHz (for higher quality)
ffmpeg -i input.mp3 -ar 48000 output.wav
```

---

## Alternative Tools

### Audacity (GUI - No Command Line Needed)
1. Open Audacity (https://www.audacityteam.org/)
2. File → Open → Select MP3
3. File → Export → Export as WAV
4. Choose quality settings
5. Save

### VLC Media Player (Free)
1. Open VLC
2. Media → Convert/Save
3. Select MP3 file
4. Choose "Audio - WAV" profile
5. Convert

### iTunes/Music (macOS)
1. Open Music/iTunes
2. File → Add to Library → Select MP3
3. Right-click → Create WAV Version
4. Done!

### Online Tools (No Installation)
- **CloudConvert** (cloudconvert.com)
- **Online-Convert** (online-convert.com)
- **Zamzar** (zamzar.com)

---

## Batch Processing Examples

### Convert All MP3s and Delete Originals
```bash
# macOS/Linux (CAREFUL - deletes original MP3s!)
for f in *.mp3; do ffmpeg -i "$f" "${f%.mp3}.wav" && rm "$f"; done
```

### Convert with Progress and Logging
```bash
# Detailed logging and progress
ffmpeg -i input.mp3 -acodec pcm_s16le -ar 44100 \
  -progress pipe:1 output.wav 2>&1 | tee conversion.log
```

### Convert Multiple Files with Validation
```bash
# Check each file before converting
for f in *.mp3; do
  if ffprobe "$f" 2>&1 | grep -q "Stream"; then
    echo "Converting $f..."
    ffmpeg -i "$f" "${f%.mp3}.wav"
  else
    echo "Skipping invalid file: $f"
  fi
done
```

---

## Troubleshooting

### FFmpeg: Command not found
```bash
# Add FFmpeg to PATH (macOS)
export PATH="/usr/local/bin:$PATH"

# Or use full path
/usr/local/bin/ffmpeg -i input.mp3 output.wav
```

### "input.mp3: Permission denied"
```bash
# Fix file permissions
chmod +r input.mp3

# Then convert
ffmpeg -i input.mp3 output.wav
```

### "No such file or directory"
```bash
# Check file exists
ls -la input.mp3

# Use full path if needed
ffmpeg -i /path/to/input.mp3 /path/to/output.wav
```

### Large file taking too long
```bash
# Reduce sample rate (faster, smaller file)
ffmpeg -i input.mp3 -ar 22050 output.wav

# Or use lower bit depth
ffmpeg -i input.mp3 -acodec pcm_s8 output.wav
```

### "File already exists. Exiting due to Output file #0..."
```bash
# Add -y flag to overwrite
ffmpeg -y -i input.mp3 output.wav

# Or add -n flag to skip
ffmpeg -n -i input.mp3 output.wav
```

---

## Quality Guidelines

### For Ethnomusicology Analysis

| Use Case | Sample Rate | Bit Depth | Example |
|----------|------------|-----------|---------|
| Speech/Voice | 16 kHz | 16-bit | `ffmpeg -i input.mp3 -ar 16000 output.wav` |
| Standard Music | 44.1 kHz | 16-bit | `ffmpeg -i input.mp3 -ar 44100 output.wav` |
| High Quality | 48 kHz | 16-bit | `ffmpeg -i input.mp3 -ar 48000 output.wav` |
| Studio Grade | 96 kHz | 24-bit | `ffmpeg -i input.mp3 -ar 96000 -acodec pcm_s24le output.wav` |

### Recommended for This App
```bash
# Balanced quality vs file size
ffmpeg -i input.mp3 -acodec pcm_s16le -ar 44100 output.wav
```

---

## Batch Script Examples

### macOS/Linux Bash Script (save as `convert.sh`)
```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: ./convert.sh input.mp3 [output.wav]"
    exit 1
fi

INPUT="$1"
OUTPUT="${2:-${INPUT%.mp3}.wav}"

echo "Converting: $INPUT → $OUTPUT"
ffmpeg -i "$INPUT" -acodec pcm_s16le -ar 44100 "$OUTPUT"
echo "Done! Output: $OUTPUT"
```

### Windows Batch Script (save as `convert.bat`)
```batch
@echo off
if "%~1"=="" (
    echo Usage: convert.bat input.mp3
    exit /b 1
)
set INPUT=%~1
set OUTPUT=%~n1.wav
echo Converting: %INPUT% to %OUTPUT%
ffmpeg -i "%INPUT%" -acodec pcm_s16le -ar 44100 "%OUTPUT%"
echo Done! Output: %OUTPUT%
```

---

## After Conversion

### Verify WAV File
```bash
# Check file information
ffprobe output.wav

# Expected output should show:
# - Audio codec: PCM signed 16-bit
# - Sample rate: 44100 Hz (or your chosen rate)
# - Duration: total length
```

### Upload to Ethnomusicology App
1. Open app → "Analyze Music" tab
2. Click "📁 Upload Audio File"
3. Select converted `.wav` file
4. Click "📁 Upload Audio File" button
5. Wait for analysis to complete
6. View results: pitch, rhythm, spectral analysis, cultural matches

---

## Performance Tips

### For Large Files
```bash
# Convert to 22.05 kHz (faster analysis)
ffmpeg -i input.mp3 -ar 22050 output.wav
```

### For Multiple Conversions
```bash
# Use parallel processing
parallel ffmpeg -i {} {.}.wav ::: *.mp3
```

### Storage Management
```bash
# Check file size before converting
ls -lh input.mp3

# See converted file size
ls -lh output.wav

# Remove original after successful conversion
rm input.mp3
```

---

## Getting Help

### FFmpeg Documentation
```bash
# Get help
ffmpeg -h

# Get detailed filter help
ffmpeg -h filter=loudnorm
```

### Common Commands Reference
```bash
# Show all codecs
ffmpeg -codecs

# Show all audio formats
ffmpeg -formats | grep "audio"

# Show conversion speed
ffmpeg -i input.mp3 -acodec pcm_s16le output.wav -progress pipe:1
```

---

## Quick Reference Card

```
# Simple conversion
ffmpeg -i input.mp3 output.wav

# With quality specification
ffmpeg -i input.mp3 -acodec pcm_s16le -ar 44100 output.wav

# Batch convert all MP3s
for f in *.mp3; do ffmpeg -i "$f" "${f%.mp3}.wav"; done

# Check if FFmpeg is installed
ffmpeg -version

# See file details
ffprobe input.mp3

# Upload to app: Analyze Music tab → Upload Audio File
```

---

## Troubleshooting Checklist

- [ ] FFmpeg installed correctly (`ffmpeg -version`)
- [ ] Input file exists (`ls -la input.mp3`)
- [ ] Output path is writable (`touch test.wav`)
- [ ] Enough disk space available
- [ ] Input file is valid MP3 (`ffprobe input.mp3`)
- [ ] Output WAV file created successfully
- [ ] Output file plays in media player
- [ ] Upload to app and analyze

---

**Ready to convert?** Pick a method above and start converting your MP3 files to WAV for better analysis!

**Need help?** See `MP3_FIX_TESTING_GUIDE.md` for more details about the app's audio format support.
