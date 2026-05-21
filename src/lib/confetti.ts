import confetti from 'canvas-confetti'

export function celebrateCompletion() {
  const duration = 2000
  const end = Date.now() + duration

  const colors = ['#fb6f92', '#ff8fab', '#ffd1dc', '#ffb3c6', '#f9f5f0']

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors,
  })

  frame()
}
