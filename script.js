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

    // URL OVERRIDE: Add ?day=14 to your URL to test specific days easily
    const urlParams = new URLSearchParams(window.location.search);
    const forceDay = parseInt(urlParams.get('day'));

    if (forceDay && forceDay >= 7 && forceDay <= 14) {
        displayDay(forceDay);
    } else if (month === 2 && day >= 7 && day <= 14) {
        displayDay(day);
    } else if (month === 2 && day > 14) {
        displayDay(14); // Keep V-day content after the week ends
    } else {
        displayFallback();
    }

    createBackgroundHearts();
}

function playRomanticMusic() {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(e => console.log("Music waiting for interaction"));
    }
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

    // Ensure correct music for Valentine Week
    const music = document.getElementById('bg-music');
    if (music && !music.src.includes("Untill%20i%20found%20you")) {
        music.src = "Untill i found you X Perfect- Ringtone  Famous Love song  Instagram famous reels song 2023 - Ringtones Official.mp3";
    }

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
    } else if (day === 9) {
        acceptBtn.innerText = "Open My Sweet Surprise 🍫";
        acceptBtn.onclick = startChocolateSequence;
        nextLine.innerText = "";
    } else if (day === 10) {
        acceptBtn.innerText = content[day].btnText;
        acceptBtn.onclick = handleTeddyHug;
        nextLine.innerText = "Squeeze the teddy! 🧸❤️";
    } else if (day === 11) {
        acceptBtn.onclick = handlePromiseDay;
        nextLine.innerText = "Come back tomorrow for your next surprise ❤️";
    } else if (day === 12) {
        setupHoldToHug();
        nextLine.innerText = "Hold the button tight... ❤️";
    } else if (day === 13) {
        acceptBtn.onclick = handleKissDay;
        nextLine.innerText = "Catch them if you can! 💋✨";
    } else if (day === 14) {
        document.getElementById('main-container').classList.add('special-page');
        header.innerText = "Happy Valentine's Day!";
        acceptBtn.onclick = startGrandFinale;
        acceptBtn.innerText = "What is it? ❤️";
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
    if (!noBtn) return;

    // CRITICAL FIX: The button was being clipped by the main card's 'overflow: hidden'.
    // We move it to the body so it can run across the whole screen.
    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
    }

    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '100000';
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const margin = 50;

    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    const randomX = Math.max(margin, Math.floor(Math.random() * maxX));
    const randomY = Math.max(margin, Math.floor(Math.random() * maxY));

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
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

    // Play music when user clicks "Accept"
    music.play().catch(e => console.log("Music playback waiting for interaction"));

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
    music.play().catch(e => console.log("Music playback waiting for interaction"));

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

    // Spawn in pink background areas only (left or right of the card)
    // Use alternating zones to prevent overlap/grouping
    const existingBalloons = container.querySelectorAll('.rose-balloon').length;
    const spawnLeft = existingBalloons % 2 === 0;

    let leftPos;
    if (spawnLeft) {
        // Left side: 10-25vw (keeps message within screen)
        leftPos = 10 + (Math.random() * 15);
    } else {
        // Right side: 65-80vw (keeps message within screen)
        leftPos = 65 + (Math.random() * 15);
    }
    balloon.style.left = leftPos + 'vw';

    // Rose on top, message below
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

    // Set special music for fallback
    const music = document.getElementById('bg-music');
    if (music) {
        music.src = "Voh Dekhnay Mein Full Video - London Paris New YorkAli Zafar, Aditi Rao Hydari - SonyMusicIndiaVEVO.mp3";
    }

    btn.style.display = "inline-block";
    btn.innerText = "Tap for a Pre-Valentine Treat 🎵";
    btn.onclick = () => {
        playRomanticMusic();
        btn.style.display = "none";
    };

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
    playRomanticMusic();
    const today = new Date();
    const day = today.getDate();
    const data = content[day];

    if (!data) return;

    const container = document.getElementById('main-container');
    const heartsContainer = document.getElementById('hearts');

    // Grand Celebration for any interaction
    for (let i = 0; i < 30; i++) {
        setTimeout(() => spawnHeart(heartsContainer, ['✨', '💖', '❤️', '🌸', '✨']), i * 50);
    }

    // Animation effects
    if (data.interaction === "shake") {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    } else if (data.interaction === "zoom") {
        container.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        container.style.transform = "scale(1.1)";
        setTimeout(() => container.style.transform = "scale(1)", 500);
    }

    // Delay alert slightly to let animation start
    setTimeout(() => {
        // Use a prettier alert if possible, or just the standard one for now
        alert(data.alertText);
    }, 100);
}

function handleTeddyHug() {
    playRomanticMusic();
    const iconElem = document.getElementById('day-icon');
    const heartsContainer = document.getElementById('hearts');
    const mainContainer = document.getElementById('main-container');

    // 1. Zoom Forward Animation
    iconElem.classList.remove('virtual-hug-anim');
    void iconElem.offsetWidth; // Trigger reflow
    iconElem.classList.add('virtual-hug-anim');

    // 2. Extra Celebration Burst
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            spawnHeart(heartsContainer, ['🧸', '❤️', '💖', '🫂', '✨', '☁️']);
        }, i * 30);
    }

    // 3. Cinematic Screen Overlay Hug Effect
    const overlay = document.createElement('div');
    overlay.className = 'hug-overlay';

    overlay.innerHTML = `
        <div class="giant-heart-glow">💖</div>
        <div class="romantic-quote">“Sometimes, all you need is a hug to feel home.”</div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3500);

    // 4. Sequential Messages
    const messages = [
        "Coming in for a hug! 🤗",
        "SQUIIIIIISH! 🧸💖",
        "Can you feel it? 🫂✨",
        "I love you thiiiiis much! ❤️"
    ];

    messages.forEach((msg, i) => {
        setTimeout(() => showFloatingText(msg), i * 800);
    });
}

function showFloatingText(text) {
    const container = document.getElementById('main-container');
    const floating = document.createElement('div');
    floating.className = 'floating-hug-msg';
    floating.innerText = text;

    // CSS for this is small, I'll add it to handleTeddyHug or style.css
    floating.style.position = 'absolute';
    floating.style.bottom = '120px';
    floating.style.left = '50%';
    floating.style.transform = 'translateX(-50%)';
    floating.style.background = 'white';
    floating.style.padding = '10px 20px';
    floating.style.borderRadius = '20px';
    floating.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    floating.style.color = '#e01e5a';
    floating.style.fontWeight = '600';
    floating.style.zIndex = '100';
    floating.style.animation = 'floatUpFade 1.5s forwards';

    container.appendChild(floating);
    setTimeout(() => floating.remove(), 1500);
}

// Add CSS animation for floating text if not exists
if (!document.getElementById('hug-animations')) {
    const style = document.createElement('style');
    style.id = 'hug-animations';
    style.innerHTML = `
        @keyframes floatUpFade {
            0% { transform: translateX(-50%) translateY(0); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateX(-50%) translateY(-50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
function handlePromiseDay() {
    playRomanticMusic();
    const heartsContainer = document.getElementById('hearts');

    // 1. Create Golden Thread Sweep
    const thread = document.createElement('div');
    thread.className = 'golden-thread';
    document.body.appendChild(thread);
    setTimeout(() => thread.remove(), 2000);

    // 2. Create Promise Wall Overlay
    const wall = document.createElement('div');
    wall.className = 'promise-wall';
    wall.style.opacity = '1';
    wall.style.pointerEvents = 'auto';

    const vows = [
        { title: "I Promise...", text: "To always listen, even when you don't speak a word. 🕊️" },
        { title: "I Promise...", text: "To be your calm in the middle of every storm. ⛈️✨" },
        { title: "I Promise...", text: "To choose you, every single day, over and over. ❤️" },
        { title: "I Promise...", text: "To never let go of the hand I'm holding today. 🤝✨" }
    ];

    document.body.appendChild(wall);

    // Display vows sequentially
    vows.forEach((vow, i) => {
        setTimeout(() => {
            wall.innerHTML = `
                <div class="promise-vow-card">
                    <h3>${vow.title}</h3>
                    <p>${vow.text}</p>
                </div>
            `;
            // Spawn some golden sparkles
            for (let j = 0; j < 10; j++) spawnHeart(heartsContainer, ['✨', '🌟', '💫']);
        }, i * 2000);
    });

    // 3. Final Seal
    setTimeout(() => {
        wall.innerHTML = `
            <div class="promise-vow-card" style="border-color: #ff5d8f;">
                <h3 style="color: #ff5d8f;">Pinky Promise Kept</h3>
                <div class="golden-seal">🤝✨</div>
                <p>My heart is yours, forever and always.</p>
                <button class="action-button" style="margin-top:20px;" onclick="closePromiseWall()">I Promise Too ❤️</button>
            </div>
        `;
    }, vows.length * 2000);
}

function closePromiseWall() {
    const wall = document.querySelector('.promise-wall');
    if (wall) {
        wall.style.animation = 'fadeOut 0.8s forwards';
        setTimeout(() => wall.remove(), 800);
    }
}

function setupHoldToHug() {
    const btn = document.getElementById('accept-btn');
    btn.innerText = "Hold to Embrace 🫂";

    // Add progress bar to the message area
    const msgElem = document.getElementById('day-message');
    if (!document.querySelector('.warmth-progress-container')) {
        const progContainer = document.createElement('div');
        progContainer.className = 'warmth-progress-container';
        progContainer.innerHTML = '<div class="warmth-progress-bar"></div>';
        msgElem.appendChild(progContainer);
    }

    let holdTimer;
    let progress = 0;
    const holdDuration = 3000; // 3 seconds
    const intervalTime = 50;

    const startHold = (e) => {
        playRomanticMusic();
        e.preventDefault();
        document.querySelector('.warmth-progress-container').style.display = 'block';
        document.getElementById('main-container').classList.add('vibrating');

        // Show hands
        spawnHugHands();

        holdTimer = setInterval(() => {
            progress += (intervalTime / holdDuration) * 100;

            // Haptic feedback (Vibration)
            if (navigator.vibrate) {
                navigator.vibrate(50); // Short pulses
            }

            if (progress >= 100) {
                progress = 100;
                clearInterval(holdTimer);
                triggerSoulFlare();
            }
            updateHugProgress(progress);
        }, intervalTime);
    };

    const endHold = () => {
        clearInterval(holdTimer);
        document.getElementById('main-container').classList.remove('vibrating');
        if (navigator.vibrate) navigator.vibrate(0); // Stop vibration

        if (progress < 100) {
            progress = 0;
            updateHugProgress(0);
            document.querySelector('.warmth-progress-container').style.display = 'none';
            removeHugHands();
        }
    };

    btn.onmousedown = startHold;
    btn.onmouseup = endHold;
    btn.ontouchstart = startHold;
    btn.ontouchend = endHold;
}

function spawnHugHands() {
    if (document.querySelector('.hug-hands-container')) return;
    const container = document.createElement('div');
    container.className = 'hug-hands-container';
    container.innerHTML = `
        <div class="hug-hand left">🫂</div>
        <div class="hug-hand right">🫂</div>
    `;
    document.body.appendChild(container);
}

function updateHugProgress(val) {
    const bar = document.querySelector('.warmth-progress-bar');
    const leftHand = document.querySelector('.hug-hand.left');
    const rightHand = document.querySelector('.hug-hand.right');

    if (bar) bar.style.width = val + '%';

    if (leftHand && rightHand) {
        // Hands meet at 50vw
        const move = (val / 100) * 50;
        leftHand.style.left = `calc(${move}vw - 5rem)`;
        rightHand.style.right = `calc(${move}vw - 5rem)`;

        // Intensity glow
        document.body.style.filter = `saturate(${100 + val}%) brightness(${100 + val / 4}%)`;
    }
}

function removeHugHands() {
    const container = document.querySelector('.hug-hands-container');
    if (container) container.remove();
    document.body.style.filter = 'none';
}

function triggerSoulFlare() {
    const flare = document.createElement('div');
    flare.className = 'soul-flare';
    document.body.appendChild(flare);

    // Animation
    flare.style.animation = 'flareBurst 2s ease-out forwards';

    const msg = document.createElement('div');
    msg.className = 'bloom-message';
    msg.innerText = "Everything feels better when I'm in your arms. 🫂✨";
    document.body.appendChild(msg);
    msg.style.animation = 'messageBloom 1.5s ease-out forwards 0.5s';

    // Heart Storm
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 100; i++) {
        setTimeout(() => spawnHeart(heartsContainer, ['🫂', '❤️', '💖', '✨', '🔥']), i * 20);
    }

    setTimeout(() => {
        flare.remove();
        msg.remove();
        removeHugHands();
        progress = 0;
        updateHugProgress(0);
        document.querySelector('.warmth-progress-container').style.display = 'none';
        document.getElementById('main-container').classList.remove('vibrating');
        // Removed alert as per user request
    }, 5000);
}

function handleKissDay() {
    playRomanticMusic();
    const heartsContainer = document.getElementById('hearts');
    const mainContainer = document.getElementById('main-container');

    // 1. Screen Impact Animation
    mainContainer.classList.remove('screen-impact');
    void mainContainer.offsetWidth; // Trigger reflow
    mainContainer.classList.add('screen-impact');

    // 2. MWAH Flash!
    const flash = document.createElement('div');
    flash.className = 'mwah-flash';
    flash.innerHTML = 'MWAH! 💋✨';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2500);

    // 3. Screen Smacker Effect (Big lip prints)
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const stamp = document.createElement('div');
            stamp.className = 'lip-stamp';
            stamp.innerHTML = '💋';
            stamp.style.left = (Math.random() * 60 + 10) + 'vw';
            stamp.style.top = (Math.random() * 60 + 10) + 'vh';
            document.body.appendChild(stamp);

            // Haptic Vibration for each smack
            if (navigator.vibrate) navigator.vibrate(100);

            setTimeout(() => stamp.remove(), 1500);
        }, i * 400);
    }

    // 4. Heart & Lip Vortex
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.className = 'vortex-particle';
            p.innerHTML = ['💋', '❤️', '💖', '✨'][Math.floor(Math.random() * 4)];
            p.style.left = '50vw';
            p.style.top = '50vh';
            p.style.fontSize = (Math.random() * 30 + 20) + 'px';
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 4000);
        }, i * 30);
    }

    // 5. Romantic Messages
    const messages = [
        "Sending you endless love! 💋",
        "You're my favorite person to kiss. ❤️",
        "Can you feel the love? ✨",
        "MMMM-MWAH! 😊💖"
    ];

    messages.forEach((msg, i) => {
        setTimeout(() => showFloatingText(msg), i * 900);
    });
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

/* --- GRAND FINALE FUNCTIONS --- */

function startGrandFinale() {
    const introView = document.getElementById('intro-view');
    const finaleView = document.getElementById('grand-finale-view');
    const music = document.getElementById('bg-music');

    introView.style.transition = "opacity 1s ease";
    introView.style.opacity = "0";

    setTimeout(() => {
        introView.style.display = "none";
        finaleView.style.display = "block";

        music.play().catch(e => console.log("Music playback waiting for interaction"));
    }, 1000);
}

function openLocket() {
    const locket = document.querySelector('.locket');
    if (locket.classList.contains('open')) return;

    locket.classList.add('open');

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    setTimeout(() => {
        startAuroraCinematic();
    }, 1500);
}

function startAuroraCinematic() {
    const locketStage = document.getElementById('locket-stage');
    const auroraStage = document.getElementById('aurora-stage');
    const locketWrap = document.querySelector('.locket-wrapper');

    document.body.classList.add('aurora-active');

    const glow = document.createElement('div');
    glow.className = 'aurora-glow';
    auroraStage.appendChild(glow);

    locketWrap.style.transition = "opacity 1.5s ease";
    locketWrap.style.opacity = "0";

    setTimeout(() => {
        locketStage.style.display = "none";
        auroraStage.style.display = "block";

        spawnFallingMemories();
        setTimeout(showFinalBridge, 10000);
    }, 1500);
}

function spawnFallingMemories() {
    const container = document.getElementById('falling-memories-container');
    const quotes = [
        "Your beautiful smile", "The way you care", "Our late night talks",
        "Your kindness", "My favourite doctor", "The light in your eyes",
        "How safe you make me feel", "Your lovely laugh",
        "Your patience with me", "The way you motivate me"
    ];

    let count = 0;
    const interval = setInterval(() => {
        if (count > 60) {
            clearInterval(interval);
            return;
        }

        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = "🌸";

        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 4;
        const fontSize = 20 + Math.random() * 20;

        petal.style.left = left + 'vw';
        petal.style.fontSize = fontSize + 'px';
        petal.style.animation = `fall ${duration}s linear forwards`;

        if (count % 5 === 0) {
            const text = document.createElement('span');
            text.className = 'petal-text';
            text.innerText = quotes[Math.floor(Math.random() * quotes.length)];
            petal.appendChild(text);
        }

        container.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
        count++;
    }, 500);
}

function showFinalBridge() {
    const container = document.getElementById('climax-message-container');

    const msg = document.createElement('div');
    msg.className = 'climax-msg';
    msg.innerHTML = `
        <div id="bridge-text-box">
            <h2 id="wait-text">Wait...</h2>
            <p id="bridge-text-1" style="opacity:0;">You've seen the roses, felt the hugs, and heard my heart.</p>
            <p id="bridge-text-2" style="opacity:0; margin-top:20px;">But the biggest surprise isn't on this screen...</p>
        </div>
    `;
    container.appendChild(msg);

    setTimeout(() => msg.style.opacity = '1', 100);

    setTimeout(() => {
        document.getElementById('bridge-text-1').style.opacity = '1';
        document.getElementById('bridge-text-1').style.transition = 'opacity 1s ease';
    }, 2000);

    setTimeout(() => {
        document.getElementById('bridge-text-2').style.opacity = '1';
        document.getElementById('bridge-text-1').style.opacity = '0';
        document.getElementById('bridge-text-2').style.transition = 'opacity 1s ease';
    }, 5000);

    setTimeout(() => {
        msg.innerHTML = `
            <h2 style="font-size: 5rem; animation: pulse 2s infinite;">Look at me. ❤️</h2>
            <p style="margin-top:20px; font-size: 2rem;">I have something to ask you.</p>
        `;
    }, 9000);
}

