# Module 2: Computational Sound Analysis

**Duration:** 3-4 weeks  
**Level:** Intermediate

## Module Overview

This module introduces students to the computational tools and techniques used to analyze audio signals. Students will learn the fundamentals of digital sound representation, spectral analysis, and visualization methods. By the end of the module, they will be able to use Python libraries to extract and analyze features from Baboon Dance recordings.

## Learning Objectives

By the end of this module, students will be able to:

- Explain how sound is represented digitally (sampling, waveforms, frequency)
- Use Python libraries (Librosa, NumPy, Matplotlib) for audio analysis
- Generate and interpret spectrograms and other audio visualizations
- Extract musical features such as tempo, pitch, and timbre
- Apply computational analysis to understand musical structure
- Create technical reports combining code, graphs, and cultural interpretation

## Key Concepts

### Digital Audio Fundamentals
- **Sampling Rate:** How often audio is measured per second (e.g., 44.1 kHz)
- **Waveforms:** Visual representation of sound amplitude over time
- **Frequency:** Pitch components measured in Hertz (Hz)
- **Spectrogram:** Time-frequency representation of sound

### Audio Features
- **Spectral Centroid:** "Brightness" of sound
- **Zero-Crossing Rate:** Measure of percussiveness
- **Mel-Frequency Cepstral Coefficients (MFCCs):** Timbral characteristics
- **Tempo/Beat Tracking:** Rhythmic analysis
- **Chroma Features:** Pitch class distribution

### Tools and Libraries
- **Python:** Programming language for data analysis
- **Librosa:** Python library for audio analysis
- **NumPy:** Numerical computing
- **Matplotlib/Seaborn:** Data visualization
- **Jupyter Notebooks:** Interactive coding environment

## Key Activities

### Week 1: Introduction to Digital Audio

**Activity 2.1: Sound Waves and Sampling**
- Interactive demonstration of waveforms
- Experiment with different sampling rates
- Visualize simple audio files
- Complete [Worksheet #2](../../worksheets/worksheet-02.md)

**Activity 2.2: Python Setup and First Analysis**
- Install required libraries (see [Installation Guide](../../setup/INSTALLATION.md))
- Load and play audio files using Librosa
- Generate basic waveform plots
- Hands-on coding exercise

### Week 2: Spectral Analysis

**Activity 2.3: Creating Spectrograms**
- Understand the Fast Fourier Transform (FFT)
- Generate spectrograms of Baboon Dance recordings
- Identify rhythmic patterns and vocal elements
- Compare spectrograms across different performances

**Activity 2.4: Feature Extraction**
- Extract tempo, spectral centroid, and MFCCs
- Analyze how features vary throughout a performance
- Create feature timeline visualizations
- Interpret results in cultural context

### Week 3: Advanced Analysis

**Activity 2.5: Beat Tracking and Rhythm Analysis**
- Use Librosa's beat detection algorithms
- Visualize rhythmic structure
- Compare computational beats with perceived rhythm
- Discuss limitations and accuracy

**Activity 2.6: Comparative Feature Analysis**
- Extract features from multiple Baboon Dance recordings
- Create comparison charts and statistics
- Identify consistent vs. variable musical elements
- Write technical observations

### Week 4: Integration and Reporting

**Activity 2.7: Audio Analysis Report**
- Choose one Baboon Dance recording for in-depth analysis
- Generate comprehensive visualizations
- Write technical descriptions with cultural interpretation
- Present findings to class

## Assessment

### Audio Analysis Report with Graphs/Images (100%)

Students will submit a technical report (1500-2000 words) that includes:

**Required Components:**

1. **Introduction (15%)**
   - Description of the chosen Baboon Dance recording
   - Cultural context and significance
   - Research questions or analysis goals

2. **Methodology (20%)**
   - Tools and libraries used
   - Analysis parameters (sampling rate, window size, etc.)
   - Step-by-step description of analytical process

3. **Results and Visualizations (40%)**
   - Waveform plot
   - Spectrogram
   - At least 3 feature extraction graphs (tempo, spectral centroid, MFCCs, etc.)
   - Clear labels, captions, and explanations for all visuals

4. **Interpretation (20%)**
   - What do the computational results reveal about the music?
   - How do quantitative findings relate to qualitative listening experience?
   - Cultural meaning of observed patterns

5. **Conclusion and Reflection (5%)**
   - Summary of key findings
   - Limitations of computational analysis
   - Future analysis directions

**Code Appendix (Not graded but required):**
- Well-commented Python code used for analysis
- Jupyter Notebook or Python script

**Assessment Criteria:**
- Technical accuracy and appropriate use of tools
- Quality and clarity of visualizations
- Integration of computational and cultural analysis
- Writing clarity and organization
- Proper citation of methods and sources

## Required Materials

### Software
- Python 3.8 or higher
- Jupyter Notebook or JupyterLab
- Required libraries: librosa, numpy, matplotlib, scipy, pandas

### Datasets
- Baboon Dance audio files (see [Audio Library](../../resources/audio/baboon-dance/))
- Sample code notebooks (see [Code Examples](code-examples/))

### Worksheets
- [Worksheet #2: Waveform Analysis](../../worksheets/worksheet-02.md)
- [Worksheet #3: Spectrogram Interpretation](../../worksheets/worksheet-03.md)

## Code Examples

### Example 1: Loading and Visualizing Audio

```python
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

# Load audio file
audio_path = "baboon_dance_sample.wav"
y, sr = librosa.load(audio_path)

# Display waveform
plt.figure(figsize=(12, 4))
librosa.display.waveshow(y, sr=sr)
plt.title("Baboon Dance - Waveform")
plt.xlabel("Time (seconds)")
plt.ylabel("Amplitude")
plt.tight_layout()
plt.show()
```

### Example 2: Creating a Spectrogram

```python
# Generate spectrogram
D = librosa.stft(y)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)

# Display spectrogram
plt.figure(figsize=(12, 6))
librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='hz')
plt.colorbar(format='%+2.0f dB')
plt.title("Baboon Dance - Spectrogram")
plt.tight_layout()
plt.show()
```

### Example 3: Feature Extraction

```python
# Extract tempo and beat frames
tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
print(f"Estimated tempo: {tempo:.2f} BPM")

# Extract spectral centroid
spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)

# Plot spectral centroid over time
plt.figure(figsize=(12, 4))
times = librosa.times_like(spectral_centroid)
plt.plot(times, spectral_centroid.T)
plt.title("Spectral Centroid Over Time")
plt.xlabel("Time (seconds)")
plt.ylabel("Frequency (Hz)")
plt.tight_layout()
plt.show()
```

## Additional Resources

### Tutorials
- [Librosa Documentation](https://librosa.org/doc/latest/index.html)
- [Python for Audio Signal Processing](../../resources/tutorials/audio-python.md)
- [Understanding Spectrograms](../../resources/tutorials/spectrograms.md)

### Recommended Reading
- Smith, Julius O. *Spectral Audio Signal Processing*
- Articles on computational musicology methods

### Online Resources
- Librosa tutorial notebooks
- Digital signal processing fundamentals
- MIR (Music Information Retrieval) resources

## Instructor Notes

### Teaching Tips
- Start with visual/interactive demonstrations before coding
- Provide pre-written code templates for students new to Python
- Encourage experimentation—students should try different parameters
- Balance technical rigor with accessibility for humanities students
- Emphasize interpretation over perfect technical execution

### Common Challenges
- **Python installation issues:** Have a setup session or provide cloud-based alternatives (Google Colab)
- **Mathematical intimidation:** Focus on intuition over equations
- **Disconnect from culture:** Constantly link analysis back to musical meaning
- **Code debugging:** Build in peer support and office hours

### Differentiation
- **Advanced students:** Challenge them with more complex features or comparative analysis
- **Struggling students:** Provide additional code templates and one-on-one support
- **Group work option:** Allow pairs to collaborate on the final report

## Connection to Next Module

Module 3 will introduce machine learning approaches to audio analysis, building on the feature extraction skills developed here. Students will learn how neural networks can learn high-level representations of musical patterns, leading to more sophisticated comparative analysis.

---

[← Back: Module 1](../module-01/README.md) | [Next: Module 3 →](../module-03/README.md)
