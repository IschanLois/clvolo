const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const numPoints = 200;
const mouse = { x: null, y: null };

function createPoints() {
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }
}

function drawPoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.forEach((point) => {
    const distance = Math.hypot(mouse.x - point.x, mouse.y - point.y);
    const glow = distance < 50 ? 0.9 : 0;

    ctx.beginPath();
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 0, ${0.1 + glow})`;
    ctx.shadowColor = `rgba(0, 255, 0, ${glow})`;
    ctx.shadowBlur = glow * 20;
    ctx.fill();
    ctx.closePath();
  });
}

function updatePoints() {
  points.forEach((point) => {
    point.x += point.dx;
    point.y += point.dy;

    if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.dy *= -1;
  });
}

function animate() {
  drawPoints();
  updatePoints();
  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  console.log(mouse.x, mouse.y)
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

createPoints();
animate();