# Technical Setup and Installation Guide

## Overview

This guide will help you set up the necessary software and tools to complete the Baboon Dance Digital Curriculum. The curriculum uses Python-based tools for audio analysis and visualization.

## System Requirements

### Minimum Requirements
- **Operating System:** Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM:** 8 GB (16 GB recommended)
- **Storage:** 5 GB free space for software and audio files
- **Processor:** Intel i5 or equivalent (i7 recommended)
- **Internet:** Reliable connection for downloading packages and resources

### Recommended Setup
- Modern laptop or desktop computer
- Headphones for audio analysis work
- External speakers for group listening sessions
- Adequate screen size for viewing visualizations (15" or larger)

## Installation Steps

### Step 1: Install Python

**Check if Python is already installed:**

```bash
python --version
# or
python3 --version
```

If Python 3.8 or higher is installed, you can skip to Step 2.

**Install Python:**

- **Windows:** Download from [python.org](https://www.python.org/downloads/) and run installer
  - ✅ Check "Add Python to PATH" during installation
  
- **macOS:** Use Homebrew (recommended)
  ```bash
  # Install Homebrew if needed
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  
  # Install Python
  brew install python@3.11
  ```

- **Linux:** Use package manager
  ```bash
  # Ubuntu/Debian
  sudo apt update
  sudo apt install python3.11 python3-pip
  
  # Fedora
  sudo dnf install python3.11
  ```

### Step 2: Install pip (Python Package Manager)

Pip usually comes with Python, but verify:

```bash
pip --version
# or
pip3 --version
```

If not installed:

```bash
# macOS/Linux
python3 -m ensurepip --upgrade

# Windows
python -m ensurepip --upgrade
```

### Step 3: Create a Virtual Environment (Recommended)

Virtual environments keep your project dependencies isolated.

```bash
# Navigate to your curriculum folder
cd "/Users/admin/New Curriculum"

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt when activated.

### Step 4: Install Required Python Packages

Create a `requirements.txt` file with all necessary packages:

```bash
# Core audio processing
librosa>=0.10.0
soundfile>=0.12.0
audioread>=3.0.0

# Machine learning and embeddings
openl3>=0.4.0
tensorflow>=2.10.0
scikit-learn>=1.3.0

# Data manipulation
numpy>=1.24.0
pandas>=2.0.0
scipy>=1.11.0

# Visualization
matplotlib>=3.7.0
seaborn>=0.12.0
plotly>=5.14.0

# Jupyter notebooks
jupyter>=1.0.0
jupyterlab>=4.0.0
ipykernel>=6.25.0

# Utilities
tqdm>=4.65.0
pydub>=0.25.0
```

Install all packages:

```bash
pip install -r setup/requirements.txt
```

This may take 10-15 minutes depending on your internet connection.

### Step 5: Verify Installation

Create a test script to verify everything works:

```python
# test_installation.py
print("Testing Python environment...")

try:
    import librosa
    print("✓ Librosa installed")
except ImportError:
    print("✗ Librosa NOT installed")

try:
    import openl3
    print("✓ OpenL3 installed")
except ImportError:
    print("✗ OpenL3 NOT installed")

try:
    import numpy as np
    print("✓ NumPy installed")
except ImportError:
    print("✗ NumPy NOT installed")

try:
    import matplotlib.pyplot as plt
    print("✓ Matplotlib installed")
except ImportError:
    print("✗ Matplotlib NOT installed")

try:
    import sklearn
    print("✓ Scikit-learn installed")
except ImportError:
    print("✗ Scikit-learn NOT installed")

try:
    import jupyter
    print("✓ Jupyter installed")
except ImportError:
    print("✗ Jupyter NOT installed")

print("\nAll checks complete! ✓")
```

Run the test:

```bash
python test_installation.py
```

### Step 6: Install Jupyter Notebook

If not already installed:

```bash
pip install jupyter jupyterlab
```

Launch Jupyter:

```bash
# Classic Notebook
jupyter notebook

# or JupyterLab (recommended)
jupyter lab
```

This will open in your web browser.

### Step 7: Install Audio Backend (if needed)

Some systems need additional audio libraries:

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg libsndfile1
```

**Windows:**
- Download FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
- Add to system PATH

## Optional Tools

### Code Editors

While Jupyter Notebooks are primary, you may want a code editor:

- **VS Code:** [code.visualstudio.com](https://code.visualstudio.com/)
  - Install Python extension
  - Install Jupyter extension
  
- **PyCharm Community:** [jetbrains.com/pycharm](https://www.jetbrains.com/pycharm/)

### Audio Editing Software

For working with audio files:

- **Audacity:** Free, open-source ([audacityteam.org](https://www.audacityteam.org/))
- **Adobe Audition:** Professional (requires license)

### Git (Optional but Recommended)

For version control:

```bash
# macOS
brew install git

# Linux
sudo apt install git

# Windows - download from git-scm.com
```

## Troubleshooting

### Common Issues

**Issue: "pip: command not found"**
- Solution: Use `pip3` instead of `pip`, or reinstall Python ensuring pip is included

**Issue: OpenL3/TensorFlow installation fails**
- Solution: These packages are large and complex. Try:
  ```bash
  pip install --upgrade pip
  pip install tensorflow --no-cache-dir
  pip install openl3
  ```

**Issue: Librosa can't load audio files**
- Solution: Install audio backend
  ```bash
  pip install audioread
  # Then install FFmpeg (see Step 7)
  ```

**Issue: Permission denied errors**
- Solution: Don't use `sudo` with pip. Use virtual environment instead.

**Issue: Package conflicts**
- Solution: Create fresh virtual environment
  ```bash
  deactivate  # if in venv
  rm -rf venv
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  ```

**Issue: Jupyter kernel not found**
- Solution: Install kernel in virtual environment
  ```bash
  python -m ipykernel install --user --name=baboon-dance
  ```

### Getting Help

If you encounter issues:

1. **Check module-specific setup notes** - Some modules have additional requirements
2. **Search error messages** - Stack Overflow and GitHub Issues are helpful
3. **Consult instructor or TA** - They may have encountered similar issues
4. **Check library documentation** - Official docs often have troubleshooting sections
5. **Use course forum/discussion board** - Classmates may have solutions

## Cloud Alternatives

If local installation is problematic, consider cloud options:

### Google Colab
- Free Jupyter notebook environment
- Most packages pre-installed
- GPU access available
- Visit: [colab.research.google.com](https://colab.research.google.com/)

**Pros:** No installation needed, free, powerful  
**Cons:** Requires internet, limited storage, sessions time out

### Other Options
- **Kaggle Notebooks:** [kaggle.com](https://www.kaggle.com/)
- **Binder:** Launch from GitHub repositories
- **University computing clusters:** Check with your institution

## Updating Packages

Periodically update packages for bug fixes and new features:

```bash
pip install --upgrade librosa openl3 scikit-learn matplotlib
```

Or update all packages:

```bash
pip list --outdated
pip install --upgrade [package-name]
```

## Testing Your Setup

Once everything is installed, try this complete test:

```python
import librosa
import numpy as np
import matplotlib.pyplot as plt

# Load a test audio file (you'll need to provide one)
y, sr = librosa.load('test_audio.wav', duration=5)

# Create a spectrogram
D = librosa.stft(y)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)

# Plot it
plt.figure(figsize=(10, 4))
librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='hz')
plt.colorbar()
plt.title('Test Spectrogram')
plt.tight_layout()
plt.show()

print("Success! Your environment is ready.")
```

## Next Steps

Once your environment is set up:

1. **Download audio files** from the course repository
2. **Review Module 1** materials
3. **Complete Worksheet #1** to practice
4. **Join the first class session** prepared to code!

---

## Quick Reference

### Activate Virtual Environment
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Launch Jupyter
```bash
jupyter lab
```

### Install New Package
```bash
pip install package-name
```

### Deactivate Virtual Environment
```bash
deactivate
```

---

**Questions?** Contact your instructor or TA for technical support.

[← Back to Curriculum](../README.md)
