/**
 * @jest-environment node
 */

jest.mock('essentia.js/dist/essentia-wasm.web.js', () => {
  return function MockEssentia() {
    this.ready = Promise.resolve();
  };
});

describe('Genre classification robustness', () => {
  let AudioAnalyzer;

  beforeAll(() => {
    // Provide a minimal navigator for constructor logic
    global.navigator = { userAgent: 'node-jest' };
    // Dynamic import after mocking
    ({ AudioAnalyzer } = require('../src/audioAnalyzer.js'));
  });

  test('returns at least one result for minimal inputs', async () => {
    const analyzer = new AudioAnalyzer();
    const rhythm = { tempo: 0, regularity: 0, percussiveness: 0, temporalComplexity: 0, polyrhythmic: false };
    const scale = { scale: '' };
    const spectral = { brightness: 0 };

    const results = await analyzer.classifyGenre(rhythm, scale, spectral);
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('genre');
    expect(results[0]).toHaveProperty('confidence');
  });

  test('handles NaN/undefined inputs gracefully', async () => {
    const analyzer = new AudioAnalyzer();
    const rhythm = { tempo: NaN, regularity: undefined, percussiveness: undefined, temporalComplexity: undefined, polyrhythmic: undefined };
    const scale = { scale: undefined };
    const spectral = { brightness: undefined };

    const results = await analyzer.classifyGenre(rhythm, scale, spectral);
    expect(results.length).toBeGreaterThan(0);
  });
});
