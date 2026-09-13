import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'

const slides = [
  'CRA Legal Center Live: August 24, 2026 at 11 AM, Educational Theater 1055.',
  'Legal Center Live: a discussion with CRA Legal Center Partners about legal challenges impacting the restaurant industry.',
  'Speakers from Fisher Phillips, Wilson Elser, Kronick, Berliner Cohen, and Zaller Law Group.',
  'Covering key issues: PAGA, tip pooling, and more.',
]

export default function PhoneSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.3 })
  const playing = !paused && !reducedMotion
  useEffect(() => {
    if (!playing || !visible) return
    const timer = window.setInterval(() => setIndex(i => (i + 1) % slides.length), 4500)
    return () => window.clearInterval(timer)
  }, [playing, visible])
  function goTo(next: number) {
    setPaused(true)
    setIndex((next + slides.length) % slides.length)
  }
  return (
    <div ref={ref} className="phone-stage" role="region" aria-roledescription="carousel" aria-label="Legal Center Live social media slides">
      <div className="phone-frame">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="phone-post-header"><span>Legal Center Live</span><span aria-hidden="true">•••</span></div>
        <div className="phone-screen" aria-live={playing ? 'off' : 'polite'}>
          <AnimatePresence initial={false} mode="wait">
            <motion.img key={index} src={`${import.meta.env.BASE_URL}images/legal-center/${index + 1}.png`}
              width="1080" height="1350" alt={`Slide ${index + 1} of 4. ${slides[index]}`}
              initial={reducedMotion ? false : { opacity: 0, rotateY: -12, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, rotateY: 12, x: -20 }}
              transition={{ duration: 0.3 }} />
          </AnimatePresence>
        </div>
        <div className="phone-slide-dots" aria-label="Choose a slide">
          {slides.map((_, i) => <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Show slide ${i + 1}`} aria-current={index === i ? 'true' : undefined}><span /></button>)}
        </div>
        <div className="phone-home-indicator" aria-hidden="true" />
      </div>
      <div className="slideshow-controls">
        <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous slide">←</button>
        <span>{index + 1} / {slides.length}</span>
        <button type="button" onClick={() => goTo(index + 1)} aria-label="Next slide">→</button>
        {!reducedMotion && <button type="button" className="play-control" onClick={() => setPaused(p => !p)}>{paused ? 'Play' : 'Pause'}</button>}
      </div>
      <a className="slide-original" href={`${import.meta.env.BASE_URL}images/legal-center/${index + 1}.png`} target="_blank" rel="noreferrer">View slide full size ↗</a>
    </div>
  )
}
