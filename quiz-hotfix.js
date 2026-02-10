(function () {
    const replacement = {
        question: "What is Masquerade music in Guyana?",
        options: [
            "Carnival music",
            "Christmas music with Spanish-Venezuelan origins",
            "Emancipation-era Afro-Caribbean tradition",
            "Children's songs"
        ],
        correct: 2,
        explanation: "Masquerade is an Afro-Caribbean music and dance tradition in Guyana tied to Emancipation celebrations and festive community performances."
    };

    if (!window.quizQuestions || !Array.isArray(window.quizQuestions)) {
        return;
    }

    const matchFn = q => q && typeof q.question === 'string' && /parang\s+music\s+in\s+guyana/i.test(q.question);

    const idx = window.quizQuestions.findIndex(matchFn);
    if (idx !== -1) {
        window.quizQuestions[idx] = replacement;
    }

    if (Array.isArray(window.shuffledQuestions)) {
        const sidx = window.shuffledQuestions.findIndex(matchFn);
        if (sidx !== -1) {
            window.shuffledQuestions[sidx] = replacement;
        }
    }

    if (typeof window.loadQuestion === 'function' &&
        Array.isArray(window.shuffledQuestions) &&
        typeof window.currentQuestionIndex === 'number') {
        const current = window.shuffledQuestions[window.currentQuestionIndex];
        if (matchFn(current)) {
            window.shuffledQuestions[window.currentQuestionIndex] = replacement;
            window.loadQuestion();
        }
    }
})();
