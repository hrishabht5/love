const content = {
    7: {
        title: "🌹 Rose Day",
        icon: "🌹",
        message: "Every rose has its beauty, but none compared to yours. Sending you a virtual garden of love today!",
        btnText: "Accept my rose",
        interaction: "popup",
        alertText: "You accepted the rose! My love for you continues to bloom every single day. 🌹❤️"
    },
    8: {
        title: "💍 Propose Day",
        icon: "💍",
        message: "I don't need a thousand reasons to love you. Just one is enough – because you are you. Will you walk this life with me?",
        btnText: "Say YES!",
        interaction: "confetti",
        alertText: "My heart just skipped a beat! You've made me the happiest person alive. 💍✨"
    },
    9: {
        title: "🍫 Chocolate Day",
        icon: "🍫",
        message: "Life is like a box of chocolates, but having you makes it infinitely sweeter. Here's a digital treat for my sweetheart!",
        btnText: "Eat the Chocolate",
        interaction: "popup",
        alertText: "Mmm... sweet! But not as sweet as your smile. 🍫😋"
    },
    10: {
        title: "🧸 Teddy Day",
        icon: "🧸",
        message: "A teddy to tell you that I'm always thinking of you. Even when I'm not around, this virtual hug is yours.",
        btnText: "Hugging the Teddy",
        interaction: "shake",
        alertText: "The teddy is so happy! It says: 'I love you very much!' 🧸💖"
    },
    11: {
        title: "🤝 Promise Day",
        icon: "🤝",
        message: "I promise to hold your hand through every storm and celebrate every sunshine with you. Forever and always.",
        btnText: "Pinky Promise?",
        interaction: "popup",
        alertText: "Pinky promise kept! I will never let you go. 🤝❤️"
    },
    12: {
        title: "🫂 Hug Day",
        icon: "🫂",
        message: "Sometimes a hug is all we need to feel safe. Sending you the warmest, tightest virtual hug right now.",
        btnText: "Receive Hug",
        interaction: "zoom",
        alertText: "Can you feel the warmth? Sending you infinite hugs! 🫂🔥"
    },
    13: {
        title: "💋 Kiss Day",
        icon: "💋",
        message: "Sending you thousands of virtual kisses to let you know how much you mean to me. You're my favorite person!",
        btnText: "Catch the Kisses",
        interaction: "popup",
        alertText: "Mwah! Caught them all! You're so loved. 💋❤️"
    },
    14: {
        title: "💓 Valentine's Day",
        icon: "❤️",
        message: "You reached the last page… but this question is not for the screen. Close this website and look at me. I have something to ask you ❤️",
        btnText: "What is it?",
        special: true,
        interaction: "vday",
        alertText: "Close this website and look at me. I have something to ask you ❤️"
    }
};

function initApp() {
    // REAL-TIME DATE DETECTION: Website will now sync with the current date
    const today = new Date();
    const month = today.getMonth() + 1; // JS months are 0-11
    const day = today.getDate();

    if (month === 2 && day >= 7 && day <= 14) {
        displayDay(day);
    } else {
        displayFallback();
    }

    createBackgroundHearts();
}

function displayDay(day) {
    const data = content[day];
    const introView = document.getElementById('intro-view');
    const header = document.getElementById('main-header');
    const titleElem = document.getElementById('day-title');
    const iconElem = document.getElementById('day-icon');
    const messageElem = document.getElementById('day-message');
    const nextLine = document.getElementById('next-surprise-line');
    const journeyText = document.getElementById('journey-text');
    const acceptBtn = document.getElementById('accept-btn');

    // Default setup
    titleElem.innerHTML = data.title;
    iconElem.innerText = data.icon;
    messageElem.innerText = data.message;
    acceptBtn.innerText = data.btnText;

    // Journey Indicator Logic
    const weekMap = ["🌹", "💍", "🍫", "🧸", "🤝", "🫂", "💋", "❤️"];
    let journeyStr = "Valentine Week Journey: ";
    for (let i = 0; i < 8; i++) {
        const dayNum = i + 7;
        if (dayNum <= day) journeyStr += weekMap[i] + " ";
        else journeyStr += "⬜ ";
    }
    journeyText.innerText = journeyStr;

    // Reset views
    introView.style.display = "block";
    introView.style.opacity = "1";
    document.getElementById('interactive-view').style.display = "none";
    document.getElementById('propose-view').style.display = "none";

    if (day === 7) {
        acceptBtn.onclick = acceptRose;
        nextLine.innerText = "";
    } else if (day === 8) {
        /* PROPOSE DAY CONFIGURATION */
        acceptBtn.innerText = "Listen to my heart 💍";
        acceptBtn.onclick = startProposal;
        nextLine.innerText = "";

        // Memory Lock Check
        if (localStorage.getItem('propose_day_yes') === 'true') {
            setTimeout(() => {
                document.getElementById('intro-view').style.display = 'none';
                document.getElementById('propose-view').style.display = 'block';
                document.getElementById('memory-lock-view').style.display = 'block';
                document.getElementById('proposal-card-flow').style.display = 'none';
            }, 10);
        }
    } else if (day === 14) {
        document.getElementById('main-container').classList.add('special-page');
        header.innerText = "Happy Valentine's Day!";
        // For V-day, we can use the default handler or specialized one
        acceptBtn.onclick = handleInteraction;
        nextLine.innerText = "";
    } else if (day === 9) {
        acceptBtn.innerText = "Open My Sweet Surprise 🍫";
        acceptBtn.onclick = startChocolateSequence;
        nextLine.innerText = "";
    } else {
        acceptBtn.onclick = handleInteraction;
        nextLine.innerText = "Come back tomorrow for your next surprise ❤️";
    }
}

function startProposal() {
    const introView = document.getElementById('intro-view');
    const proposeView = document.getElementById('propose-view');
    const mainContainer = document.getElementById('main-container');
    const music = document.getElementById('bg-music');

    // Heartbeat Effect
    mainContainer.classList.add('heartbeat');
    setTimeout(() => mainContainer.classList.remove('heartbeat'), 1600);

    // Play Music
    music.play().catch(e => console.log("Music playback failed:", e));

    // Transition
    introView.style.transition = "opacity 0.5s ease";
    introView.style.opacity = "0";

    setTimeout(() => {
        introView.style.display = "none";
        proposeView.style.display = "block";
        proposeView.style.opacity = "0";
        setTimeout(() => {
            proposeView.style.opacity = "1";
            proposeView.style.transition = "opacity 0.5s ease";

            // Start Typewriter Effect
            const questionText = "Will you be mine forever? 💍";
            typeWriter("proposal-question-typed", questionText, 100);
        }, 50);
    }, 500);
}

/* TYPEWRITER FUNCTION */
function typeWriter(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);

    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

function handleProposal(answer) {
    if (answer === 'yes') {
        // Grand Burst Flash Effect (Slow recovery - 1.7s)
        const flashElem = document.getElementById('flash');
        flashElem.classList.add('animate-flash');
        setTimeout(() => flashElem.classList.remove('animate-flash'), 1700);

        localStorage.setItem('propose_day_yes', 'true');
        document.getElementById('proposal-card').style.display = 'none';

        const celebration = document.getElementById('propose-celebration');
        celebration.style.display = 'block';

        // ULTRA-GRAND Heart burst (120 particles for maximum effect)
        const heartsContainer = document.getElementById('hearts');
        for (let i = 0; i < 120; i++) {
            setTimeout(() => {
                spawnHeart(heartsContainer, [
                    '❤️', '💖', '💍', '✨', '💍', '💝', '👫', '🌹',
                    '🎈', '👰‍♀️', '🤵‍♂️', '🌈', '💎', '🔥', '🥰'
                ]);
            }, i * 25);
        }

        console.log("Proposal Accepted! Ultra-Grand Celebration triggered.");
    }
}

function acceptRose() {
    const introView = document.getElementById('intro-view');
    const interactiveView = document.getElementById('interactive-view');
    const music = document.getElementById('bg-music');

    // Play music when user clicks "Accept my rose" (Complies with browser policy)
    music.play().catch(e => console.log("Music playback failed:", e));

    // Smooth transition
    introView.style.transition = "opacity 0.5s ease";
    introView.style.opacity = "0";

    setTimeout(() => {
        introView.style.display = "none";
        interactiveView.style.display = "block";
        interactiveView.style.opacity = "0";
        setTimeout(() => {
            interactiveView.style.opacity = "1";
            interactiveView.style.transition = "opacity 0.5s ease";
            startRoseSequence();
        }, 50);
    }, 500);
}

/* CHOCOLATE DAY FUNCTIONS */
let chocolateState = {
    openedCount: 0,
    pickedIndices: new Set()
};

function startChocolateSequence() {
    const introView = document.getElementById('intro-view');
    const chocolateView = document.getElementById('chocolate-view');
    const music = document.getElementById('bg-music');
    const musicSource = document.getElementById('music-source');

    // Update music source for Chocolate Day
    musicSource.src = "Untill i found you X Perfect- Ringtone  Famous Love song  Instagram famous reels song 2023 - Ringtones Official.mp3";
    music.load(); // Reload the audio element to apply the new source
    music.play().catch(e => console.log("Music playback failed:", e));

    introView.style.transition = "opacity 0.5s ease";
    introView.style.opacity = "0";

    setTimeout(() => {
        introView.style.display = "none";
        chocolateView.style.display = "block";
        generateChocolates();
    }, 500);
}

function generateChocolates() {
    const grid = document.getElementById('chocolates-grid');
    grid.innerHTML = "";
    const types = ["🍫", "🍩", "🍪", "🧁", "🍬", "🍭", "🥨", "🍮", "🍰"];
    const messages = [
        "Every time I see you, my heart melts faster than this chocolate! 🍫❤️",
        "You are the 'glaze' to my life's donut. Infinite loops of love! 🍩💖",
        "I'm so lucky to have a 'tough cookie' like you who loves me so much. 🍪✨",
        "You're my little cupcake... the sweetest treat in the world! 🧁🍰",
        "Life is like candy, it's best when shared with someone as sweet as you. 🍬🍭",
        "You make my heart pop with joy every single second! 🍭💓",
        "I'm totally twisted for you, forever and always! 🥨🔥",
        "You're the pudding to my pie. Perfect in every way. 🍮💫",
        "Every day with you feels like a grand celebration cake! 🍰🌈"
    ];

    types.forEach((icon, index) => {
        const item = document.createElement('div');
        item.className = 'chocolate-item';
        if (chocolateState.pickedIndices.has(index)) item.classList.add('opened');
        item.innerHTML = icon;
        item.onclick = () => pickChocolate(item, index, messages[index]);
        grid.appendChild(item);
    });
}

function openChocolateBox() {
    const lid = document.getElementById('box-lid');
    lid.classList.add('open');
    setTimeout(() => {
        document.getElementById('chocolate-message-display').style.display = 'block';
        popupText("choco-msg-text", "Pick a treat! Each one has a secret memory for you... ❤️");
    }, 800);
}

function popupText(elementId, text) {
    const element = document.getElementById(elementId);
    element.innerText = text;
    element.classList.remove('pop-in');
    void element.offsetWidth; // Trigger reflow for animation restart
    element.classList.add('pop-in');
}

function pickChocolate(element, index, message) {
    if (element.classList.contains('selected') || element.classList.contains('opened')) return;

    // UI Selection Flow
    const grid = document.getElementById('chocolates-grid');
    grid.classList.add('selection-active');
    element.classList.add('selected');

    // Hide lid temporarily for focus
    document.getElementById('box-lid').style.opacity = "0";

    // Play sparkle effect
    element.classList.add('heartbeat');

    const msgBox = document.getElementById('choco-msg-text');
    const pickAnotherBtn = document.getElementById('pick-another-btn');

    // Smooth transition to text
    setTimeout(() => {
        popupText("choco-msg-text", message);

        // Mark as opened
        chocolateState.pickedIndices.add(index);
        element.classList.add('opened');

        // Show "Pick another" button
        setTimeout(() => {
            pickAnotherBtn.style.display = 'inline-block';

            if (chocolateState.pickedIndices.size === 9) {
                pickAnotherBtn.innerText = "See your final surprise ✨";
                pickAnotherBtn.onclick = showChocolateCompletion;
            }
        }, 1000); // Slightly faster
    }, 800);
}

function resetToGrid() {
    const grid = document.getElementById('chocolates-grid');
    const selected = document.querySelector('.chocolate-item.selected');
    const pickAnotherBtn = document.getElementById('pick-another-btn');
    const lid = document.getElementById('box-lid');

    if (selected) {
        selected.classList.remove('selected');
        // Briefly keep the heartbeat to show it was recently active
        setTimeout(() => selected.classList.remove('heartbeat'), 1000);
    }

    grid.classList.remove('selection-active');
    pickAnotherBtn.style.display = 'none';
    lid.style.opacity = "0.2";

    document.getElementById('choco-msg-text').innerText = "Pick another piece of my heart... ❤️";
}

function showChocolateCompletion() {
    const music = document.getElementById('bg-music');
    music.pause();

    document.getElementById('chocolate-box-flow').style.display = 'none';
    document.getElementById('chocolate-completion-view').style.display = 'block';

    const container = document.getElementById('main-container');
    container.classList.add('grand-celebration');

    // Extra celebration burst
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 60; i++) {
        setTimeout(() => spawnHeart(heartsContainer, ['🍬', '🍫', '✨', '💖', '❤️']), i * 40);
    }
}



function startRoseSequence() {
    console.log("Starting continuous rose balloon sequence...");
    const messages = [
        "This rose is for your smile 🌹",
        "This rose is for your kindness 💖",
        "This rose is for my favourite doctor 👩‍⚕️",
        "This rose is for being you ✨",
        "This rose is for your cute anger 😤❤️",
        "This rose is for your hard work 🌼",
        "This rose is for the way you care about everyone 🤍",
        "This rose is for your sleepy good mornings ☕🌹",
        "This rose is for your patience with me 😌",
        "This rose is for the way you motivate me 💫",
        "This rose is for your beautiful heart 💗",
        "This rose is for every little thing you do for others 🌸",
        "This rose is for your lovely laugh 😄🌹",
        "This rose is for the way you make me feel safe 🤗",
        "This rose is for your sweet voice 🎶",
        "This rose is for the dreams you work so hard for 🌈",
        "This rose is for the way you never give up 💪🌹",
        "This rose is for the warmth you bring into my life 🔥❤️",
        "This rose is for the light you carry inside ✨🌹",
        "This rose is just because I love you 💌"

    ];

    const balloonContainer = document.getElementById('balloon-container');
    let messageIndex = 0;

    // Spawn first one immediately
    spawnRoseBalloon(balloonContainer, messages[messageIndex]);
    messageIndex++;

    // Continuous loop every 3 seconds for a dense effect
    const loopInterval = setInterval(() => {
        spawnRoseBalloon(balloonContainer, messages[messageIndex]);
        messageIndex = (messageIndex + 1) % messages.length;
    }, 3500);
}

function spawnRoseBalloon(container, message) {
    const balloon = document.createElement('div');
    balloon.className = 'rose-balloon';

    // Better horizontal distribution
    const leftPos = 5 + (Math.random() * 80);
    balloon.style.left = leftPos + 'vw';

    balloon.innerHTML = `
        <span>🌹</span>
        <div class="balloon-tag">${message}</div>
    `;

    container.appendChild(balloon);
    console.log("Balloon spawned:", message);
}

function displayFallback() {
    const titleElem = document.getElementById('day-title');
    const iconElem = document.getElementById('day-icon');
    const messageElem = document.getElementById('day-message');
    const btn = document.getElementById('accept-btn');
    const nextLine = document.getElementById('next-surprise-line');

    titleElem.innerText = "Waiting for Love...";
    iconElem.innerText = "⌛";
    messageElem.innerText = "Valentine Week hasn’t started yet. Please come back on Feb 7 ❤️";
    btn.style.display = "none";
    nextLine.innerText = "The magic is just around the corner!";

    // Start Countdown
    startCountdown();
}

function startCountdown() {
    const container = document.getElementById('countdown-container');
    const targetDate = new Date("February 7, 2026 00:00:00").getTime();
    let lastValues = {};

    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            container.style.display = 'none';
            return;
        }

        const currentValues = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };

        const segments = ['days', 'hours', 'minutes', 'seconds'];
        const labels = { days: 'Days', hours: 'Hrs', minutes: 'Min', seconds: 'Sec' };

        let html = '';
        segments.forEach(seg => {
            const hasChanged = currentValues[seg] !== lastValues[seg];
            const popClass = hasChanged ? 'pop-val' : '';
            html += `
                <div class="countdown-segment">
                    <span class="countdown-value ${popClass}">${currentValues[seg]}</span>
                    <span class="countdown-label">${labels[seg]}</span>
                </div>
            `;
        });

        container.innerHTML = html;
        lastValues = currentValues;
    }

    update();
    setInterval(update, 1000);
}

function handleInteraction() {
    const today = new Date();
    const day = today.getDate();
    const data = content[day];

    if (!data) return;

    const container = document.getElementById('main-container');

    // Animation effects
    if (data.interaction === "shake") {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    } else if (data.interaction === "zoom") {
        container.style.transform = "scale(1.1)";
        setTimeout(() => container.style.transform = "scale(1)", 500);
    }

    // Delay alert slightly to let animation start
    setTimeout(() => {
        alert(data.alertText);
    }, 100);
}

function createBackgroundHearts() {
    const container = document.getElementById('hearts');
    const heartIcons = ['❤️', '💖', '💕', '💗', '🌸', '✨'];

    // Initial batch
    for (let i = 0; i < 15; i++) {
        spawnHeart(container, heartIcons);
    }

    // Continuous flow
    setInterval(() => {
        spawnHeart(container, heartIcons);
    }, 800);
}

function spawnHeart(container, icons) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 30 + 30) + 'px'; // Increased size: 30px to 60px
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const ctrl = document.getElementById('music-control');
    if (music.paused) {
        music.play().catch(e => {
            console.log("Music blocked by browser");
            alert("Click anywhere on the page first to allow music! 🎵");
        });
        ctrl.innerText = "⏸️";
    } else {
        music.pause();
        ctrl.innerText = "🎵";
    }
}

// Initial Run
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Force scroll to top on refresh to ensure centering
    window.scrollTo(0, 0);
});

