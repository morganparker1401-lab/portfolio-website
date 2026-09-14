import { motion, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import PhoneSlideshow from './PhoneSlideshow'
import { LandscapeVideo, MediaPanel, Project, PortraitVideo } from './Project'
import SiteHeader from './SiteHeader'
import { asset } from './site'
import { Eyebrow, H2, Screen, ScrollSection, SectionHeading, TextLink } from './ui'

const CONTACT_LINK = 'max-w-full border-b border-transparent [overflow-wrap:anywhere] hover:border-current hover:text-red'

type ExperienceRoleProps = { date: string; current?: boolean; title: string; organization: string; summary: string }

function ExperienceRole({ date, current = false, title, organization, summary }: ExperienceRoleProps) {
  return (
    <article className="grid grid-cols-[1fr_2.2fr] gap-10 border-t border-line py-[34px] last:border-b max-sm:grid-cols-1 max-sm:gap-5">
      <p className="text-body leading-[1.8] text-muted">
        {date}
        {current && <span className="mt-2.5 block text-body tracking-[1px] text-red max-sm:mt-0 max-sm:ml-3.5 max-sm:inline-block">Current role</span>}
      </p>
      <div>
        <h3 className="font-serif text-[clamp(25px,2.8vw,38px)] leading-[1.2]">{title}</h3>
        <p className="mt-[13px] text-body text-red">{organization}</p>
        <p className="mt-5 max-w-[580px] text-body leading-[1.9] text-muted">{summary}</p>
      </div>
    </article>
  )
}

function App() {
  const reduceMotion = useReducedMotion()

  // Fade text in as it scrolls into view. Headings and paragraphs are picked up
  // automatically; other elements opt in with data-fade.
  useEffect(() => {
    if (reduceMotion) return
    const elements = document.querySelectorAll('main h1, main h2, main h3, main p, main [data-fade]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('text-in-view', entry.isIntersecting))
    }, { threshold: 0.08 })
    elements.forEach(element => {
      element.classList.add('scroll-fade-text')
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
      elements.forEach(element => element.classList.remove('scroll-fade-text', 'text-in-view'))
    }
  }, [reduceMotion])

  return (
    <>
      <a className="absolute -top-[100px] left-5 z-30 bg-white p-[15px] focus:top-2.5" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <Screen>
          <section className="mx-auto grid w-[min(1280px,88%)] max-w-[1100px] flex-1 grid-cols-1 items-center gap-10 py-[42px] sm:grid-cols-2 sm:gap-[3%] sm:py-14" id="home" aria-labelledby="hero-title">
            <motion.div className="relative sm:col-start-2 sm:row-start-1 sm:-top-7" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-7 font-sans text-body font-bold leading-[1.8] tracking-[1.5px] max-lg:tracking-[.6px]">MARKETING · COMMUNICATIONS · BRAND STRATEGY</p>
              <h1 id="hero-title" className="font-serif text-[clamp(74px,8.7vw,132px)] font-bold leading-[1.02] tracking-[-.035em] text-red max-lg:text-[clamp(63px,9vw,90px)] max-sm:text-[clamp(78px,18.5vw,113px)]">Morgan<br />Parker</h1>
              <div className="mt-11 max-sm:mt-[30px]">
                <p className="max-w-[31em] text-[16px] leading-[1.9] text-pretty text-muted">Marketing major in the <strong>Neeley School of Business at Texas Christian University</strong>, passionate about creating meaningful brand experiences through storytelling, content, and connection.</p>
                <TextLink href="#work" icon="↗">Explore my work</TextLink>
              </div>
            </motion.div>
            <motion.figure className="w-full max-w-[420px] justify-self-center max-sm:max-w-[340px] sm:col-start-1 sm:row-start-1 sm:justify-self-start xl:max-w-[460px]" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <img className="block aspect-[1913/2750] h-auto w-full rounded-xl object-cover object-top" src={asset('images/morgan-parker-portrait.webp')} width="920" height="1538" alt="Morgan Parker" fetchPriority="high" />
              <figcaption data-fade className="mt-3.5 text-body font-bold tracking-[1.6px] text-muted">MARKETING &amp; CREATIVE COMMUNICATIONS</figcaption>
            </motion.figure>
          </section>

          <div className="flex justify-around gap-5 bg-red px-[6%] py-[22px] text-body tracking-[1px] text-cream max-sm:py-5 max-sm:leading-[1.7] max-sm:tracking-normal" aria-hidden="true">
            <span data-fade>Strategy with intention.</span><span data-fade>Words with purpose.</span><span data-fade>Stories that connect.</span>
          </div>
        </Screen>

        <ScrollSection className="bg-story" id="storytelling" aria-labelledby="story-title">
          <div className="mx-auto grid w-[min(1280px,88%)] grid-cols-[1.2fr_1fr] items-center gap-[12%] max-lg:gap-[7%] max-sm:grid-cols-1 max-sm:gap-10">
            <div>
              <Eyebrow className="mb-[25px] text-muted">01 / BRAND STORYTELLING</Eyebrow>
              <h2 id="story-title" className="font-serif text-[clamp(44px,4.8vw,70px)] leading-[1.02] tracking-[-.045em] max-sm:text-[48px]">A sense of history.<br /><em className="text-red">A story for today.</em></h2>
              <div className="max-w-[470px] space-y-6 pt-[35px] text-body leading-[1.9] text-muted">
                <p>I had the pleasure of working at the California Restaurant Association in summer 2026. During my time there, I promoted the California Restaurant Show to encourage attendance among both association members and nonmembers in the industry. The California Restaurant Show, a premier West Coast event for restaurant and foodservice professionals, brings the industry together in Anaheim for product discovery, education, and live culinary demonstrations. The work below shows how I brought that invitation to life across social media, video, and email.</p>
                <p>For the accompanying graphic, the brief was to connect the California Restaurant Association’s 120-year celebration to the California Restaurant Show. I paired the supplied campaign theme with archival imagery and a vintage feel, honoring the past while building excitement for the upcoming event.</p>
              </div>
            </div>
            <figure className="max-w-[450px] justify-self-end max-sm:justify-self-center">
              <a className="block" href={asset('images/crs-social-1.webp')} target="_blank" rel="noreferrer" aria-label="View California Restaurant Show graphic at full size">
                <img className="block h-auto w-full" src={asset('images/crs-social-1.webp')} width="1080" height="1350" loading="lazy" alt="California Restaurant Show social graphic celebrating 120 years, with historical restaurant photos and the message Celebrating the past. Serving the future. The show is August 23–25, 2026 at Anaheim Convention Center." />
              </a>
              <figcaption data-fade className="mt-[18px] flex justify-between gap-[15px] text-body leading-[1.8] text-muted"><span>California Restaurant Show</span></figcaption>
            </figure>
          </div>
        </ScrollSection>

        <ScrollSection className="bg-work px-[6%]" id="work" aria-labelledby="work-title">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading id="work-title" eyebrow="02 / FEATURED WORK" title={<>Featured work<span className="text-red">.</span></>} aside="Social. Motion. Storytelling." />
            <div className="flex flex-col">
              <Project number="01" title="General Advertising" kind="Advertising video"
                description="I turned a familiar phone home screen into an event reminder, using pop-up notifications to deliver key details in an everyday format."
                media={<PortraitVideo title="General Advertising" file="general-advertising" />} videoHref={asset('videos/general-advertising.mp4')} />
              <Project number="02" title="Legal Center Live" kind="Social media carousel" flip detailsClassName="sm:pl-32"
                description="I designed a four-slide carousel that guides viewers from the event introduction to featured speakers, discussion topics, and the details needed to attend."
                media={<PhoneSlideshow />} />
              <Project number="03" title="Less Than Two Weeks" kind="Short-form video"
                description="I used a restaurant receipt as the visual concept for a countdown video, turning a familiar industry detail into a timely reminder to attend."
                media={<PortraitVideo title="Less Than Two Weeks" file="less-than-two-weeks" />} videoHref={asset('videos/less-than-two-weeks.mp4')} />
              <Project number="04" title="Email Header" kind="Animated email creative" flip
                description="I created this animated header alongside the email content, pairing motion and copy to give the message a cohesive look and feel."
                media={<LandscapeVideo title="Email Header" file="email-header" />} videoHref={asset('videos/email-header.mp4')} />
              <Project number="05" title="Tyler Florence" kind="Social media graphic"
                description="I designed a headliner announcement that puts Tyler Florence front and center, pairing his portrait with key appearance details and a clear registration prompt."
                media={
                  <MediaPanel width="w-[420px]">
                    <a className="block w-full max-w-[380px]" href={asset('images/tyler-florence.webp')} target="_blank" rel="noreferrer" aria-label="View Tyler Florence graphic at full size">
                      <img className="block h-auto w-full" src={asset('images/tyler-florence.webp')} width="1080" height="1350" loading="lazy" alt="California Restaurant Show graphic promoting Tyler Florence as Culinary Innovation Theater headliner, Monday August 24 at 1 PM." />
                    </a>
                  </MediaPanel>
                } />
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="bg-about px-[6%] text-about-text" id="about" aria-labelledby="about-title">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center gap-[12%] max-sm:grid-cols-1 max-sm:gap-10">
            <div>
              <Eyebrow className="mb-[25px] text-about-muted">03 / BEHIND THE WORK</Eyebrow>
              <h2 id="about-title" className={`${H2} text-about-accent`}>Behind<br /><em>the work.</em></h2>
            </div>
            <div>
              <p className="mb-[30px] font-serif text-[clamp(30px,3.2vw,46px)] leading-[1.15] tracking-[-.025em]">An eye for detail.<br />An interest in connection.</p>
              <p className="max-w-[425px] text-body leading-[1.95] text-about-muted">I’m originally from Sacramento, California, and a third-year marketing major in the <strong>Neeley School of Business at Texas Christian University</strong>. I love getting to know people and hearing their stories, and I’ve always been interested in how brands build those same connections. Outside of school and work, I enjoy trying new restaurants, exploring new places, and seeking out new experiences. That curiosity shapes how I approach marketing—with an interest in people and the details that make an experience memorable.</p>
              <div data-fade className="mt-[35px] flex flex-wrap gap-5">
                {['Marketing', 'Communications', 'Brand storytelling'].map(tag => <span key={tag} className="border-t border-[#c5c0b650] pt-2.5 text-body text-about-muted">{tag}</span>)}
              </div>
              <TextLink href="#contact" icon="↗" dark>Let’s connect</TextLink>
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="mx-auto w-[min(1280px,88%)]" id="experience" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" eyebrow="04 / THE JOURNEY" title={<>Experience<span className="text-red">.</span></>} aside="Marketing & leadership" />
          <p className="mb-[23px] text-body tracking-[1px] text-muted">Recent Experience</p>
          <div>
            <ExperienceRole date="May – August 2026" title="Marketing & Communications Specialist" organization="California Restaurant Association"
              summary="Supported statewide initiatives and events by creating social media content, short-form videos, email campaigns, marketing copy, and a press release, while reorganizing all company branding materials." />
            <ExperienceRole date="February 2026 – Present" current title="VP Membership & Finance" organization="American Marketing Association · Texas Christian University"
              summary="Lead membership recruitment and outreach, track dues and engagement, and connect members with weekly internship opportunities." />
          </div>
          <section className="mt-[52px] grid grid-cols-[1fr_2.2fr] items-baseline gap-10 pt-7 max-sm:mt-10 max-sm:grid-cols-1 max-sm:gap-5" aria-labelledby="skills-title">
            <h3 id="skills-title" className="font-serif text-[26px] leading-[1.2] text-red">Skills &amp; tools</h3>
            <ul data-fade className="flex flex-wrap gap-x-7 gap-y-4 text-body leading-[1.7] text-red">
              {['Excel', 'PowerPoint', 'Canva', 'Adobe Creative Suite', 'ChatGPT'].map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </section>
          <TextLink href={asset('documents/morgan-parker-resume.pdf')} download="Morgan-Parker-Resume.pdf" icon="↓">Learn more — Download résumé</TextLink>
        </ScrollSection>

        <Screen>
          <ScrollSection fill className="bg-contact" id="contact" aria-labelledby="contact-title">
            <div className="mx-auto w-[min(1280px,88%)]">
              <Eyebrow className="mb-[25px]">05 / GET IN TOUCH</Eyebrow>
              <h2 id="contact-title" className="relative font-serif text-[clamp(85px,12vw,180px)] leading-[1.02] tracking-[-.045em]">
                Let’s<br /><em className="text-red">connect.</em>
                <span aria-hidden="true" className="absolute top-[20%] right-[4%] font-sans text-[80px] text-red max-sm:right-0 max-sm:text-[45px]">↗</span>
              </h2>
              <div className="mt-[35px] flex items-end justify-between gap-[25px] max-sm:flex-col max-sm:items-start">
                <address data-fade className="flex flex-col items-start gap-4 text-body leading-[1.6] not-italic">
                  <a className={CONTACT_LINK} href="mailto:morganparker1401@gmail.com">morganparker1401@gmail.com</a>
                  <a className={CONTACT_LINK} href="tel:+19166343109">(916) 634-3109</a>
                  <a className={CONTACT_LINK} href="https://www.linkedin.com/in/morgan-parker-tcu2028" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                </address>
                <TextLink href="#home" icon="↑">Back to top</TextLink>
              </div>
            </div>
          </ScrollSection>
          <footer className="mx-auto flex w-[min(1280px,88%)] justify-between gap-5 py-[25px] text-body text-muted max-sm:flex-col max-sm:gap-2.5">
            <span>Morgan Parker / Portfolio</span><span>Marketing. Communications. Brand storytelling.</span>
          </footer>
        </Screen>
      </main>
    </>
  )
}

export default App
