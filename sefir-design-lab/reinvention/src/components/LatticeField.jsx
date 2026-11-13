import { useEffect, useId, useRef } from 'react'

/**
 * Signature motif: architectural decision lattice —
 * three converging signal lanes with drifting packets.
 * Full-bleed hero visual plane (not an inset card).
 */
export default function LatticeField({ reducedMotion = false }) {
  const canvasRef = useRef(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let frame = 0
    let raf = 0
    let running = true

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const lanes = [
      { y: 0.42, color: '#1fa6a0', phase: 0.1 },
      { y: 0.56, color: '#3d6ea8', phase: 0.45 },
      { y: 0.7, color: '#b85a4a', phase: 0.75 },
    ]

    const packets = Array.from({ length: 9 }, (_, i) => ({
      lane: i % 3,
      t: (i * 0.13) % 1,
      speed: 0.00035 + (i % 3) * 0.00008,
      w: 28 + (i % 4) * 10,
    }))

    const draw = (now) => {
      if (!running) return
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      // Soft architectural wash on the right (dominant plane)
      const wash = ctx.createLinearGradient(width * 0.2, 0, width, height)
      wash.addColorStop(0, 'rgba(10,22,40,0)')
      wash.addColorStop(0.4, 'rgba(10,22,40,0.05)')
      wash.addColorStop(1, 'rgba(10,22,40,0.22)')
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, width, height)

      // Vertical structural posts
      ctx.strokeStyle = 'rgba(10,22,40,0.1)'
      ctx.lineWidth = 1
      for (let x = width * 0.32; x < width; x += 48) {
        ctx.beginPath()
        ctx.moveTo(x, height * 0.1)
        ctx.lineTo(x, height * 0.94)
        ctx.stroke()
      }

      // Horizon beam
      ctx.strokeStyle = 'rgba(31,166,160,0.45)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.28, height * 0.26)
      ctx.lineTo(width * 0.98, height * 0.2)
      ctx.stroke()

      // Decision node
      const nx = width * 0.88
      const ny = height * 0.55
      ctx.fillStyle = 'rgba(232,184,74,0.15)'
      ctx.beginPath()
      ctx.arc(nx, ny, 34, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#0a1628'
      ctx.beginPath()
      ctx.arc(nx, ny, 11, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#e8b84a'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.arc(nx, ny, 20, 0, Math.PI * 2)
      ctx.stroke()

      lanes.forEach((lane, i) => {
        const y0 = height * lane.y
        const y1 = ny + (i - 1) * 12
        ctx.strokeStyle = lane.color
        ctx.globalAlpha = 0.72
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(width * 0.3, y0)
        ctx.bezierCurveTo(
          width * 0.52,
          y0,
          width * 0.7,
          y1,
          nx - 24,
          y1,
        )
        ctx.stroke()
        ctx.globalAlpha = 1

        // Lane tick marks
        ctx.strokeStyle = 'rgba(10,22,40,0.22)'
        ctx.lineWidth = 1
        for (let t = 0; t < 7; t += 1) {
          const x = width * (0.32 + t * 0.065)
          ctx.beginPath()
          ctx.moveTo(x, y0 - 7)
          ctx.lineTo(x, y0 + 7)
          ctx.stroke()
        }
      })

      if (!reducedMotion) {
        packets.forEach((p) => {
          p.t = (p.t + p.speed) % 1
          const lane = lanes[p.lane]
          const y0 = height * lane.y
          const y1 = ny + (p.lane - 1) * 10
          const t = p.t
          const x =
            width * 0.34 * (1 - t) +
            (nx - 28) * t +
            Math.sin(t * Math.PI) * (width * 0.04)
          const y =
            y0 * (1 - t) * (1 - t) +
            (y0 * 0.4 + y1 * 0.6) * 2 * t * (1 - t) +
            y1 * t * t

          ctx.fillStyle = lane.color
          ctx.globalAlpha = 0.2 + t * 0.65
          ctx.fillRect(x, y - 4, p.w, 8)
          ctx.globalAlpha = 1
        })
        frame = now
        raf = requestAnimationFrame(draw)
      } else {
        // Static packets settled near the node
        packets.slice(0, 3).forEach((p, i) => {
          const lane = lanes[p.lane]
          const y1 = ny + (i - 1) * 10
          ctx.fillStyle = lane.color
          ctx.fillRect(nx - 70 - i * 18, y1 - 4, 36, 8)
        })
      }
    }

    if (reducedMotion) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      void frame
      void uid
    }
  }, [reducedMotion, uid])

  return (
    <div className="hero__plane" aria-hidden="true">
      <div className="lattice__glow" />
      <canvas ref={canvasRef} className="lattice" />
    </div>
  )
}
