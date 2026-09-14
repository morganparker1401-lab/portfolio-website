import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { asset } from './site'
import { Eyebrow, TextLink } from './ui'

const DETAIL = 'max-w-[350px] text-body leading-[1.85] text-muted-soft max-sm:max-w-full'

type ProjectProps = {
  number: string
  title: string
  kind: string
  description: string
  media: ReactNode
  /** Link to the full video file, shown as "Open video". */
  videoHref?: string
  /** Put the media on the right and the text on the left (tablet and up). */
  flip?: boolean
  detailsClassName?: string
}

/** One featured-work entry: media on one side, numbered description on the other. */
export function Project({ number, title, kind, description, media, videoHref, flip = false, detailsClassName = '' }: ProjectProps) {
  const reducedMotion = useReducedMotion()
  const columns = flip ? 'lg:grid-cols-[1fr_1.7fr]' : 'lg:grid-cols-[1.7fr_1fr]'
  return (
    <motion.article
      className={`grid grid-cols-1 items-center gap-8 border-t border-line py-[45px] sm:min-h-[80svh] sm:gap-[6%] sm:py-[70px] sm:max-lg:grid-cols-[1.2fr_1fr] lg:gap-[9%] ${columns}`}
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className={`flex min-w-0 items-center justify-center ${flip ? 'sm:col-start-2 sm:row-start-1' : ''}`}>{media}</div>
      <div className={`${flip ? 'sm:col-start-1 sm:row-start-1' : ''} ${detailsClassName}`}>
        <Eyebrow className="mb-[26px] text-red max-sm:mb-4">{number} /</Eyebrow>
        <h3 className="mb-5 font-serif text-[clamp(32px,3.5vw,52px)] leading-[1.07] tracking-[-.03em] max-sm:text-[38px]">{title}</h3>
        <p className={DETAIL}>{kind}</p>
        <p className={`${DETAIL} mt-[22px]`}>{description}</p>
        {videoHref && <TextLink href={videoHref} target="_blank" rel="noreferrer" icon="↗">Open video</TextLink>}
      </div>
    </motion.article>
  )
}

/** Quiet gallery panel with equal 20px framing around a piece of media. */
export function MediaPanel({ width, children }: { width: string; children: ReactNode }) {
  return <div className={`flex max-w-full justify-center bg-panel p-5 ${width}`}>{children}</div>
}

type VideoProps = { title: string; file: string }

/** A 9:16 video in a gallery panel. `file` is the shared basename in public/videos and public/images/video-covers. */
export function PortraitVideo({ title, file }: VideoProps) {
  return (
    <MediaPanel width="w-[388.75px] max-sm:w-[366.25px]">
      <video
        className="block aspect-[9/16] h-auto w-[348.75px] max-w-full object-contain shadow-[0_8px_24px_#2423210d] max-sm:w-[326.25px]"
        controls playsInline preload="metadata" aria-label={title}
        poster={asset(`images/video-covers/${file}.webp`)} src={asset(`videos/${file}.mp4`)}
      >
        Your browser does not support embedded video.
      </video>
    </MediaPanel>
  )
}

/** A landscape video in a gallery panel. */
export function LandscapeVideo({ title, file }: VideoProps) {
  return (
    <MediaPanel width="w-[640px]">
      <video
        className="block h-auto w-full bg-ink object-contain"
        controls playsInline preload="metadata" aria-label={title}
        poster={asset(`images/video-covers/${file}.webp`)} src={asset(`videos/${file}.mp4`)}
      >
        Your browser does not support embedded video.
      </video>
    </MediaPanel>
  )
}
