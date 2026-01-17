/**
 * Essentia.js Helper Module
 * Provides centralized Essentia.js initialization and common audio analysis functions
 */

import Essentia from 'essentia.js/dist/essentia-wasm.web.js';

class EssentiaHelper {
    constructor() {
        this.essentia = null;
        this.isReady = false;
        this.initPromise = null;
    }

    /**
     * Initialize Essentia.js (singleton pattern)
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        if (this.isReady) return true;
        
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = (async () => {
            try {
                this.essentia = new Essentia();
                await this.essentia.ready;
                this.isReady = true;
                console.log('✓ Essentia.js initialized successfully');
                return true;
            } catch (error) {
                console.warn('Essentia.js initialization failed:', error);
                this.isReady = false;
                return false;
            }
        })();

        return this.initPromise;
    }

    /**
     * Analyze pitch from audio buffer
     * @param {Float32Array} audioData Audio buffer
     * @param {number} sampleRate Sample rate
     * @returns {Object} Pitch analysis results
     */
    analyzePitch(audioData, sampleRate = 44100) {
        if (!this.isReady || !this.essentia) {
            return this.fallbackPitchDetection(audioData, sampleRate);
        }

        try {
            const pitch = this.essentia.PitchYinFFT(audioData, sampleRate);
            return {
                frequency: pitch.pitch,
                confidence: pitch.pitchConfidence,
                method: 'essentia-yin'
            };
        } catch (error) {
            console.warn('Essentia pitch analysis failed, using fallback:', error);
            return this.fallbackPitchDetection(audioData, sampleRate);
        }
    }

    /**
     * Extract rhythm features from audio
     * @param {Float32Array} audioData Audio buffer
     * @param {number} sampleRate Sample rate
     * @returns {Object} Rhythm features
     */
    analyzeRhythm(audioData, sampleRate = 44100) {
        if (!this.isReady || !this.essentia) {
            return { tempo: 0, beats: [], confidence: 0 };
        }

        try {
            // Extract onset detection
            const onsets = this.essentia.OnsetDetection(audioData);
            
            // Beat tracking
            const beatTracker = this.essentia.BeatTrackerMultiFeature(audioData, sampleRate);
            
            return {
                tempo: beatTracker.bpm || 0,
                beats: beatTracker.ticks || [],
                onsets: onsets,
                confidence: beatTracker.confidence || 0,
                method: 'essentia-beat-tracker'
            };
        } catch (error) {
            console.warn('Essentia rhythm analysis failed:', error);
            return { tempo: 0, beats: [], confidence: 0 };
        }
    }

    /**
     * Extract spectral features
     * @param {Float32Array} audioData Audio buffer
     * @returns {Object} Spectral features
     */
    analyzeSpectrum(audioData) {
        if (!this.isReady || !this.essentia) {
            return this.fallbackSpectralAnalysis(audioData);
        }

        try {
            const spectrum = this.essentia.Spectrum(audioData);
            const centroid = this.essentia.SpectralCentroid(spectrum);
            const rolloff = this.essentia.SpectralRolloff(spectrum);
            const flatness = this.essentia.SpectralFlatness(spectrum);
            
            return {
                spectrum: spectrum,
                centroid: centroid,
                rolloff: rolloff,
                flatness: flatness,
                brightness: centroid / 22050, // Normalized
                method: 'essentia-spectral'
            };
        } catch (error) {
            console.warn('Essentia spectral analysis failed:', error);
            return this.fallbackSpectralAnalysis(audioData);
        }
    }

    /**
     * Extract MFCC coefficients
     * @param {Float32Array} audioData Audio buffer
     * @returns {Array<number>} MFCC coefficients
     */
    extractMFCC(audioData) {
        if (!this.isReady || !this.essentia) {
            return Array(13).fill(0);
        }

        try {
            const mfccResult = this.essentia.MFCC(audioData);
            return mfccResult.mfcc || Array(13).fill(0);
        } catch (error) {
            console.warn('Essentia MFCC extraction failed:', error);
            return Array(13).fill(0);
        }
    }

    /**
     * Comprehensive audio feature extraction
     * @param {Float32Array} audioData Audio buffer
     * @param {number} sampleRate Sample rate
     * @returns {Object} Complete feature set
     */
    extractFeatures(audioData, sampleRate = 44100) {
        const features = {
            pitch: this.analyzePitch(audioData, sampleRate),
            rhythm: this.analyzeRhythm(audioData, sampleRate),
            spectral: this.analyzeSpectrum(audioData),
            mfcc: this.extractMFCC(audioData),
            timestamp: Date.now()
        };

        return features;
    }

    /**
     * Fallback pitch detection using autocorrelation
     */
    fallbackPitchDetection(buffer, sampleRate) {
        const SIZE = buffer.length;
        const MAX_SAMPLES = Math.floor(SIZE / 2);
        let best_offset = -1;
        let best_correlation = 0;
        let rms = 0;

        for (let i = 0; i < SIZE; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / SIZE);

        if (rms < 0.01) {
            return { frequency: -1, confidence: 0, method: 'autocorrelation-fallback' };
        }

        for (let offset = 1; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;
            for (let i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs(buffer[i] - buffer[i + offset]);
            }
            correlation = 1 - (correlation / MAX_SAMPLES);

            if (correlation > best_correlation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        }

        if (best_correlation > 0.01 && best_offset > 0) {
            return {
                frequency: sampleRate / best_offset,
                confidence: best_correlation,
                method: 'autocorrelation-fallback'
            };
        }

        return { frequency: -1, confidence: 0, method: 'autocorrelation-fallback' };
    }

    /**
     * Fallback spectral analysis
     */
    fallbackSpectralAnalysis(audioData) {
        // Simple energy-based analysis
        let energy = 0;
        for (let i = 0; i < audioData.length; i++) {
            energy += audioData[i] * audioData[i];
        }
        energy = Math.sqrt(energy / audioData.length);

        return {
            spectrum: [],
            centroid: 0,
            rolloff: 0,
            flatness: 0,
            brightness: 0.5,
            energy: energy,
            method: 'fallback'
        };
    }

    /**
     * Check if Essentia is ready
     * @returns {boolean}
     */
    ready() {
        return this.isReady;
    }

    /**
     * Get Essentia instance (for advanced usage)
     * @returns {Essentia|null}
     */
    getEssentia() {
        return this.essentia;
    }
}

// Export singleton instance
const essentiaHelper = new EssentiaHelper();
export default essentiaHelper;

// Also export class for manual instantiation if needed
export { EssentiaHelper };
