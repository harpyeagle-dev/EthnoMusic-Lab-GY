/**
 * @jest-environment node
 */

jest.mock('essentia.js/dist/essentia-wasm.web.js', () => {
  return function MockEssentia() {
    this.ready = Promise.resolve();
    this.arrayToVector = arr => arr; // passthrough for tests
    this.vectorToArray = v => Array.from(v);
    this.Spectrum = v => v; // no-op spectrum
    this.MFCC = () => ({ mfcc: [0, 10, 5, -2] }); // fake small mfcc vector
  };
});

describe('ML genre flag does not break classifyGenre API', () => {
  let AudioAnalyzer;

  beforeAll(() => {
    global.navigator = { userAgent: 'jsdom' };
    ({ AudioAnalyzer } = require('../src/audioAnalyzer.js'));
  });

  test('classifyGenre accepts optional mlFeatures and options', async () => {
    const analyzer = new AudioAnalyzer();
    analyzer.essentiaReady = true;
    analyzer.essentia = new (require('essentia.js/dist/essentia-wasm.web.js'))();

    const rhythm = { tempo: 120, regularity: 0.8, percussiveness: 0.1, temporalComplexity: 0.3, polyrhythmic: false };
    const scale = { scale: 'Major' };
    const spectral = { brightness: 0.5 };

    const ml = { mfccMean: [0, 10, 5, -2], mfccVar: [0, 1, 1, 1] };
    const results = await analyzer.classifyGenre(rhythm, scale, spectral, ml, { mlWeight: 0.25 });
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });
});
