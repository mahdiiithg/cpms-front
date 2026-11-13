import { useEffect } from 'react'

export default function useReveal(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'))
      return undefined
    }

    const nodes = Array.from(document.querySelectorAll('.reveal'))
    if (!nodes.length) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [reducedMotion])
}
