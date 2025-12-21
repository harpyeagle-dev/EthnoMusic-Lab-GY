// Advanced Quiz System
export const culturalQuizQuestions = [
    {
        question: 'Which instrument is central to Indian classical music?',
        options: ['Sitar', 'Guitar', 'Piano', 'Trumpet'],
        correct: 0,
        category: 'instruments',
        difficulty: 'easy'
    },
    {
        question: 'What is a pentatonic scale?',
        options: ['3 notes', '5 notes', '7 notes', '12 notes'],
        correct: 1,
        category: 'theory',
        difficulty: 'easy'
    },
    {
        question: 'The kora is from which region?',
        options: ['East Asia', 'West Africa', 'Europe', 'South America'],
        correct: 1,
        category: 'geography',
        difficulty: 'easy'
    },
    {
        question: 'What is a raga in Indian classical music?',
        options: ['A drum pattern', 'A melodic framework', 'A dance form', 'A vocal technique'],
        correct: 1,
        category: 'theory',
        difficulty: 'medium'
    },
    {
        question: 'Flamenco music originated in which region?',
        options: ['Italy', 'Portugal', 'Andalusia, Spain', 'Greece'],
        correct: 2,
        category: 'geography',
        difficulty: 'medium'
    },
    {
        question: 'What is throat singing called in Mongolian?',
        options: ['Khöömei', 'Koto', 'Kora', 'Kendang'],
        correct: 0,
        category: 'culture',
        difficulty: 'hard'
    },
    {
        question: 'How many strings does a traditional koto have?',
        options: ['6', '12', '13', '21'],
        correct: 2,
        category: 'instruments',
        difficulty: 'hard'
    },
    {
        question: 'What is the rhythmic foundation of salsa music?',
        options: ['Clave', 'Tala', 'Maqam', 'Raga'],
        correct: 0,
        category: 'rhythm',
        difficulty: 'medium'
    },
    {
        question: 'The didgeridoo is traditionally from which culture?',
        options: ['Maori', 'Aboriginal Australian', 'Hawaiian', 'Inuit'],
        correct: 1,
        category: 'geography',
        difficulty: 'easy'
    },
    {
        question: 'What does "ma" mean in Japanese music?',
        options: ['Loud', 'Fast', 'Space/silence', 'Melody'],
        correct: 2,
        category: 'theory',
        difficulty: 'hard'
    },
    {
        question: 'Gamelan ensembles are primarily made of what type of instruments?',
        options: ['Strings', 'Bronze percussion', 'Woodwinds', 'Drums'],
        correct: 1,
        category: 'instruments',
        difficulty: 'medium'
    },
    {
        question: 'What is a maqam?',
        options: ['Arabic melodic mode system', 'Indian drum', 'Chinese flute', 'African dance'],
        correct: 0,
        category: 'theory',
        difficulty: 'medium'
    },
    {
        question: 'The charango is traditionally made from which material?',
        options: ['Bamboo', 'Armadillo shell', 'Coconut', 'Gourd'],
        correct: 1,
        category: 'instruments',
        difficulty: 'hard'
    },
    {
        question: 'What is the typical tempo range for samba?',
        options: ['60-80 BPM', '100-120 BPM', '180-200 BPM', '220-240 BPM'],
        correct: 2,
        category: 'rhythm',
        difficulty: 'medium'
    },
    {
        question: 'Which scale is most common in traditional Chinese music?',
        options: ['Major', 'Minor', 'Pentatonic', 'Chromatic'],
        correct: 2,
        category: 'theory',
        difficulty: 'easy'
    },
    {
        question: 'The tabla consists of how many drums?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        category: 'instruments',
        difficulty: 'easy'
    },
    {
        question: 'What is circular breathing used for?',
        options: ['Meditation', 'Continuous sound on wind instruments', 'Dancing', 'Vocal training'],
        correct: 1,
        category: 'technique',
        difficulty: 'medium'
    },
    {
        question: 'Bluegrass music originated in which region?',
        options: ['Texas', 'California', 'Appalachia', 'New England'],
        correct: 2,
        category: 'geography',
        difficulty: 'medium'
    },
    {
        question: 'What is a polyrhythm?',
        options: ['Multiple melodies', 'Multiple rhythms played simultaneously', 'Many instruments', 'Long composition'],
        correct: 1,
        category: 'theory',
        difficulty: 'medium'
    },
    {
        question: 'The steelpan was invented in which country?',
        options: ['Jamaica', 'Trinidad and Tobago', 'Barbados', 'Cuba'],
        correct: 1,
        category: 'geography',
        difficulty: 'hard'
    }
];

export function getQuizByDifficulty(difficulty) {
    return culturalQuizQuestions.filter(q => q.difficulty === difficulty);
}

export function getQuizByCategory(category) {
    return culturalQuizQuestions.filter(q => q.category === category);
}

export function getRandomQuestions(count) {
    const shuffled = [...culturalQuizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Lesson Plans for Educators
export const lessonPlans = [
    {
        id: 'intro-to-world-music',
        title: 'Introduction to World Music',
        grade: '6-8',
        duration: '45 minutes',
        objectives: [
            'Identify music from at least 3 different cultures',
            'Understand the concept of cultural music traditions',
            'Compare and contrast musical characteristics across cultures'
        ],
        activities: [
            'Listen to samples from 5 different cultures',
            'Complete the culture quiz',
            'Discuss similarities and differences',
            'Create a simple rhythm using the rhythm pads'
        ],
        assessment: 'Quiz score and class discussion participation',
        extensions: 'Research a culture not covered and present to class'
    },
    {
        id: 'rhythm-and-tempo',
        title: 'Understanding Rhythm and Tempo',
        grade: '4-6',
        duration: '30 minutes',
        objectives: [
            'Define rhythm and tempo',
            'Identify tempo in BPM',
            'Recognize different rhythmic patterns'
        ],
        activities: [
            'Analyze uploaded songs for tempo',
            'Play rhythm matching game',
            'Create rhythms with different tempos',
            'Compare rhythms across cultures'
        ],
        assessment: 'Rhythm game score and tempo identification accuracy',
        extensions: 'Compose original rhythm patterns'
    },
    {
        id: 'pitch-and-scales',
        title: 'Exploring Pitch and Musical Scales',
        grade: '7-10',
        duration: '50 minutes',
        objectives: [
            'Understand frequency and pitch relationship',
            'Identify different scale types',
            'Recognize cultural scale preferences'
        ],
        activities: [
            'Use live pitch detector to visualize voice',
            'Explore scale types with audio examples',
            'Compare pentatonic vs. heptatonic scales',
            'Match pitch challenge'
        ],
        assessment: 'Pitch matching game and scale identification quiz',
        extensions: 'Compose melody using different cultural scales'
    }
];

// Practice Exercises
export const practiceExercises = [
    {
        id: 'ear-training-basics',
        name: 'Ear Training: Pitch Recognition',
        type: 'listening',
        difficulty: 'beginner',
        instructions: 'Listen to each note and identify it. Start with just 3 notes.',
        exercises: 5,
        timeLimit: null
    },
    {
        id: 'rhythm-clapping',
        name: 'Rhythm Clapping Patterns',
        type: 'rhythm',
        difficulty: 'beginner',
        instructions: 'Listen to the rhythm pattern and clap it back accurately.',
        exercises: 8,
        timeLimit: null
    },
    {
        id: 'scale-singing',
        name: 'Scale Singing Practice',
        type: 'vocal',
        difficulty: 'intermediate',
        instructions: 'Sing the displayed scale pattern with correct pitches.',
        exercises: 5,
        timeLimit: null
    },
    {
        id: 'cultural-identification',
        name: 'Cultural Music Identification',
        type: 'listening',
        difficulty: 'intermediate',
        instructions: 'Listen to excerpts and identify the culture of origin.',
        exercises: 10,
        timeLimit: 120
    }
];

// Collaborative Features (for future multiplayer)
export class MultiplayerSession {
    constructor() {
        this.players = [];
        this.currentChallenge = null;
    }

    addPlayer(playerName) {
        this.players.push({
            name: playerName,
            score: 0,
            achievements: []
        });
    }

    startChallenge(challengeType) {
        this.currentChallenge = {
            type: challengeType,
            startTime: Date.now(),
            submissions: []
        };
    }

    submitAnswer(playerName, answer) {
        if (!this.currentChallenge) return;
        
        this.currentChallenge.submissions.push({
            player: playerName,
            answer: answer,
            timestamp: Date.now()
        });
    }

    getLeaderboard() {
        return this.players.sort((a, b) => b.score - a.score);
    }
}

// Accessibility Features
export const accessibilityHelpers = {
    textToSpeech: (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
    },

    increaseTextSize: () => {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        document.documentElement.style.fontSize = (currentSize + 2) + 'px';
    },

    decreaseTextSize: () => {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        document.documentElement.style.fontSize = Math.max(12, currentSize - 2) + 'px';
    },

    highContrast: (enable) => {
        if (enable) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }
};

// Mobile-specific optimizations
export const mobileOptimizations = {
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    enableTouchGestures: () => {
        // Swipe between tabs
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next tab
                console.log('Swipe left detected');
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous tab
                console.log('Swipe right detected');
            }
        }
    },

    optimizeForMobile: () => {
        if (mobileOptimizations.isMobile()) {
            // Reduce canvas sizes
            document.querySelectorAll('canvas').forEach(canvas => {
                canvas.style.maxWidth = '100%';
                canvas.style.height = 'auto';
            });
        }
    }
};
