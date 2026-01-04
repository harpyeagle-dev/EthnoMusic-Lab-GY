# 🤖 ML Raga Classifier Trainer Guide

## Overview

The **ML Trainer** is an in-browser machine learning interface that allows you to train a neural network to classify ragas from audio recordings. Unlike the rule-based classifier, the ML model learns patterns from your labeled training data.

## Why ML-Based Training?

**Rule-based approach limitations:**
- Hard to capture all raga variations (tempo, scales, ornamentation styles)
- Requires constant manual tuning for edge cases
- Cannot adapt to new or hybrid musical styles

**ML approach benefits:**
- Learns patterns directly from labeled examples
- Improves accuracy with more training data
- Can distinguish between similar-sounding ragas
- Adapts to different playing styles and instruments

## Architecture

### Components

1. **`src/mlTrainer.js`** - Core ML engine
   - Feature extraction from audio
   - Neural network training and prediction
   - Model persistence (IndexedDB storage)

2. **`src/trainerUI.js`** - User interface
   - 4-step training workflow
   - Data management (upload, export, import)
   - Model testing and validation

3. **`src/index.html`** - UI layout
   - New "🤖 ML Trainer" tab

4. **`src/styles.css`** - Styling
   - Responsive grid layout
   - Status indicators and progress bars

### ML System Stack

- **TensorFlow.js** (npm @tensorflow/tfjs) - Neural network training
- **Web Audio API** - Audio decoding and playback
- **IndexedDB** - Browser local storage for trained models
- **JavaScript ES6+** - No external backends required

## How It Works

### Step 1: Collect Training Data

Upload labeled audio samples:

```javascript
// Each sample needs:
// - Raga name (label)
// - Audio file (.wav, .mp3, etc.)
```

**Features automatically extracted:**
- Tempo (BPM)
- Regularity (how stable the rhythm is)
- Percussiveness (presence of drums/hits)
- Brightness (spectral centroid)
- Complexity (entropy of the audio)
- Polyrhythmic indicator
- Scale detection (Major, Minor, Blues, Pentatonic, etc.)
- Optional: MFCCs, spectral features (from Essentia.js)

### Step 2: Train Model

After collecting 5+ samples, train a neural network:

```
Input Layer (13 features)
    ↓
Dense(32 units, ReLU) + Dropout(0.3)
    ↓
Dense(16 units, ReLU) + Dropout(0.2)
    ↓
Output Layer (softmax, # of ragas)
```

**Training parameters:**
- **Epochs**: How many times to see each sample (10-200, default 50)
- **Batch Size**: How many samples to process at once (4, 8, or 16)
- **Validation Split**: % of data held back for testing (20% default)

**Example training:**
```
50 samples of 3 ragas
Batch size: 8
Epochs: 50
Training on GPU (if available, WebGL backend)
Time: ~1-5 minutes depending on browser/device
```

### Step 3: Use Model

Once trained, the model:
- Is automatically saved to **IndexedDB** (persists across browser sessions)
- Can predict ragas from new audio samples
- Shows confidence scores and top predictions

**Prediction output:**
```json
{
  "raga": "Bhairav",
  "confidence": 0.87,
  "allPredictions": [
    { "raga": "Bhairav", "confidence": 0.87 },
    { "raga": "Yaman", "confidence": 0.10 },
    { "raga": "Ahir Bhairav", "confidence": 0.03 }
  ]
}
```

### Step 4: Export & Share

- **Export**: Download training data as `.json` file (for backup/sharing)
- **Import**: Upload `.json` file to restore a dataset
- **Delete**: Remove model from local storage

## Workflow

### Recommended Training Process

1. **Collect diverse samples** (8-50 per raga minimum)
   - Different tempos
   - Different instruments
   - Different playing styles
   - Different recording qualities

2. **Label accurately**
   - Use standard raga names: "Bhairav", "Yaman", "Ahir Bhairav", etc.
   - Be consistent with spelling

3. **Train** (starts with 50 epochs, adjust if needed)
   - Monitor accuracy: target > 80% for good performance
   - If accuracy is low, collect more samples

4. **Test** 
   - Click "Test Model" to validate on random samples
   - View predictions and confidence scores

5. **Iterate**
   - If certain ragas are confused, add more samples of those
   - Add edge cases (slow ragas, fast ragas, etc.)

### Data Collection Strategy

**Minimum viable dataset:**
- 5-10 samples per raga
- 3-5 ragas total
- ~100-200 total samples

**Good dataset:**
- 20-50 samples per raga
- 10-20 ragas
- ~500+ samples total

**Excellent dataset:**
- 100+ samples per raga
- 30+ ragas
- 1000+ samples total
- Multiple instruments per raga
- Various playing styles

## Feature Details

### Audio Features Extracted

| Feature | Range | Meaning |
|---------|-------|---------|
| `tempo` | 40-300 BPM | Speed of the music |
| `regularity` | 0-1 | How steady/stable the rhythm |
| `percussiveness` | 0-1 | Presence of drums/hits |
| `brightness` | 0-1 | High frequency content |
| `complexity` | 0-1 | Entropy/disorder of the audio |
| `polyrhythmic` | 0 or 1 | Multiple simultaneous rhythms |
| `scaleIndex` | 0-1 | Musical scale (encoded) |
| `scaleOctaveRange` | 1-10 | Span of notes used |
| `mfcc1-3` | -1 to +1 | Spectral shape (Mel-Frequency Cepstral Coefficients) |
| `spectralCentroid` | 0-11000 Hz | Center of frequency distribution |
| `zeroCrossingRate` | 0-0.5 | How often audio crosses zero (noise indicator) |

### Scale Encoding

```
0 = Major
1 = Minor
2 = Pentatonic
3 = Blues
4 = Harmonic Minor
5 = Dorian
6 = Phrygian
7 = Lydian
8 = Mixolydian
9 = Whole Tone
10 = Chromatic
11 = Diminished
12 = Unknown
```

## API Reference

### MLTrainer Object

```javascript
import MLTrainer from './mlTrainer.js';

// Initialize (called automatically by UI)
await MLTrainer.init();

// Add training sample
MLTrainer.addTrainingSample(featureVector, ragaLabel);

// Train model
const result = await MLTrainer.train(epochs, batchSize, validationSplit);

// Make predictions
const prediction = MLTrainer.predict(featureVector);

// Manage model
await MLTrainer.saveModelToStorage();
await MLTrainer.loadModelFromStorage();
await MLTrainer.deleteModel();

// Data management
MLTrainer.exportTrainingData();
MLTrainer.importTrainingData(jsonData);
MLTrainer.getStats();
```

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Full | Best performance, WebGL acceleration |
| Firefox | ✅ Full | Good performance |
| Safari | ⚠️ Partial | Slower, limited IndexedDB |
| Edge | ✅ Full | Similar to Chrome |
| Mobile Chrome | ✅ Full | Works well on modern phones |
| Mobile Safari | ⚠️ Partial | Works but slower |

## Performance Tips

1. **Use shorter audio** (10-30 seconds per sample) for faster training
2. **Train on desktop** if possible (better GPU acceleration)
3. **Start with few ragas** (3-5) before expanding
4. **Batch size 16** trains faster but needs more memory
5. **Export data** regularly as backup

## Troubleshooting

### Model not saving?
- Check browser's IndexedDB quota (may need to increase)
- Clear browser cache and try again

### Low training accuracy (<70%)?
- Collect more samples (aim for 20+ per raga)
- Check that labels are spelled consistently
- Ensure samples are clearly distinguishable

### Training is slow?
- Use smaller batch size (4 instead of 16)
- Use fewer epochs initially (start with 20)
- Close other browser tabs to free memory

### "Need at least 5 training samples"?
- Upload 5+ samples before training
- Use "View collected samples" to verify count

## Integration with Main Classifier

The trained ML model can be integrated into the genre classifier:

```javascript
// In audioAnalyzer.js classifyGenre()
const mlPrediction = MLTrainer.predict(mlFeatures);

// Ensemble approach
if (mlPrediction) {
  const mlScore = convertRagaToProbability(mlPrediction);
  const ruleScore = getRuleBasedScore();
  
  // Weight: 60% ML, 40% rules
  finalScore = 0.6 * mlScore + 0.4 * ruleScore;
}
```

Currently, the ML trainer is separate. To integrate:
1. Modify `classifyGenre()` to call `MLTrainer.predict()`
2. Ensemble the ML predictions with rule-based scores
3. Use URL param `?useML=true` to toggle

## Future Enhancements

- [ ] Real-time training progress visualization
- [ ] Confusion matrix to identify problematic ragas
- [ ] Cross-validation metrics (precision, recall, F1)
- [ ] Model quantization for faster inference
- [ ] Transfer learning from pre-trained models
- [ ] Support for other musical traditions (Blues, Jazz, etc.)
- [ ] Web Worker training to avoid blocking UI
- [ ] Model versioning and rollback

## Example Workflow

```bash
# 1. Open app at http://localhost:5001
# 2. Click "🤖 ML Trainer" tab
# 3. Step 1: Upload samples
#    - Enter "Bhairav"
#    - Upload 10 Bhairav recordings
# 4. Repeat for "Yaman" and "Ahir Bhairav"
# 5. Step 2: Review data
#    - Verify 30 total samples, 3 ragas
# 6. Step 3: Train Model
#    - Set epochs to 50, batch size 8
#    - Click "Train Model"
#    - Wait 2-5 minutes
# 7. Step 4: Test
#    - Click "Test Model"
#    - View predictions
# 8. Use in analyzer
#    - Upload new raga sample
#    - See ML prediction + confidence
```

## Resources

- **TensorFlow.js Docs**: https://js.tensorflow.org/
- **Neural Network Basics**: https://playground.tensorflow.org/
- **Raga Database**: https://www.upf.edu/web/mtg
- **Music Classification Papers**: IEEE Transactions on Audio, Speech, and Language Processing

---

**Version**: 1.0  
**Last Updated**: December 29, 2025  
**Status**: ✅ Production Ready
