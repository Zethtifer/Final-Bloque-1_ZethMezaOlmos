/*const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 0. Planning of the interactive poster
// 0.1 Shapes to use: Ellipse (1), lines (at least 20 (they'll be the rain)), small triangles (at least 10), figure out how to make clouds with shapes (maybe with ellipses? (consider maybe not adding clouds))
// 0.2 first things first, the background 

// 1. Background, the sky
// 1.1 gotta get the document for the addEventListener
document .addEventListener("DOMContentLoaded", () => {
    const sky = document.getElementById("sky")
    const cloudNum = 0;

    // 1.1.1 Now we gotta call for the clouds, we already got the png in here, so we just 'oughta call for it with a function
    function createClouds(){
        const cloud = document.createElement("img");
        const randomSize = Math.random() * 550 + 900;
        cloud.style.width = randomSize + "px";
        cloud.src = "cloud1.png";
        sky.appendChild(cloud);
        cloud.classList.add("cloud");
    }
    for (let i = 0; i < cloudNum; i++) {
        createClouds();
    }
    createClouds();
})

// 2. Now to make THA MOOOOOON
// 2.1 Gotta make a big circle
// 2.2 Define the beginning of the outline
ctx.beginPath();

// 2.3 Define styles
ctx.strokeStyle = "#DAD8E7";
ctx.fillStyle = "#DAD8E7";

// 2.4 Specify the shape
// ctx.ellipse (x, y, radiusX, radiusY, rotation, startAngle, endAngle);
ctx.ellipse (745, 354, 200, 200, 0, 0, Math.PI*2);

// 2.5 Draw the filling or outline
ctx.stroke();
ctx.fill();

// 3. Now we'll start easy, the rain
// 3.1 Gotta make lines, let's start with one
// 3.2 Define the function for the drawing 
function drawRain (y) {
    // 3.2.1 Define the beginning of the outline
    ctx.beginPath();

    // 3.2.2 Styles
    ctx.strokeStyle = "#9E1A08";
    ctx.lineWidth = 2;

    // 3.2.3 Specify the shape
    ctx.moveTo (50, y);
    ctx.lineTo(10, y + 50);

    // 3.2.4 Draw the filling or outline
    ctx.stroke();
}
// 3.3 Draw 'em lines
drawRain(0);

// 4. Now that we got to try make the butterflies 
// 4.1 we gotta use triangles for this, but apparently imma need lines to make 'em, let's try
// 4.2 Define the function for the drawing
function drawButterflies (x,y) {
    // 4.2.1 Define the beginning of the outline
    ctx.beginPath();

    // 4.2.2 Styles
    ctx.fillStyle = "#B0AFB5";

    // 4.2.3 Specify the shape
    ctx.moveTo(x - 3, y - 5);
    ctx.lineTo(x - 12, y - 3);
    ctx.lineTo(x - 16, y - 10);
    ctx.lineTo(x - 10, y - 13);
    ctx.lineTo(x - 15, y - 17);
    ctx.lineTo(x - 1.5, y - 40);
    ctx.lineTo(x - 1, y - 25);
    ctx.lineTo(x + 10, y - 40);

    // 4.2.4 Draw the filling or the border
    ctx.fill();
}
// 4.3 Draw the lines- ejem, I mean, triangles
drawButterflies(80, 100);
drawButterflies(100, 400);
drawButterflies(200, 300);
drawButterflies(150, 200);
drawButterflies(280, 140);
drawButterflies(325, 250);
drawButterflies(250, 500);
drawButterflies(380, 410);
drawButterflies(480, 260);
drawButterflies(280, 370);*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1, // Tamaño de las estrellas entre 1 y 4 píxeles
    opacity: Math.random() * 0.5 + 0.5 // Opacidad de las estrellas (para no ser demasiado brillantes)
}));

document.addEventListener("DOMContentLoaded", () => {
    const sky = document.getElementById("sky");

    function createClouds(src, top, reverse = false, delay = 0) {
        const cloud = document.createElement("img");
        cloud.src = src;
        cloud.classList.add("cloud");
        cloud.style.width = Math.random() * 550 + 900 + "px";
        cloud.style.top = top + "px";
        cloud.style.animation = reverse ? 
            `moveSideReverse 20s linear infinite alternate` : 
            `moveSide 20s linear infinite alternate`;
        cloud.style.animationDelay = delay;
        sky.appendChild(cloud);
    }

    createClouds("cloud1.png", 300, false, "0s");
    createClouds("cloud1.png", 400, false, "1s");
    createClouds("cloud1.png", 200, true, "0s");
});

function drawMoon() {
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.5, canvas.height * 0.3, 200, 200, 0, 0, Math.PI * 2);

    // Brillo de la luna (usando sombra difusa)
    ctx.shadowColor = "#F0F0F0";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#DAD8E7";
    ctx.fill();

    // Luna sin borde adicional
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#DAD8E7";
    ctx.lineWidth = 5;
    ctx.stroke();
}

const drops = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 6 + 10,
    opacity: 1
}));

let stopRain = false; // Control para detener la lluvia
let fadeDuration = 8000; // Duración de desaparición de la lluvia
let fadeStartTime = null; // Marca el inicio del fade
let resumeRain = false; // Control para reanudar la lluvia

// Se detecta la tecla de espacio para detener o reanudar la lluvia
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (stopRain) {
            // Reanudar la lluvia
            resumeRain = true;
            fadeStartTime = Date.now(); // Marcar el inicio del fade para la reaparición
        } else {
            // Detener la lluvia
            stopRain = true;
            fadeStartTime = Date.now(); // Marcar el inicio del fade para la desaparición
        }
    }
});

function drawRain() {
    ctx.strokeStyle = "#9E1A08";
    ctx.lineWidth = 1;

    const now = Date.now();

    drops.forEach(drop => {
        if (stopRain && fadeStartTime) {
            const elapsedTime = now - fadeStartTime;
            const fadeFactor = Math.min(elapsedTime / fadeDuration, 1);
            drop.opacity = 1 - fadeFactor; // Disminuir la opacidad con el tiempo

            if (fadeFactor === 1) {
                stopRain = false;
                fadeStartTime = null;
            }
        } else if (resumeRain && fadeStartTime) {
            const elapsedTime = now - fadeStartTime;
            const fadeFactor = Math.min(elapsedTime / fadeDuration, 1);
            drop.opacity = fadeFactor; // Aumentar la opacidad con el tiempo

            if (fadeFactor === 1) {
                resumeRain = false;
                fadeStartTime = null;
            }
        }

        ctx.globalAlpha = drop.opacity; // Aplicar la opacidad
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 10, drop.y + 50);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) drop.y = 0; // Reiniciar la posición de la gota
    });

    ctx.globalAlpha = 1; // Restaurar opacidad a 1 después de dibujar
}

const butterflies = Array.from({ length: 8 }, () => ({ 
    x: Math.random() * canvas.width, 
    y: Math.random() * canvas.height, 
    vx: (Math.random() - 0.5) * 2, 
    vy: (Math.random() - 0.5) * 2 
}));

let followingMouse = false;

document.addEventListener("mousemove", (e) => {
    followingMouse = true;
    butterflies.forEach(butterfly => {
        const dx = e.clientX - butterfly.x;
        const dy = e.clientY - butterfly.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 200) {
            butterfly.vx = (dx / distance) * 2;
            butterfly.vy = (dy / distance) * 2;
        }
    });
    setTimeout(() => { followingMouse = false; }, 500);
});

function updateButterflies() {
    butterflies.forEach(butterfly => {
        if (!followingMouse) {
            butterfly.vx += (Math.random() - 0.5) * 0.2;
            butterfly.vy += (Math.random() - 0.5) * 0.2;
        }
        butterfly.x += butterfly.vx;
        butterfly.y += butterfly.vy;

        if (butterfly.x < 0 || butterfly.x > canvas.width) butterfly.vx *= -1;
        if (butterfly.y < 0 || butterfly.y > canvas.height) butterfly.vy *= -1;
    });
}

function drawButterflies() {
    ctx.fillStyle = "#B0AFB5";
    ctx.shadowColor = "#D0D0D0";
    ctx.shadowBlur = 20;

    butterflies.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.moveTo(x - 3, y - 5);
        ctx.lineTo(x - 12, y - 3);
        ctx.lineTo(x - 16, y - 10);
        ctx.lineTo(x - 10, y - 13);
        ctx.lineTo(x - 15, y - 17);
        ctx.lineTo(x - 1.5, y - 40);
        ctx.lineTo(x - 1, y - 25);
        ctx.lineTo(x + 10, y - 40);
        ctx.fill();
    });

    ctx.shadowBlur = 0;
}

function drawStars() {
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.size, star.size); // Dibuja el cuadrado de la estrella
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();  // Dibuja las estrellas primero (fondo)
    drawMoon();
    drawRain();
    updateButterflies();
    drawButterflies();
    requestAnimationFrame(animate);
}

animate();

