const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const points = []
const numPoints = 200
const mouse = { x: null, y: null }

const createPoints = () => {
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    })
  }
}

const drawPoints = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  points.forEach((point) => {
    const distance = Math.hypot(mouse.x - point.x, mouse.y - point.y)
    const glow = distance < 50 ? 0.8 : 0

    ctx.beginPath()
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 255, 0, ${0.2 + glow})`
    ctx.shadowColor = `rgba(0, 255, 0, ${glow})`
    ctx.shadowBlur = glow * 20
    ctx.fill()
    ctx.closePath()
  })
}

const updatePoints = () => {
  points.forEach((point) => {
    point.x += point.dx
    point.y += point.dy

    if (point.x < 0 || point.x > canvas.width) point.dx *= -1
    if (point.y < 0 || point.y > canvas.height) point.dy *= -1
  })
}

const animate = () => {
  drawPoints()
  updatePoints()
  requestAnimationFrame(animate)
}

window.addEventListener('mousemove', (e) => {
  e.preventDefault()
  mouse.x = e.clientX
  mouse.y = e.clientY
})

createPoints()
animate()

const header = document.querySelector('header')

const addHeaderBackground = (e) => {
  e.preventDefault()

  if (document.documentElement.scrollTop !== 0) {
    header.classList.add('transparent')
  } else {
    header.classList.remove('transparent')
  }
}

window.addEventListener('scroll', addHeaderBackground)

const menuButton = document.querySelector('.menu')
const sideNav = document.querySelector('.side-nav')
const body = document.querySelector('body')
const overlay = document.getElementById('overlay')
const sideNavLinks = document.querySelector('.side-nav__links')

let isSideNavOpen = false

const openMenu = (e) => {
  isSideNavOpen = !isSideNavOpen
  sideNav.classList.add('active')
  body.classList.add('disabled')
  overlay.classList.add('active')
}

const closeMenu = () => {
  sideNav.classList.remove('active')
  body.classList.remove('disabled')
  overlay.classList.remove('active')

  sideNavLinks.removeEventListener('click', closeMenu)
  window.removeEventListener('click', closeMenu)
}

menuButton.addEventListener('click', (e) => {
  openMenu(e)

  e.stopImmediatePropagation()

  sideNavLinks.addEventListener('click', closeMenu)
  window.addEventListener('click', closeMenu)
})
