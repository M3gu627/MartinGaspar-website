// script.js
// Loading Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressFill = document.querySelector('.progress-fill');
  const percentText = document.querySelector('.meter-percent');
  const mainElements = document.querySelectorAll('.container, .controls, .bg-animation');

  mainElements.forEach(el => el.classList.remove('visible'));

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;

    progressFill.style.width = `${progress}%`;
    percentText.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        mainElements.forEach(el => el.classList.add('visible'));
        tryPlay();
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 1000);
      }, 500);
    }
  }, 500);
});

// Multi-language translations
const translations = {
    en: {
        menuTitle: "MY STUFF", Programs: "Programs", Experience: "Experience", Education: "Education", Resume: "Resume", Links: "Links", Mini_game: "Mini Game", Valorant: "Valorant", Websites: "Websites", Gallery: "Gallery",
        findMeOn: "FIND ME ON", clickToVisit: "Click to visit!", myResume: "MY RESUME", hiIm: "Hi!, I'm Martin Jorrell H. Gaspar", downloadCV: "DOWNLOAD FULL CV", programming: "PROGRAMMING LANGUAGES", education: "EDUCATION", experience: "EXPERIENCE", flappy: "FLAPPY BIRD", gallerySoon: "Gallery coming soon!", deployed: "MY DEPLOYED WEBSITES"
    },
    tl: {
        menuTitle: "AKING MGA BAGAY", Programs: "Mga Programa", Experience: "Karanasan", Education: "Edukasyon", Resume: "Resume", Links: "Mga Link", Mini_game: "Mini Laro", Valorant: "Valorant", Websites: "Mga Website", Gallery: "Gallery",
        findMeOn: "HANAPIN AKO SA", clickToVisit: "I-click para bumisita!", myResume: "AKING RESUME", hiIm: "Kamusta!, Ako si Martin Jorrell H. Gaspar", downloadCV: "I-DOWNLOAD ANG BUONG CV", programming: "MGA WIKA SA PROGRAMMING", education: "EDUKASYON", experience: "KARANASAN", flappy: "FLAPPY BIRD", gallerySoon: "Gallery darating na!", deployed: "AKING MGA WEBSITE"
    },
    ja: {
        menuTitle: "マイアイテム", Programs: "プログラム", Experience: "経験", Education: "学歴", Resume: "履歴書", Links: "リンク", Mini_game: "ミニゲーム", Valorant: "Valorant", Websites: "ウェブサイト", Gallery: "ギャラリー",
        findMeOn: "私を見つける", clickToVisit: "クリックして訪問！", myResume: "私の履歴書", hiIm: "こんにちは！マーティンです", downloadCV: "履歴書をダウンロード", programming: "プログラミング言語", education: "学歴", experience: "経験", flappy: "フラッピーバード", gallerySoon: "ギャラリー近日公開！", deployed: "公開中のウェブサイト"
    },
    es: {
        menuTitle: "MIS COSAS", Programs: "Programas", Experience: "Experiencia", Education: "Educación", Resume: "Currículum", Links: "Enlaces", Mini_game: "Mini Juego", Valorant: "Valorant", Websites: "Sitios Web", Gallery: "Galería",
        findMeOn: "ENCUÉNTRÁME EN", clickToVisit: "¡Haz clic para visitar!", myResume: "MI CURRÍCULUM", hiIm: "¡Hola! Soy Martin Jorrell H. Gaspar", downloadCV: "DESCARGAR CV COMPLETO", programming: "LENGUAJES DE PROGRAMACIÓN", education: "EDUCACIÓN", experience: "EXPERIENCIA", flappy: "FLAPPY BIRD", gallerySoon: "¡Galería próximamente!", deployed: "MIS SITIOS WEB PUBLICADOS"
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
    const selected = document.querySelector('.menu-item.selected');
    if (selected && document.getElementById('bubble').classList.contains('show')) {
        speak(messages[selected.dataset.item]);
    }
}
langSelect.addEventListener('change', e => updateLanguage(e.target.value));

// Sound Control
const bgm = document.getElementById('bgm');
const soundBtn = document.getElementById('soundBtn');
const soundIcon = soundBtn.querySelector('.sound-icon');
let muted = false;

const tryPlay = () => {
    bgm.muted = true;
    bgm.play().then(() => { bgm.muted = false; }).catch(() => {});
    document.body.removeEventListener('click', tryPlay);
    document.body.removeEventListener('keydown', tryPlay);
};

document.body.addEventListener('click', tryPlay, { once: true });
document.body.addEventListener('keydown', tryPlay, { once: true });

soundBtn.addEventListener('click', () => {
    muted = !muted;
    if (muted) { bgm.pause(); } else { bgm.play(); }
    soundIcon.classList.toggle('muted', muted);
});

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

// Item Coordinates for Room Arrow (unchanged)
const itemCoords = {
  Programs:   { x: 133, y: 277 },
  Valorant:   { x: 180, y: 184 },
  Mini_game:  { x: 230, y: 128 },
  Experience: { x: 180, y: 144 },
  Education:  { x: 428, y: 135 },
  Resume:     { x: 454, y: 151 },
  Websites:   { x: 301, y: 403 },
  Links:      { x: 301, y: 157 },
  Gallery:    { x: 490, y: 179 }
};

// Shared inline styles used inside bubble content
// (bubble has light bg so dark text works fine)
const S = {
  heading: 'font-size:30px;letter-spacing:2px;display:block;margin-bottom:24px;color:#1a3a1a;',
  subhead: 'font-size:21px;color:#1a3a1a;',
  muted:   'color:#3a5a3a;font-size:14px;',
};

// ── Bubble Content ──────────────────────────────────────────────────────────
const messages = {

    Links: `
      <div style="margin-top:8px;max-width:480px;margin-left:auto;margin-right:auto;">
        <strong style="${S.heading}">\${translations.en.findMeOn}</strong>
        <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:16px;margin-top:8px;">

          <a href="https://www.facebook.com/martin.gaspar.7127" target="_blank" class="retro-social-link">
            <span class="soc-icon">📘</span>
            <span>FACEBOOK</span>
          </a>

          <a href="https://www.instagram.com/m3guu81/" target="_blank" class="retro-social-link">
            <span class="soc-icon">📸</span>
            <span>INSTAGRAM</span>
          </a>

          <a href="https://www.linkedin.com/in/martin-gaspar-6aa47b369/" target="_blank" class="retro-social-link">
            <span class="soc-icon">💼</span>
            <span>LINKEDIN</span>
          </a>

        </div>
        <div style="margin-top:24px;${S.muted}">\${translations.en.clickToVisit}</div>
      </div>`,

    Resume: `
      <div style="margin-top:8px;">
        <strong style="${S.heading}">\${translations.en.myResume}</strong>
        <div style="font-size:16px;line-height:1.9;text-align:left;max-width:700px;margin:0 auto;color:#1a3a1a;">
          <strong>\${translations.en.hiIm}</strong><br>
          Click download to know more about me!<br>
          Contact: martinjorrellgaspar@gmail.com • 0929 342 4068<br><br>
        </div>
        <a href="Martin Gaspar CV.pdf" download class="download-btn" style="margin-top:16px;">\${translations.en.downloadCV}</a>
      </div>`,

    Programs: `
      <div style="margin-top:8px;text-align:center;">
        <strong style="${S.heading}">\${translations.en.programming}</strong>
        <div class="programs-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;max-width:680px;margin:0 auto;">
          <div style="text-align:center;"><img src="html.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">HTML</strong><br><span style="${S.muted}">Structure & markup</span></div>
          <div style="text-align:center;"><img src="css.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">CSS</strong><br><span style="${S.muted}">Styling & layouts</span></div>
          <div style="text-align:center;"><img src="js.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">JavaScript</strong><br><span style="${S.muted}">Interactivity & logic</span></div>
          <div style="text-align:center;"><img src="php.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">PHP</strong><br><span style="${S.muted}">Server-side scripting</span></div>
          <div style="text-align:center;"><img src="python.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">Python</strong><br><span style="${S.muted}">Scripting & automation</span></div>
          <div style="text-align:center;"><img src="java.png" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto;"><br><strong style="color:#1a3a1a;">Java</strong><br><span style="${S.muted}">OOP & applications</span></div>
        </div>
      </div>`,

    Education: `
      <div style="margin-top:8px;text-align:left;max-width:820px;margin:0 auto;">
        <strong style="${S.heading}text-align:center;">\${translations.en.education}</strong>
        <div style="display:flex;gap:18px;align-items:flex-start;margin-bottom:32px;">
          <img src="bsu.png" style="width:100px;height:100px;image-rendering:pixelated;border:3px solid #007a1f;background:#fff;flex-shrink:0;">
          <div style="color:#1a3a1a;">
            <strong style="${S.subhead}">Bulacan State University</strong><br>
            <span style="${S.muted}">Malolos City, Bulacan</span><br><br>
            Bachelor of Industrial Technology Major in Computer<br>
            <strong>Awards:</strong> Dean's Lister, Gold Gear Awardee<br>
            <strong>2021 – Present</strong><br><br>
            <span style="${S.muted}">Relevant Coursework: Industrial Designing, Python, Java, Graphic Designing, Arduino, Raspberry Pi, ESP32, Web Development, Database Management, PHP</span>
          </div>
        </div>
        <div style="display:flex;gap:18px;align-items:flex-start;">
          <img src="dyci.png" style="width:100px;height:100px;image-rendering:pixelated;border:3px solid #007a1f;background:#fff;flex-shrink:0;">
          <div style="color:#1a3a1a;">
            <strong style="${S.subhead}">Dr. Yanga's Colleges Inc.</strong><br>
            <span style="${S.muted}">Bocaue, Bulacan</span><br><br>
            Senior High School – Information and Communication Technology (ICT)<br>
            <strong>Awards:</strong> With Honors, Outstanding Scholastic Reader<br>
            <strong>2015 – 2021</strong><br><br>
            <span style="${S.muted}">Relevant Coursework: Web Development, Python, Java, Graphic Designing, LEGO Robotics (NXT), Game Development, Firebase, 2D Design</span>
          </div>
        </div>
      </div>`,

    Experience: `
      <div style="margin-top:8px;text-align:left;max-width:820px;margin:0 auto;color:#1a3a1a;">
        <strong style="${S.heading}text-align:center;">\${translations.en.experience}</strong>
        <div style="margin-bottom:32px;border-left:3px solid #007a1f;padding-left:16px;">
          <strong style="${S.subhead}">Panrama Technologies</strong><br>
          <span style="${S.muted}">Baliwag, Bulacan · Intern · June 2024 – Present</span>
          <ul style="margin:10px 0;padding-left:20px;color:#2a4a2a;line-height:1.7;">
            <li>Designed and developed Panramatechnologies.com using HTML, CSS, JavaScript, and responsive frameworks</li>
            <li>Improved scalable SQL database for employee attendance tracking with real-time monitoring</li>
            <li>Designed posters with Infinite Design to promote products and services</li>
          </ul>
        </div>
        <div style="border-left:3px solid #007a1f;padding-left:16px;">
          <strong style="${S.subhead}">Deviant Gallery</strong><br>
          <span style="${S.muted}">Balagtas, Bulacan · Part-Time · Dec 2020 – Aug 2022</span>
          <ul style="margin:10px 0;padding-left:20px;color:#2a4a2a;line-height:1.7;">
            <li>Designed print-ready T-shirts using Infinite Design and Kritika</li>
            <li>Created and iterated logos for clients</li>
          </ul>
        </div>
      </div>`,

    Valorant: `
      <div style="font-size:22px;padding:36px;line-height:2;color:#1a3a1a;">
        Rank: <strong>Immortal</strong> (in 2022)<br>
        Current rank: <strong>Iron</strong> (after 2-week break)
      </div>`,

    Gallery: `
      <div style="font-size:22px;padding:36px;color:#1a3a1a;">
        \${translations.en.gallerySoon}
      </div>`,

    Mini_game: `
      <div style="text-align:center;">
        <strong style="${S.heading}">\${translations.en.flappy}</strong>
        <div id="flappyContainer">
          <canvas id="flappyCanvas" width="360" height="460"></canvas>
          <div id="flappyScore">0</div>
          <button id="flappyStart">[ PLAY ]</button>
          <button id="flappyRestart">[ RESTART ]</button>
        </div>
        <div style="margin-top:12px;${S.muted}">Click or press Space to fly</div>
      </div>`,

    Websites: `
      <div style="margin-top:8px;max-width:480px;margin-left:auto;margin-right:auto;">
        <strong style="${S.heading}">\${translations.en.deployed}</strong>
        <div style="display:flex;flex-direction:column;gap:14px;align-items:center;">

          <a href="https://panramatechnologies.com/" target="_blank" class="project-btn">
            <img src="https://www.google.com/s2/favicons?domain=panramatechnologies.com&sz=64" alt="Panrama">
            <div><strong>Panrama Technologies</strong><br><small>Company website · Full-stack</small></div>
          </a>

          <a href="https://m3gu627.github.io/KoreanBlinds/" target="_blank" class="project-btn">
            <img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub">
            <div><strong>Korean Blinds</strong><br><small>E-commerce for window blinds</small></div>
          </a>

          <a href="https://m3gu627.github.io/Cafe/" target="_blank" class="project-btn">
            <img src="https://m3gu627.github.io/Motorcylceparts/favicon.ico" alt="Big Brew" onerror="this.src='https://www.google.com/s2/favicons?domain=m3gu627.github.io&sz=64'">
            <div><strong>Big Brew</strong><br><small>Multi-franchising cafe</small></div>
          </a>

          <a href="https://guanzonpool.com" target="_blank" class="project-btn">
            <img src="https://www.google.com/s2/favicons?domain=guanzonpool.com&sz=64" alt="Guanzon Pool">
            <div><strong>Guanzon Pool</strong><br><small>guanzonpool.com</small></div>
          </a>

          <a href="https://blueshirt.work" target="_blank" class="project-btn">
            <img src="https://www.google.com/s2/favicons?domain=blueshirt.work&sz=64" alt="Blueshirt">
            <div><strong>Blueshirt</strong><br><small>blueshirt.work</small></div>
          </a>

          <a href="https://momocartlogbook.com" target="_blank" class="project-btn">
            <img src="https://www.google.com/s2/favicons?domain=momocartlogbook.com&sz=64" alt="Momocart Logbook">
            <div><strong>Momocart Logbook</strong><br><small>momocartlogbook.com</small></div>
          </a>

        </div>
        <div style="margin-top:24px;${S.muted}">Click any project to visit!</div>
      </div>`
};

// ── speak() — renders bubble content with current language ──────────────────
function speak(html) {
    const t = translations[currentLang];
    let content = html;
    content = content.replace(/\${translations\.en\.([^}]+)}/g, (m, key) => t[key] || translations.en[key]);
    document.getElementById('bubbleText').innerHTML = content;
    const b = document.getElementById('bubble');
    b.classList.remove('show');
    setTimeout(() => b.classList.add('show'), 50);
}

// ── Flappy Bird ─────────────────────────────────────────────────────────────
let flappyActive = false, flappyInitialized = false;

function initFlappy() {
    if (flappyInitialized) return;
    flappyInitialized = true;
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    let birdY = 230, velocity = 0, pipes = [], score = 0, gameLoop = null;

    function reset() {
        birdY = 230; velocity = 0; pipes = []; score = 0;
        document.getElementById('flappyScore').textContent = '0';
        document.getElementById('flappyStart').style.display = 'none';
        document.getElementById('flappyRestart').style.display = 'none';
        pipes.push({ x: 360, gapY: 140 + Math.random() * 150 });
    }

    function draw() {
        // Dark terminal background
        ctx.fillStyle = '#001200';
        ctx.fillRect(0, 0, 360, 460);

        // Bird (green circle)
        ctx.fillStyle = '#00ff41';
        ctx.beginPath();
        ctx.arc(80, birdY + 16, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#007a1f';
        ctx.lineWidth = 2;
        ctx.stroke();

        pipes = pipes.filter(p => p.x > -60);
        pipes.forEach(p => {
            ctx.fillStyle = '#007a1f';
            ctx.fillRect(p.x, 0, 48, p.gapY - 75);
            ctx.fillRect(p.x, p.gapY + 75, 48, 460 - (p.gapY + 75));
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 2;
            ctx.strokeRect(p.x, 0, 48, p.gapY - 75);
            ctx.strokeRect(p.x, p.gapY + 75, 48, 460 - (p.gapY + 75));
            p.x -= 2;
            if (p.x === 60) { score++; document.getElementById('flappyScore').textContent = score; }
        });

        if (pipes.length === 0 || pipes[pipes.length - 1].x < 200) {
            pipes.push({ x: 360, gapY: 100 + Math.random() * 200 });
        }

        velocity += 0.6;
        birdY += velocity;

        const dead = birdY < 0 || birdY + 32 > 460 || pipes.some(p =>
            80 + 16 > p.x && 80 - 16 < p.x + 48 && (birdY < p.gapY - 75 || birdY + 32 > p.gapY + 75));

        if (dead) {
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
    document.addEventListener('keydown', e => {
        if (e.key === ' ' && flappyActive) { e.preventDefault(); velocity = -10; }
    });
}

// ── Menu navigation ──────────────────────────────────────────────────────────
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
    if (!pos || !img.naturalWidth) { arrow.classList.remove('show'); return; }
    const scaleX = img.clientWidth  / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;
    arrow.style.left = (pos.x * scaleX - 40) + 'px';
    arrow.style.top  = (pos.y * scaleY - 16) + 'px';
    arrow.classList.add('show');
}

function closeBubble() {
    document.getElementById('bubble').classList.remove('show');
    if (flappyActive) flappyActive = false;
    flappyInitialized = false;
}

// Click on area tags OR menu items
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
        if (e.key === 'ArrowUp')   { e.preventDefault(); selectIndex((currentIndex - 1 + items.length) % items.length); }
        if (e.key === 'ArrowDown') { e.preventDefault(); selectIndex((currentIndex + 1) % items.length); }
        if (e.key === 'Enter') {
            e.preventDefault();
            const key = items[currentIndex].dataset.item;
            if (messages[key]) { speak(messages[key]); if (key === 'Mini_game') setTimeout(initFlappy, 300); }
        }
    }
});

// Default selection on load
window.addEventListener('load', () => {
    const defaultItem = 'Programs';
    const defaultIndex = [...items].findIndex(item => item.dataset.item === defaultItem);
    if (defaultIndex !== -1) selectIndex(defaultIndex);
});
