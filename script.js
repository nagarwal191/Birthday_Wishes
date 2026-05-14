document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate the 25 reasons
    const reasonsGrid = document.getElementById('reasons-grid');
    const reasons = [
        "I love the way you care deeply for people you love.",
        "I love you smile. It makes my day.",
        "I love how safe and calm you make me feel, never felt this before.",
        "I love the way you listen to me, trying to become better with each passing day.",
        "I love your kindness, even when nobody is watching.",
        "I love how passionate you are about the things that matter to you.",
        "I love your little habits that only I notice.",
        "I love to see you enjoying the rain.",
        "I love how beautiful you are, in all your phases of your life.",
        "I love how strong you stay during difficult times.",
        "I love how you remember tiny details about me and do things to make me happy.",
        "I love how excited you get, even for smallest moments related to us.",
        "I love the comfort I feel when I talk to you.",
        "I love how supportive you are of my goals and dreams. More than me, you want me successfull.",
        "I love how genuine and real you are.",
        "I love the way you make ordinary moments feel special, with your presence.",
        "I love your voice — especially when you say my name iykyk",
        "I love how patient you are with me.",
        "I love how we are together in this distance phase, fighting but staying.",
        "I love your cute expressions and horny face.",
        "I love the way you love me wholeheartedly.",
        "I love how you inspire me to become a better person, individually and for us.",
        "I love your confidence and softness you carry at the same time.",
        "I love imagining a future with you in it.",
        "I love you not just for who you are today, but for the amazing woman you’re becoming at 25."
    ];

    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card reason-card';
        card.innerHTML = `
            <div class="reason-number">${index + 1}</div>
            <p class="reason-text">${reason}</p>
        `;
        reasonsGrid.appendChild(card);
    });

    // Add staggered fade-in animation for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reason-card').forEach((card) => {
        card.style.opacity = "0";
        observer.observe(card);
    });

    // 2. Logic for the evading "No" button
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionCard = document.querySelector('.question-card');
    
    const messages = [
        "Please say yes!", 
        "Are you sure?", 
        "Try again!", 
        "You can't catch me!", 
        "Don't break my heart!",
        "Think about it!",
        "Click the other one!"
    ];
    let messageIndex = 0;

    const moveButton = () => {
        // Change text
        noBtn.innerText = messages[messageIndex % messages.length];
        messageIndex++;

        // Calculate new position
        // We want to move it relative to its container to keep things sane,
        // but absolute positioning relative to viewport is funnier.
        // Let's make it fixed so it can go anywhere on screen.
        noBtn.style.position = 'fixed';
        
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = "1000";
    };

    // Trigger movement on mouseover (desktop) and touch/click (mobile)
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent accidental clicking
        moveButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // 3. Logic for the "Yes" button (Celebration!)
    const mainContainer = document.getElementById('main-container');
    const celebrationContainer = document.getElementById('celebration-container');

    const triggerCelebration = () => {
        // Hide main, show celebration
        mainContainer.style.display = 'none';
        celebrationContainer.classList.remove('hidden');

        // Fire Confetti!
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    yesBtn.addEventListener('click', triggerCelebration);
});
