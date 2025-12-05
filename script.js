// Multi-language translations
const translations = {
    en: {
        menuTitle: "MY STUFF", Programs: "Programs", Experience: "Experience", Education: "Education", Resume: "Resume", Links: "Links", Mini_game: "Mini Game", Valorant: "Valorant", Websites: "Websites", Gallery: "Gallery",
        findMeOn: "FIND ME ON", clickToVisit: "Click a Pokémon to visit!", myResume: "MY RESUME", hiIm: "Hi!, I'm Martin Jorrell H. Gaspar", downloadCV: "DOWNLOAD FULL CV", programming: "PROGRAMMING LANGUAGES", education: "EDUCATION", experience: "EXPERIENCE", flappy: "FLAPPY BIRD", gallerySoon: "Gallery coming soon!", deployed: "MY DEPLOYED WEBSITES"
    },
    tl: {
        menuTitle: "AKING MGA BAGAY", Programs: "Mga Programa", Experience: "Karanasan", Education: "Edukasyon", Resume: "Resume", Links: "Mga Link", Mini_game: "Mini Laro", Valorant: "Valorant", Websites: "Mga Website", Gallery: "Gallery",
        findMeOn: "HANAPIN AKO SA", clickToVisit: "I-click ang Pokémon para bumisita!", myResume: "AKING RESUME", hiIm: "Kamusta!, Ako si Martin Jorrell H. Gaspar", downloadCV: "I-DOWNLOAD ANG BUONG CV", programming: "MGA WIKA SA PROGRAMMING", education: "EDUKASYON", experience: "KARANASAN", flappy: "FLAPPY BIRD", gallerySoon: "Gallery darating na!", deployed: "AKING MGA WEBSITE"
    },
    ja: {
        menuTitle: "マイアイテム", Programs: "プログラム", Experience: "経験", Education: "学歴", Resume: "履歴書", Links: "リンク", Mini_game: "ミニゲーム", Valorant: "Valorant", Websites: "ウェブサイト", Gallery: "ギャラリー",
        findMeOn: "私を見つける", clickToVisit: "ポケモンをクリックして訪問！", myResume: "私の履歴書", hiIm: "こんにちは！マーティンです", downloadCV: "履歴書をダウンロード", programming: "プログラミング言語", education: "学歴", experience: "経験", flappy: "フラッピーバード", gallerySoon: "ギャラリー近日公開！", deployed: "公開中のウェブサイト"
    },
    es: {
        menuTitle: "MIS COSAS", Programs: "Programas", Experience: "Experiencia", Education: "Educación", Resume: "Currículum", Links: "Enlaces", Mini_game: "Mini Juego", Valorant: "Valorant", Websites: "Sitios Web", Gallery: "Galería",
        findMeOn: "ENCUÉNTRÁME EN", clickToVisit: "¡Haz clic en un Pokémon para visitar!", myResume: "MI CURRÍCULUM", hiIm: "¡Hola! Soy Martin Jorrell H. Gaspar", downloadCV: "DESCARGAR CV COMPLETO", programming: "LENGUAJES DE PROGRAMACIÓN", education: "EDUCACIÓN", experience: "EXPERIENCIA", flappy: "FLAPPY BIRD", gallerySoon: "¡Galería próximamente!", deployed: "MIS SITIOS WEB PUBLICADOS"
    }
};

const langSelect = document.getElementById('langSelect');
let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    document.getElementById('menuTitle').textContent = translations[lang].menuTitle;
    document.querySelectorAll('.menu-item').forEach(item => {
        const key = item.dataset.item;
        item.lastChild.textContent = translations[lang][key] || key;
    });
    // Re-show current bubble in new language
    const selected = document.querySelector('.menu-item.selected');
    if (selected && document.getElementById('bubble').classList.contains('show')) {
        speak(messages[selected.dataset.item]);
    }
}
langSelect.addEventListener('change', e => updateLanguage(e.target.value));

// Sound Control
// Sound Control + Autoplay Fix
const bgm = document.getElementById('bgm');
const soundBtn = document.getElementById('soundBtn');
const soundIcon = soundBtn.querySelector('.sound-icon');
let muted = false;

// Force autoplay on first user interaction (fixes Chrome/Edge/Firefox policy)
const tryPlay = () => {
    bgm.muted = true;           // Start muted = allowed to autoplay
    bgm.play().then(() => {
        bgm.muted = false;      // Immediately unmute after it starts
    }).catch(() => {});
    document.body.removeEventListener('click', tryPlay);
    document.body.removeEventListener('keydown', tryPlay);
};

// Try to start on any first click or keypress
document.body.addEventListener('click', tryPlay, { once: true });
document.body.addEventListener('keydown', tryPlay, { once: true });

soundBtn.addEventListener('click', () => {
    muted = !muted;
    if (muted) {
        bgm.pause();
    } else {
        bgm.play();
    }
    soundIcon.classList.toggle('muted', muted);
});

// REMOVED: document.body.addEventListener('click', ...), allowing the 'autoplay' attribute in HTML to control music.

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.animationDelay = Math.random() * 20 + 's';
    particlesContainer.appendChild(p);
}

// Item Coordinates for the Room Pointer
const itemCoords = {
  Programs: { x: 133, y: 277 },
  Valorant: { x: 180, y: 184 },
  Mini_game: { x: 230, y: 128 },
  Experience: { x: 180, y: 144 },
  Education: { x: 428, y: 135 },
  Resume: { x: 454, y: 151 },
  Websites: { x: 301, y: 403 },
  Links: { x: 301, y: 157 },
  Gallery: { x: 490, y: 179 }
}

// Bubble Content Messages (FIX: Adjusted Links & Websites content to make bubbles smaller)
const messages = {
    Links: `<div style="margin-top:20px; max-width: 450px; margin-left: auto; margin-right: auto;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;">\${translations.en.findMeOn}</strong><br><br><br>
        <a href="https://www.facebook.com/martin.gaspar.7127" target="_blank" class="social-link"><img src="popplio.png"><br><span style="color:#1877f2;font-size:18px;"><strong>Facebook</strong></span></a>
        <a href="https://www.instagram.com/m3guu81/" target="_blank" class="social-link"><img src="fennekin.png"><br><span style="background:linear-gradient(45deg,#f09433,#e6683c,#bc1888,#833ab4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:18px;"><strong>Instagram</strong></span></a>
        <a href="#" class="social-link disabled" title="Coming soon"><img src="rowlet.png"><br><span style="color:#0a66c2;font-size:18px;"><strong>LinkedIn</strong></span></a>
        <div style="margin-top:30px;font-size:16px;color:#555;">\${translations.en.clickToVisit}</div></div>`,

    Resume: `<div style="margin-top:20px;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;">\${translations.en.myResume}</strong><br><br>
        <div style="font-size:18px;line-height:1.8;text-align:left;max-width:700px;margin:0 auto;">
          <strong>\${translations.en.hiIm}</strong><br>
          Click download to know more about me!<br>
          and if u want to contact me heres my email / number: martinjorrellgaspar@gmail.com • 0929 342 4068<br><br>
        </div>
        <a href="Martin Gaspar CV.pdf" download class="download-btn" style="margin-top:20px;">\${translations.en.downloadCV}</a></div>`,

    Programs: `<div style="margin-top:20px;text-align:center;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;display:block;margin-bottom:30px;">\${translations.en.programming}</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:40px;max-width:720px;margin:0 auto;">
          <div><img src="html.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>HTML</strong><br><span style="font-size:14px;color:#666;">Structure & markup</span></div>
          <div><img src="css.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>CSS</strong><br><span style="font-size:14px;color:#666;">Styling & layouts</span></div>
          <div><img src="js.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>JavaScript</strong><br><span style="font-size:14px;color:#666;">Interactivity & logic</span></div>
          <div><img src="php.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>PHP</strong><br><span style="font-size:14px;color:#666;">Server-side scripting</span></div>
          <div><img src="python.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>Python</strong><br><span style="font-size:14px;color:#666;">Scripting & automation</span></div>
          <div><img src="java.png" style="width:90px;height:90px;image-rendering:pixelated;"><br><strong>Java</strong><br><span style="font-size:14px;color:#666;">OOP & applications</span></div>
        </div></div>`,

    Education: `<div style="margin-top:20px;text-align:left;max-width:850px;margin:0 auto;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;display:block;text-align:center;">\${translations.en.education}</strong><br><br>
        <div style="display:flex;gap:20px;align-items:flex-start;margin-bottom:40px;">
          <img src="bsu.png" style="width:110px;height:110px;image-rendering:pixelated;border:4px solid #000;background:#fff;flex-shrink:0;">
          <div><strong style="font-size:23px;">Bulacan State University</strong><br><span style="color:#444;">Malolos City, Bulacan</span><br><br>
            Bachelor of Industrial Technology Major in Computer<br><strong>Awards:</strong> Dean's Lister, Gold Gear Awardee<br><strong>2021 – Present</strong><br><br>
            Relevant Coursework: Industrial Designing, Python, Java, Graphic Designing, Audrino, Raspberry Pi, ESP32, Web Development, Database Management, PHP
          </div>
        </div>
        <div style="display:flex;gap:20px;align-items:flex-start;">
          <img src="dyci.png" style="width:110px;height:110px;image-rendering:pixelated;border:4px solid #000;background:#fff;flex-shrink:0;">
          <div><strong style="font-size:23px;">Dr. Yanga's Colleges Inc.</strong><br><span style="color:#444;">Bocaue, Bulacan</span><br><br>
            Senior High School – Information and Communication Technology (ICT)<br><strong>Awards:</strong> With Honors, Outstanding Scholastic Reader<br><strong>2015 – 2021</strong><br><br>
            Relevant Coursework: Web Development, Python, Java, Graphic Designing, LEGO Robotics (NXT), Game Development, Firebase, 2D Design
          </div>
        </div></div>`,

    Experience: `<div style="margin-top:20px;text-align:left;max-width:850px;margin:0 auto;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;display:block;text-align:center;">\${translations.en.experience}</strong><br><br>
        <div style="margin-bottom:40px;"><strong style="font-size:24px;">Panrama Technologies</strong> · Baliwag, Bulacan · Intern · June 2024 – Present<br>
          <ul style="margin:10px 0;padding-left:20px;">
            <li>Designed and developed Panramatechnologies.com using HTML, CSS, JavaScript, and responsive frameworks</li>
            <li>Improved scalable SQL database for employee attendance tracking with real-time monitoring</li>
            <li>Designed posters with Infinite Design to promote products and services</li>
          </ul>
        </div>
        <div><strong style="font-size:24px;">Deviant Gallerry</strong> · Balagtas, Bulacan · Part-Time · Dec 2020 – Aug 2022<br>
          <ul style="margin:10px 0;padding-left:20px;">
            <li>Designed print-ready T-shirts using Infinite Design and Kritika</li>
            <li>Created and iterated logos for clients</li>
          </ul>
        </div></div>`,

    Valorant: `<div style="font-size:24px;padding:40px;line-height:1.8;">Rank: <strong>Immortal</strong> (in 2022)<br>Current rank: <strong>Iron</strong> (after 2-week break)</div>`,

    Gallery: `<div style="font-size:24px;padding:40px;">\${translations.en.gallerySoon}</div>`,

    Mini_game: `<div style="text-align:center;"><strong style="font-size:32px; text-shadow: 2px 2px 0 #000;">\${translations.en.flappy}</strong><br><br>
        <div id="flappyContainer"><canvas id="flappyCanvas" width="380" height="500"></canvas>
          <div id="flappyScore">0</div>
          <button id="flappyStart">PLAY</button>
          <button id="flappyRestart">RESTART</button>
        </div>
        <div style="margin-top:15px;font-size:16px;color:#666;">Click or press Space to fly</div></div>`,

    Websites: `<div style="margin-top:20px; max-width: 450px; margin-left: auto; margin-right: auto;">
        <strong style="font-size:32px; text-shadow: 2px 2px 0 #000; display:block; margin-bottom:30px; padding-top: 50px;">
          \${translations.en.deployed}
        </strong>
        <div style="display:flex; flex-direction:column; gap:22px; align-items:center;">
          <a href="https://panramatechnologies.com/" target="_blank" class="project-btn">
            <img src="https://www.google.com/s2/favicons?domain=panramatechnologies.com&sz=64" alt="Panrama">
            <div><strong>Panrama Technologies</strong><br><small>Company website • Full-stack</small></div>
          </a>
          <a href="https://m3gu627.github.io/KoreanBlinds/" target="_blank" class="project-btn">
            <img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub">
            <div><strong>Korean Blinds</strong><br><small>E-commerce for window blinds</small></div>
          </a>
          <a href="https://m3gu627.github.io/Motorcylceparts/index.html" target="_blank" class="project-btn">
            <img src="https://m3gu627.github.io/Motorcylceparts/favicon.ico" alt="Motorcycle Parts" onerror="this.src='https://www.google.com/s2/favicons?domain=m3gu627.github.io&sz=64'">
            <div><strong>Motorcycle Parts Catalog</strong><br><small>Spare parts showcase</small></div>
          </a>
        </div>
        <div style="margin-top:30px; font-size:16px; color:#555;">Click any project to visit!</div>
      </div>`
};

/**
 * Shows the bubble with content, replacing language placeholders.
 * @param {string} html - The HTML content for the bubble.
 */
function speak(html) {
    const t = translations[currentLang];
    let content = html;
    // Replace placeholders with current language
    content = content.replace(/\${translations\.en\.([^}]+)}/g, (m, key) => t[key] || translations.en[key]);
    document.getElementById('bubbleText').innerHTML = content;
    const b = document.getElementById('bubble');
    b.classList.remove('show');
    setTimeout(() => b.classList.add('show'), 50);
}

let flappyActive = false, flappyInitialized = false;
const items = document.querySelectorAll('.menu-item');
let currentIndex = 0;

function selectIndex(i) {
    items.forEach((el, idx) => el.classList.toggle('selected', idx === i));
    currentIndex = i;
    showArrow(items[i].dataset.item);
}

function showArrow(key) {
    const arrow = document.getElementById('roomArrow');
    const img = document.getElementById('roomImg');
    const pos = itemCoords[key];
    // Check if the image has loaded to get naturalWidth/Height
    if (!pos || !img.naturalWidth) { arrow.classList.remove('show'); return; }

    // Calculate scaling factor
    // The image file isometric.png is 600x525. The image element is set to 600x525.
    // If the window is resized, the image might scale, so we use the computed dimensions.
    const scaleX = img.clientWidth / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;

    // Apply scaling to the original coordinates from the map (600x525 basis)
    arrow.style.left = (pos.x * scaleX - 42) + 'px';
    arrow.style.top = (pos.y * scaleY - 18) + 'px';
    arrow.classList.add('show');
}

function closeBubble() {
    document.getElementById('bubble').classList.remove('show');
    if (flappyActive) flappyActive = false;
    flappyInitialized = false;
}

function initFlappy() {
    if (flappyInitialized) return;
    flappyInitialized = true;
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    let birdY = 250, velocity = 0, pipes = [], score = 0, gameLoop = null;

    function reset() {
        birdY = 250; velocity = 0; pipes = []; score = 0;
        document.getElementById('flappyScore').textContent = '0';
        document.getElementById('flappyStart').style.display = 'none';
        document.getElementById('flappyRestart').style.display = 'none';
        pipes.push({ x: 380, gapY: 150 + Math.random() * 150 });
    }

    function draw() {
        ctx.fillStyle = '#5C94FC'; ctx.fillRect(0, 0, 380, 500);
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(80, birdY + 18, 18, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.stroke();

        pipes = pipes.filter(p => p.x > -60);
        pipes.forEach(p => {
            ctx.fillStyle = '#2ECC40';
            ctx.fillRect(p.x, 0, 52, p.gapY - 80);
            ctx.fillRect(p.x, p.gapY + 80, 52, 500 - (p.gapY + 80));
            ctx.strokeStyle = '#1a7a26'; ctx.lineWidth = 3;
            ctx.strokeRect(p.x, 0, 52, p.gapY - 80);
            ctx.strokeRect(p.x, p.gapY + 80, 52, 500 - (p.gapY + 80));
            p.x -= 2;
            if (p.x === 60) { score++; document.getElementById('flappyScore').textContent = score; }
        });

        if (pipes.length === 0 || pipes[pipes.length - 1].x < 200) {
            pipes.push({ x: 380, gapY: 100 + Math.random() * 200 });
        }

        velocity += 0.6; birdY += velocity;

        if (birdY < 0 || birdY + 36 > 500 || pipes.some(p =>
            80 + 18 > p.x && 80 - 18 < p.x + 52 && (birdY < p.gapY - 80 || birdY + 36 > p.gapY + 80))) {
            flappyActive = false;
            if (gameLoop) cancelAnimationFrame(gameLoop);
            document.getElementById('flappyRestart').style.display = 'block';
            return;
        }
        if (flappyActive) gameLoop = requestAnimationFrame(draw);
    }

    document.getElementById('flappyStart').onclick = () => { reset(); flappyActive = true; draw(); };
    document.getElementById('flappyRestart').onclick = () => { reset(); flappyActive = true; draw(); };
    canvas.onclick = () => { if (flappyActive) velocity = -10; };
    document.addEventListener('keydown', e => { if (e.key === ' ' && flappyActive) { e.preventDefault(); velocity = -10; } });
}

// Attach event listeners to both area tags and menu items
document.querySelectorAll('area, .menu-item').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        const key = el.dataset.item;
        if (messages[key]) {
            speak(messages[key]);
            const idx = [...items].findIndex(i => i.dataset.item === key);
            if (idx !== -1) selectIndex(idx);
            if (key === 'Mini_game') setTimeout(initFlappy, 300);
        }
    });
});

document.getElementById('closeBtn').onclick = closeBubble;

// Keyboard navigation
document.addEventListener('keydown', e => {
    const b = document.getElementById('bubble');
    if (e.key === 'Escape' && b.classList.contains('show')) { closeBubble(); return; }
    if (!b.classList.contains('show')) {
        if (e.key === 'ArrowUp') { e.preventDefault(); selectIndex((currentIndex - 1 + items.length) % items.length); }
        if (e.key === 'ArrowDown') { e.preventDefault(); selectIndex((currentIndex + 1) % items.length); }
        if (e.key === 'Enter') {
            e.preventDefault();
            const key = items[currentIndex].dataset.item;
            if (messages[key]) { speak(messages[key]); if (key === 'Mini_game') setTimeout(initFlappy, 300); }
        }
    }
});

// Auto-select the first menu item (or any you want) when page loads
window.addEventListener('load', () => {
    const defaultItem = 'Programs'; // Change this to whatever you want default (e.g., 'Resume', 'Mini_game', etc.)
    const defaultIndex = [...items].findIndex(item => item.dataset.item === defaultItem);
    
    if (defaultIndex !== -1) {
        selectIndex(defaultIndex);
        // Optional: Also open the bubble automatically on load?
        // speak(messages[defaultItem]);   // Uncomment if you want bubble to open too
    }
});

