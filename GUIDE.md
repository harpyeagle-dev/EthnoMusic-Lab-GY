# Ethnomusicology Explorer - Quick Start Guide

## For Young Learners (Ages 8-12)

### What is this app?
This app lets you explore music from around the world! You can:
- 🎵 Listen to music from different countries
- 🎮 Play fun music games
- 🎤 Record your own music
- 📊 See cool pictures of sound waves!

### How to get started:
1. Ask a grown-up to help you run: `npm install` then `npm start`
2. Click on different countries to hear their music
3. Try the games in the "Learn & Play" tab
4. Record yourself singing or humming!

## For Teens and Adults (Ages 13+)

### What makes this app special?
- **Real science**: Uses actual audio analysis algorithms to study music
- **Cultural learning**: Understand how different cultures create music
- **Interactive**: Don't just listen—analyze, compare, and create!

### Getting the most out of it:
1. Upload your favorite songs to see what makes them unique
2. Try the Culture Quiz to test your knowledge
3. Record traditional music from your own culture
4. Compare different musical scales from around the world

## For Educators

### Curriculum Integration

**Music Classes:**
- Demonstrate musical concepts (pitch, rhythm, timbre)
- Compare and contrast cultural traditions
- Analyze student performances

**Cultural Studies:**
- Explore music as cultural expression
- Discuss globalization and cultural exchange
- Research project inspiration

**STEM Classes:**
- Audio signal processing
- Data visualization
- Algorithm design

### Classroom Activities

1. **Cultural Music Fair**: Each student explores and presents a different culture's music
2. **Rhythm Challenge**: Students recreate rhythms from different traditions
3. **Scale Exploration**: Compare how different cultures organize musical pitches
4. **Audio Analysis Project**: Students analyze and present findings on their favorite songs

## For Musicians

### Practice Tools
- Identify the scale in your improvisation
- Check your rhythm timing and regularity
- Explore scales from different traditions for composition

### Learning Resources
- Study characteristic rhythms of various cultures
- Understand modal systems (maqamat, ragas, etc.)
- Analyze your recordings to track improvement

## For Researchers and Advanced Users

### API Overview

The core `AudioAnalyzer` class provides:

```javascript
// Initialize analyzer
const analyzer = new AudioAnalyzer();
await analyzer.initialize();

// Detect pitch from audio buffer
const pitch = analyzer.detectPitch(audioBuffer);

// Analyze rhythm
const rhythm = analyzer.analyzeRhythm(audioBuffer);
// Returns: { tempo, peakCount, regularity, intervals }

// Spectral analysis
const spectral = analyzer.analyzeSpectralFeatures(fftData);
// Returns: { centroid, rolloff, flux, brightness }

// Scale identification
const scale = analyzer.identifyScale(pitchArray);
```

### Cultural Matching Algorithm

The `matchCulture()` function scores audio against cultural profiles:
- Tempo ranges characteristic of traditions
- Scale patterns (pentatonic, modal, etc.)
- Rhythmic regularity and complexity
- Spectral characteristics

Returns confidence scores (0-1) for each culture.

### Extending the Database

Add new cultures in `src/culturesData.js`:

```javascript
{
  id: 'your-culture',
  name: 'Culture Name',
  emoji: '🎵',
  region: 'Geographic Region',
  description: 'Brief description...',
  characteristics: {
    rhythm: 'Description',
    scales: 'Description',
    instruments: 'List',
    tempo: 'Range'
  },
  facts: ['Fact 1', 'Fact 2', ...]
}
```

## Technical Notes

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may require user interaction for audio)
- Mobile browsers: Limited (recording may not work)

### Performance Tips
- Shorter audio files analyze faster
- Clear, isolated recordings work best
- Higher sample rates provide better pitch accuracy

### Privacy
- All processing happens in your browser
- No audio is uploaded to servers
- No data collection or tracking

## Troubleshooting by Age Group

### For Kids
**Q: Why can't I hear anything?**
A: Make sure your volume is turned up and ask a grown-up to check browser settings!

**Q: The games aren't working!**
A: Try refreshing the page (press F5) and click anywhere on the screen first.

### For Everyone
**Q: Recording doesn't work**
A: Your browser needs microphone permission. Look for a small icon in the address bar.

**Q: Analysis results seem wrong**
A: Try with a clearer recording. Background noise can confuse the analysis!

**Q: App won't start**
A: Make sure Node.js is installed and run `npm install` first.

## Learning Paths

### Beginner Path
1. Start with "Explore Cultures" tab
2. Listen to each culture's demonstration
3. Try the Culture Quiz
4. Record yourself humming a simple tune

### Intermediate Path
1. Upload a favorite song
2. Study the analysis results
3. Try the Scale Explorer
4. Record yourself playing an instrument
5. Compare your recording to cultural profiles

### Advanced Path
1. Analyze multiple songs from the same culture
2. Look for patterns in the data
3. Compare similar cultures (e.g., Chinese vs Japanese traditional)
4. Explore the source code
5. Contribute improvements or new features

## Additional Resources

### Learn More About:
- **Ethnomusicology**: The study of music in cultural context
- **Audio DSP**: Digital Signal Processing for audio
- **Music Theory**: Understanding scales, rhythm, and harmony
- **Cultural Studies**: How music reflects and shapes culture

### Recommended Reading:
- "Worlds of Music" by Jeff Todd Titon
- "Thinking Musically" by Bonnie C. Wade
- "The Anthropology of Music" by Alan P. Merriam

---

**Have fun exploring the wonderful world of music! 🎵🌍**
