export class RealTimePitchDetector {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.analyser = null;
        this.microphone = null;
        this.isActive = false;
        this.bufferLength = 2048;
        this.dataArray = new Float32Array(this.bufferLength);
    }

    async start() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.bufferLength;
            
            this.microphone.connect(this.analyser);
            this.isActive = true;
            return true;
        } catch (error) {
            console.error('Microphone access denied:', error);
            return false;
        }
    }

    stop() {
        if (this.microphone && this.microphone.mediaStream) {
            this.microphone.mediaStream.getTracks().forEach(track => track.stop());
        }
        this.isActive = false;
    }

    getPitch() {
        if (!this.isActive || !this.analyser) return null;
        
        this.analyser.getFloatTimeDomainData(this.dataArray);
        
        // Autocorrelation pitch detection
        const pitch = this.autoCorrelate(this.dataArray, this.audioContext.sampleRate);
        return pitch;
    }

    autoCorrelate(buffer, sampleRate) {
        const SIZE = buffer.length;
        const MAX_SAMPLES = Math.floor(SIZE / 2);
        let best_offset = -1;
        let best_correlation = 0;
        let rms = 0;
        
        for (let i = 0; i < SIZE; i++) {
            const val = buffer[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        
        if (rms < 0.01) return -1;
        
        let lastCorrelation = 1;
        for (let offset = 1; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;
            for (let i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);
            
            if (correlation > 0.9 && correlation > lastCorrelation) {
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            }
            lastCorrelation = correlation;
        }
        
        if (best_correlation > 0.01 && best_offset !== -1) {
            return sampleRate / best_offset;
        }
        return -1;
    }

    getVolume() {
        if (!this.isActive || !this.analyser) return 0;
        
        this.analyser.getFloatTimeDomainData(this.dataArray);
        let sum = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            sum += this.dataArray[i] * this.dataArray[i];
        }
        return Math.sqrt(sum / this.bufferLength);
    }
}

export class Visualizer3D {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.spectrogramData = [];
        this.maxHistory = 200;
    }

    drawSpectrogram(frequencyData) {
        // Shift existing data
        this.spectrogramData.push([...frequencyData]);
        if (this.spectrogramData.length > this.maxHistory) {
            this.spectrogramData.shift();
        }

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const sliceWidth = this.width / this.spectrogramData.length;
        const barHeight = this.height / frequencyData.length;

        this.spectrogramData.forEach((slice, x) => {
            slice.forEach((value, y) => {
                const intensity = value / 255;
                const hue = (1 - intensity) * 240; // Blue to red
                this.ctx.fillStyle = `hsl(${hue}, 100%, ${intensity * 50}%)`;
                this.ctx.fillRect(
                    x * sliceWidth,
                    this.height - (y * barHeight),
                    sliceWidth + 1,
                    barHeight + 1
                );
            });
        });
    }

    drawPitchContour(pitchHistory) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (pitchHistory.length < 2) return;

        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const sliceWidth = this.width / pitchHistory.length;
        const minPitch = Math.min(...pitchHistory.filter(p => p > 0));
        const maxPitch = Math.max(...pitchHistory.filter(p => p > 0));
        const range = maxPitch - minPitch || 100;

        pitchHistory.forEach((pitch, i) => {
            if (pitch > 0) {
                const x = i * sliceWidth;
                const y = this.height - ((pitch - minPitch) / range) * this.height;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
        });

        this.ctx.stroke();
    }

    drawRhythmCircle(beats, currentBeat) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) / 3;

        // Draw circle
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Draw beats
        beats.forEach((beat, i) => {
            const angle = (i / beats.length) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            this.ctx.fillStyle = i === currentBeat ? '#00ff00' : (beat ? '#fff' : '#333');
            this.ctx.beginPath();
            this.ctx.arc(x, y, 10, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}

export class ProgressTracker {
    constructor() {
        this.achievements = [];
        this.scores = {};
        this.level = 1;
        this.xp = 0;
    }

    loadProgress() {
        const saved = localStorage.getItem('ethnomusicology_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.achievements = data.achievements || [];
            this.scores = data.scores || {};
            this.level = data.level || 1;
            this.xp = data.xp || 0;
        }
    }

    saveProgress() {
        localStorage.setItem('ethnomusicology_progress', JSON.stringify({
            achievements: this.achievements,
            scores: this.scores,
            level: this.level,
            xp: this.xp
        }));
    }

    addAchievement(achievement) {
        if (!this.achievements.includes(achievement)) {
            this.achievements.push(achievement);
            this.addXP(50);
            this.saveProgress();
            return true;
        }
        return false;
    }

    addXP(points) {
        this.xp += points;
        const xpForNextLevel = this.level * 100;
        if (this.xp >= xpForNextLevel) {
            this.level++;
            this.xp -= xpForNextLevel;
        }
        this.saveProgress();
    }

    recordScore(gameType, score) {
        if (!this.scores[gameType] || score > this.scores[gameType]) {
            this.scores[gameType] = score;
            this.addXP(10);
            this.saveProgress();
        }
    }

    getAchievements() {
        return this.achievements;
    }

    getBadges() {
        const badges = [];
        if (this.achievements.length >= 5) badges.push({ name: 'Explorer', icon: '🌍' });
        if (this.achievements.length >= 10) badges.push({ name: 'Scholar', icon: '📚' });
        if (this.level >= 5) badges.push({ name: 'Apprentice', icon: '🎵' });
        if (this.level >= 10) badges.push({ name: 'Master', icon: '🎼' });
        if (this.scores.rhythm >= 80) badges.push({ name: 'Rhythm Pro', icon: '🥁' });
        if (this.scores.quiz >= 90) badges.push({ name: 'Quiz Champion', icon: '🏆' });
        return badges;
    }
}

export const musicalGlossary = {
    'Rhythm': 'The pattern of sounds and silences in time',
    'Pitch': 'How high or low a sound is',
    'Timbre': 'The quality or color of a sound that distinguishes different instruments',
    'Tempo': 'The speed of the music, measured in beats per minute (BPM)',
    'Scale': 'A sequence of notes in ascending or descending order',
    'Pentatonic': 'A musical scale with five notes per octave',
    'Polyrhythm': 'The simultaneous use of two or more conflicting rhythms',
    'Raga': 'A melodic framework for improvisation in Indian classical music',
    'Maqam': 'A system of melodic modes used in traditional Arabic music',
    'Tala': 'Rhythmic cycles in Indian classical music',
    'Octave': 'The interval between one musical pitch and another with double its frequency',
    'Harmony': 'The combination of simultaneously sounded musical notes',
    'Melody': 'A sequence of single notes that is musically satisfying',
    'Syncopation': 'A disturbance or interruption of the regular flow of rhythm',
    'Drone': 'A sustained note or chord',
    'Improvisation': 'Creating music spontaneously while performing',
    'Ornament': 'A musical embellishment or decoration',
    'Modal': 'Music based on modes rather than major/minor scales',
    'Microtone': 'An interval smaller than a semitone',
    'Overtone': 'Higher frequencies that sound along with the fundamental pitch'
};

// World Map Initialization
export async function initializeWorldMap() {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) return null;

    try {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.warn('Leaflet library not loaded');
            return null;
        }

        // Initialize map centered on the world
        const map = L.map('world-map').setView([20, 0], 2);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Import culture data
        const { getAllExpandedCultures } = await import('./expandedCultures.js');
        const cultures = getAllExpandedCultures();

        // Color mapping for different regions
        const regionColors = {
            'West Africa': '#FF6B6B',
            'East Africa': '#FF6B6B',
            'South Africa': '#FF6B6B',
            'Africa': '#FF6B6B',
            'Middle East': '#FFA500',
            'Central Asia': '#FFA500',
            'South Asia': '#FFD700',
            'Southeast Asia': '#90EE90',
            'East Asia': '#87CEEB',
            'Europe': '#DDA0DD',
            'Spain': '#DDA0DD',
            'North America': '#FF1493',
            'South America': '#FF1493',
            'Latin America': '#FF1493',
            'South America/Caribbean': '#20B2AA',
            'Caribbean': '#20B2AA',
            'Caribbean Islands': '#20B2AA',
            'Venezuela': '#FF1493',
            'Australia': '#20B2AA',
            'Oceania': '#20B2AA'
        };

        // Add markers for each culture with coordinates
        cultures.forEach(culture => {
            if (culture.coordinates) {
                const { lat, lng } = culture.coordinates;
                const color = regionColors[culture.region] || '#999999';
                
                const popupContent = `
                    <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px;">${culture.emoji} ${culture.name}</div>
                    <div style="font-size: 0.9em; color: #666; margin-bottom: 8px;">${culture.region}</div>
                    <div style="font-size: 0.85em; line-height: 1.4;">${culture.description}</div>
                `;
                
                L.circleMarker([lat, lng], {
                    radius: 8,
                    fillColor: color,
                    color: '#333',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                })
                .bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'culture-popup'
                })
                .addTo(map);
            }
        });

        // Add legend
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function() {
            const div = L.DomUtil.create('div', 'info legend');
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';
            div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
            div.style.fontSize = '12px';
            
            const regions = [
                { color: '#FF6B6B', label: 'Africa' },
                { color: '#FFA500', label: 'Middle East/Central Asia' },
                { color: '#FFD700', label: 'South Asia' },
                { color: '#90EE90', label: 'Southeast Asia' },
                { color: '#87CEEB', label: 'East Asia' },
                { color: '#DDA0DD', label: 'Europe' },
                { color: '#FF1493', label: 'Americas' },
                { color: '#20B2AA', label: 'Caribbean/Oceania' }
            ];
            
            div.innerHTML = '<div style="font-weight: bold; margin-bottom: 8px;">World Music Regions</div>';
            regions.forEach(region => {
                div.innerHTML += `<div style="margin: 5px 0;"><span style="display:inline-block; width:15px; height:15px; background-color:${region.color}; border-radius:50%; margin-right:8px; border: 1px solid #333;"></span>${region.label}</div>`;
            });
            
            return div;
        };
        legend.addTo(map);

        // Handle map resize when tab becomes visible
        window.__WORLD_MAP = map;
        
        console.log(`World map initialized with ${cultures.filter(c => c.coordinates).length} cultures`);
        return map;
    } catch (e) {
        console.error('Error initializing map:', e);
        mapContainer.innerHTML = '<p style="padding:14px;background:#ffebee;border-left:4px solid #f44336;border-radius:8px;color:#b71c1c;">Map failed to load: ' + e.message + '</p>';
        return null;
    }
}

// Music Glossary Display Function
export function displayGlossary() {
    const glossaryContainers = document.querySelectorAll('[id^="glossary-content-"]');
    
    glossaryContainers.forEach(container => {
        if (!container) return;
        
        container.innerHTML = '';
        container.className = 'glossary-grid';
        
        Object.entries(musicalGlossary).forEach(([term, definition]) => {
            const item = document.createElement('div');
            item.className = 'glossary-item';
            item.innerHTML = `
                <div class="glossary-term">${term}</div>
                <div class="glossary-definition">${definition}</div>
            `;
            container.appendChild(item);
        });
    });
    
    console.log('Musical glossary displayed');
}

// Display Cultures Function
export async function displayCultures() {
    // Import culture data
    const { getAllExpandedCultures } = await import('./expandedCultures.js');
    const cultures = getAllExpandedCultures();
    
    // Update count
    const countEl = document.getElementById('culture-count');
    if (countEl) countEl.textContent = cultures.length;
    
    // Display culture cards
    const gridEl = document.getElementById('culture-grid');
    if (!gridEl) return;
    
    gridEl.innerHTML = '';
    gridEl.className = 'culture-grid';
    
    cultures.forEach(culture => {
        const card = document.createElement('div');
        card.className = 'culture-card';
        card.innerHTML = `
            <div class="culture-emoji">${culture.emoji}</div>
            <h3>${culture.name}</h3>
            <p class="culture-region">${culture.region}</p>
            <p class="culture-description">${culture.description}</p>
            <button class="btn-primary" data-culture-id="${culture.id}">Learn More</button>
        `;
        gridEl.appendChild(card);
    });
    
    console.log(`Displayed ${cultures.length} cultures`);
}

// Make functions globally available
window.initializeWorldMap = initializeWorldMap;
window.displayGlossary = displayGlossary;
window.displayCultures = displayCultures;
