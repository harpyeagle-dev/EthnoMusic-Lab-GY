/**
 * @jest-environment node
 */

jest.mock('essentia.js/dist/essentia-wasm.web.js', () => {
  return function MockEssentia() {
    this.ready = Promise.resolve();
  };
});

describe('Genre regression fixtures (multi-genre safety)', () => {
  let AudioAnalyzer;

  beforeAll(() => {
    global.navigator = { userAgent: 'node-jest' };
    ({ AudioAnalyzer } = require('../src/audioAnalyzer.js'));
  });

  test('reggae-like groove keeps Reggae in the top three', async () => {
    const analyzer = new AudioAnalyzer();
    analyzer.audioContext = { sampleRate: 44100 };

    const rhythm = {
      tempo: 96,
      regularity: 0.1,
      percussiveness: 0.05,
      temporalComplexity: 0.5,
      polyrhythmic: false
    };
    const scale = { scale: 'C Major' };
    const spectral = { brightness: 0.55, centroid: 9000 };

    const results = await analyzer.classifyGenre(rhythm, scale, spectral);
    const genres = results.map(r => r.genre);

    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(genres).toContain('Reggae');
  });

  test('polyrhythmic pentatonic fixture boosts World over Reggae', async () => {
    const analyzer = new AudioAnalyzer();
    analyzer.audioContext = { sampleRate: 44100 };

    const rhythm = {
      tempo: 100,
      regularity: 0.05,
      percussiveness: 0.06,
      temporalComplexity: 0.75,
      polyrhythmic: true
    };
    const scale = { scale: 'C Pentatonic Minor' };
    const spectral = { brightness: 0.45, centroid: 12000 };

    const results = await analyzer.classifyGenre(rhythm, scale, spectral);
    const worldScore = results.find(r => r.genre === 'World')?.confidence || 0;
    const reggaeScore = results.find(r => r.genre === 'Reggae')?.confidence || 0;

    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(worldScore).toBeGreaterThan(reggaeScore);
  });
});
