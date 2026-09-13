import PhoneSlideshow from './PhoneSlideshow'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, type ComponentProps } from 'react'

function ScrollSection({ children, ...props }: ComponentProps<'section'>) {
  const reducedMotion = useReducedMotion()
  return (
    <section {...props}>
      <motion.div className="section-reveal"
        initial={reducedMotion || props.id === 'work' ? false : { opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.01 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >{children}</motion.div>
    </section>
  )
}

const sections = [
  ['storytelling', 'Brand storytelling'],
  ['work', 'Featured work'],
  ['about', 'About me'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
]

function App() {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion) return
    const elements = document.querySelectorAll('main h1, main h2, main h3, main p, main .text-link, main figcaption, main .tags, main .experience-skills ul, main .contact-links, .discipline-strip span')
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
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </header>

      <main id="main">
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            
            <p className="eyebrow">MARKETING · COMMUNICATIONS · BRAND STRATEGY</p>
            <h1 id="hero-title">Morgan<br />Parker</h1>
            
            
            <div className="hero-intro">
              <div><p>Marketing major in the <strong>Neeley School of Business at<br className="intro-line-break" /> Texas Christian University</strong>, passionate about creating<br className="intro-line-break" /> meaningful brand experiences through storytelling, content,<br className="intro-line-break" /> and connection.</p>
                <a className="text-link" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </motion.div>
          <motion.figure className="portrait" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <img className="portrait-photo" src={`${import.meta.env.BASE_URL}images/morgan-parker-portrait.jpeg`} width="1913" height="3197" alt="Morgan Parker" fetchPriority="high" />
            <figcaption>MARKETING &amp; CREATIVE COMMUNICATIONS</figcaption>
          </motion.figure>
        </section>

        <div className="discipline-strip" aria-hidden="true"><span>Strategy with intention.</span><span>Words with purpose.</span><span>Stories that connect.</span></div>

        <ScrollSection className="story-section" id="storytelling" aria-labelledby="story-title"><div className="page-width story-inner"><div className="story-text"><p className="eyebrow">01 / BRAND STORYTELLING</p><h2 id="story-title">A sense of history.<br /><em>A story for today.</em></h2><div className="story-copy"><p>I had the pleasure of working at the California Restaurant Association in summer 2026. During my time there, I promoted the California Restaurant Show to encourage attendance among both association members and nonmembers in the industry. The California Restaurant Show, a premier West Coast event for restaurant and foodservice professionals, brings the industry together in Anaheim for product discovery, education, and live culinary demonstrations. The work below shows how I brought that invitation to life across social media, video, and email.</p><p>For the accompanying graphic, the brief was to connect the California Restaurant Association’s 120-year celebration to the California Restaurant Show. I paired the supplied campaign theme with archival imagery and a vintage feel, honoring the past while building excitement for the upcoming event.</p></div></div><figure className="story-graphic"><a href={`${import.meta.env.BASE_URL}images/crs-social-1.jpg`} target="_blank" rel="noreferrer" aria-label="View California Restaurant Show graphic at full size"><img src={`${import.meta.env.BASE_URL}images/crs-social-1.jpg`} width="1080" height="1350" loading="lazy" alt="California Restaurant Show social graphic celebrating 120 years, with historical restaurant photos and the message Celebrating the past. Serving the future. The show is August 23–25, 2026 at Anaheim Convention Center." /></a><figcaption><span>California Restaurant Show</span></figcaption></figure></div></ScrollSection>

        <ScrollSection className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">02 / FEATURED WORK</p><h2 id="work-title">Featured work<span className="red">.</span></h2></div><p>Social. Motion. Storytelling.</p></div>
          <div className="work-grid">
            <motion.article initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="project"><div className="featured-media video-media framed-video"><video className="portrait-video" controls playsInline preload="metadata" aria-label="General Advertising" poster={`${import.meta.env.BASE_URL}images/video-covers/general-advertising.jpg`} src={`${import.meta.env.BASE_URL}videos/general-advertising.mp4`}>Your browser does not support embedded video.</video></div><div className="project-details"><p className="eyebrow">01 /</p><h3>General Advertising</h3><p>Advertising video</p><p className="project-description">I turned a familiar phone home screen into an event reminder, using pop-up notifications to deliver key details in an everyday format.</p><a className="text-link" href={`${import.meta.env.BASE_URL}videos/general-advertising.mp4`} target="_blank" rel="noreferrer">Open video <span aria-hidden="true">↗</span></a></div></motion.article>
            <motion.article initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="project legal-project"><PhoneSlideshow /><div className="project-details"><p className="eyebrow">02 /</p><h3>Legal Center Live</h3><p>Social media carousel</p><p className="project-description">I designed a four-slide carousel that guides viewers from the event introduction to featured speakers, discussion topics, and the details needed to attend.</p></div></motion.article>
            <motion.article initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="project"><div className="featured-media video-media framed-video"><video className="portrait-video" controls playsInline preload="metadata" aria-label="Less Than Two Weeks" poster={`${import.meta.env.BASE_URL}images/video-covers/less-than-two-weeks.jpg`} src={`${import.meta.env.BASE_URL}videos/less-than-two-weeks.mp4`}>Your browser does not support embedded video.</video></div><div className="project-details"><p className="eyebrow">03 /</p><h3>Less Than Two Weeks</h3><p>Short-form video</p><p className="project-description">I used a restaurant receipt as the visual concept for a countdown video, turning a familiar industry detail into a timely reminder to attend.</p><a className="text-link" href={`${import.meta.env.BASE_URL}videos/less-than-two-weeks.mp4`} target="_blank" rel="noreferrer">Open video <span aria-hidden="true">↗</span></a></div></motion.article>
            <motion.article initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="project"><div className="featured-media video-media gallery-frame"><video controls playsInline preload="metadata" aria-label="Email Header" poster={`${import.meta.env.BASE_URL}images/video-covers/email-header.jpg`} src={`${import.meta.env.BASE_URL}videos/email-header.mp4`}>Your browser does not support embedded video.</video></div><div className="project-details"><p className="eyebrow">04 /</p><h3>Email Header</h3><p>Animated email creative</p><p className="project-description">I created this animated header alongside the email content, pairing motion and copy to give the message a cohesive look and feel.</p><a className="text-link" href={`${import.meta.env.BASE_URL}videos/email-header.mp4`} target="_blank" rel="noreferrer">Open video <span aria-hidden="true">↗</span></a></div></motion.article>
            <motion.article initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="project"><div className="featured-media gallery-frame tyler-frame"><a href={`${import.meta.env.BASE_URL}images/tyler-florence.png`} target="_blank" rel="noreferrer" aria-label="View Tyler Florence graphic at full size"><img src={`${import.meta.env.BASE_URL}images/tyler-florence.png`} width="1080" height="1350" loading="lazy" alt="California Restaurant Show graphic promoting Tyler Florence as Culinary Innovation Theater headliner, Monday August 24 at 1 PM." /></a></div><div className="project-details"><p className="eyebrow">05 /</p><h3>Tyler Florence</h3><p>Social media graphic</p><p className="project-description">I designed a headliner announcement that puts Tyler Florence front and center, pairing his portrait with key appearance details and a clear registration prompt.</p></div></motion.article>
          </div>
        </ScrollSection>

        <ScrollSection className="section about-section" id="about" aria-labelledby="about-title"><div><p className="eyebrow">03 / BEHIND THE WORK</p><h2 id="about-title">Behind<br /><em>the work.</em></h2></div><div className="about-copy"><p className="large-copy">An eye for detail.<br />An interest in connection.</p><p>I’m originally from Sacramento, California, and a third-year marketing major in the <strong>Neeley School of Business at Texas Christian University</strong>. I love getting to know people and hearing their stories, and I’ve always been interested in how brands build those same connections. Outside of school and work, I enjoy trying new restaurants, exploring new places, and seeking out new experiences. That curiosity shapes how I approach marketing—with an interest in people and the details that make an experience memorable.</p><div className="tags"><span>Marketing</span><span>Communications</span><span>Brand storytelling</span></div><a className="text-link" href="#contact">Let’s connect <span aria-hidden="true">↗</span></a></div></ScrollSection>

        <ScrollSection className="section page-width experience-section" id="experience" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">04 / THE JOURNEY</p><h2 id="experience-title">Experience<span className="red">.</span></h2></div><p>Marketing &amp; leadership</p></div><p className="experience-context">Recent Experience</p><div className="experience-list"><article className="experience-role"><p className="role-date">May – August 2026</p><div><h3>Marketing &amp; Communications Specialist</h3><p className="role-organization">California Restaurant Association</p><p className="role-summary">Supported statewide initiatives and events by creating social media content, short-form videos, email campaigns, marketing copy, and a press release, while reorganizing all company branding materials.</p></div></article><article className="experience-role"><p className="role-date">February 2026 – Present<span className="role-current">Current role</span></p><div><h3>VP Membership &amp; Finance</h3><p className="role-organization">American Marketing Association · Texas Christian University</p><p className="role-summary">Lead membership recruitment and outreach, track dues and engagement, and connect members with weekly internship opportunities.</p></div></article></div><div className="experience-skills" aria-labelledby="skills-title"><h3 id="skills-title">Skills &amp; tools</h3><ul><li>Excel</li><li>PowerPoint</li><li>Canva</li><li>Adobe Creative Suite</li><li>ChatGPT</li></ul></div><a className="text-link" href={`${import.meta.env.BASE_URL}documents/morgan-parker-resume.pdf`} download="Morgan-Parker-Resume.pdf">Learn more — Download résumé <span aria-hidden="true">↓</span></a></ScrollSection>

        <ScrollSection className="contact-section" id="contact" aria-labelledby="contact-title"><div className="page-width"><p className="eyebrow">05 / GET IN TOUCH</p><h2 id="contact-title">Let’s<br /><em>connect.</em><span aria-hidden="true" className="contact-arrow">↗</span></h2><div className="contact-bottom"><address className="contact-links"><a href="mailto:morganparker1401@gmail.com">morganparker1401@gmail.com</a><a href="tel:+19166343109">(916) 634-3109</a><a href="https://www.linkedin.com/in/morgan-parker-tcu2028" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></address><a className="text-link" href="#home">Back to top <span aria-hidden="true">↑</span></a></div></div></ScrollSection>
      </main>
      <footer className="page-width"><span>Morgan Parker / Portfolio</span><span>Marketing. Communications. Brand storytelling.</span></footer>
    </>
  )
}
export default App
