import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import MembershipFlow from "@/components/MembershipFlow";
import { Rath, Skyline, Toran, Divider, Diya, Emblem } from "@/components/Art";
import { SITE, PLANS, formatINR } from "@/lib/site";

const KANDS = ["Bal Kand", "Ayodhya Kand", "Aranya Kand", "Kishkindha Kand", "Sundar Kand", "Lanka Kand", "Uttar Kand"];

const PILLARS = [
  {
    hi: "मंचन",
    title: "Ramleela on stage",
    text: "Every year the committee stages the story of Shri Ram, from Bal Kand to the Rajtilak, for families across the city.",
  },
  {
    hi: "सेवा",
    title: "Seva & community",
    text: "Members give their time and support to bring the festival together: costumes, stage, prasad and hospitality.",
  },
  {
    hi: "परंपरा",
    title: "Living tradition",
    text: "We keep the dialogues, music and customs of the Leela alive and pass them on to the next generation.",
  },
];

export default function Home() {
  const minPrice = Math.min(...PLANS.map((p) => p.price));
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="sun" aria-hidden>
            <div className="sun-rays" />
            <div className="sun-disc" />
          </div>
          <Toran />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">जय श्री राम · Membership {new Date().getFullYear()}</p>
              <h1>
                Become a part of the <span>Leela</span>
              </h1>
              <p className="lead">
                Join the {SITE.name} and help bring the sacred Ramleela to life, season after season.
                Register in two minutes and receive your membership letter instantly.
              </p>
              <div className="hero-cta">
                <a href="#membership" className="btn btn-primary btn-lg">Apply for Membership</a>
                <a href="#about" className="btn btn-light btn-lg">About the committee</a>
              </div>
              <p className="hero-note">Plans from <b>{formatINR(minPrice)}</b> · Secure UPI & card payments</p>
            </div>
            <div className="hero-art">
              <Rath className="rath" />
            </div>
          </div>
          <Skyline className="skyline" />
        </section>

        {/* KAND MARQUEE */}
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {[...KANDS, ...KANDS].map((k, i) => (
              <span key={i}>{k} <i>✦</i></span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="section about">
          <div className="container">
            <Reveal>
              <p className="eyebrow center">Our Leela</p>
              <h2 className="section-title">A tradition carried by its members</h2>
              <Divider />
              <p className="section-lead">
                The {SITE.name} is a community of devotees and volunteers who stage the Ramleela each year.
                Your membership keeps the lamps lit and the stage alive.
              </p>
            </Reveal>
            <div className="pillars">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 120}>
                  <article className="pillar">
                    <Diya className="pillar-diya" />
                    <span className="pillar-hi">{p.hi}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP */}
        <section id="membership" className="section membership">
          <div className="arch-frame" aria-hidden />
          <div className="container narrow">
            <Reveal>
              <p className="eyebrow center">सदस्यता</p>
              <h2 className="section-title">Apply for Membership</h2>
              <Divider />
              <p className="section-lead">
                Fill in your details, verify your mobile with an OTP, pick a plan and pay securely.
                Your receipt and membership letter arrive on email and WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <MembershipFlow />
            </Reveal>
            <ul className="trust">
              <li>Secure payment gateway</li>
              <li>Instant receipt on email & WhatsApp</li>
              <li>Unique membership ID</li>
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <Skyline className="footer-skyline" />
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <Emblem size={52} />
              <div>
                <strong>{SITE.name}</strong>
                <small>{SITE.nameHi}</small>
              </div>
            </div>
            <p>{SITE.tagline}</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p><a href={`tel:${SITE.phone}`}>{SITE.phone}</a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />{SITE.address}</p>
          </div>
          <div>
            <h4>Quick links</h4>
            <p><a href="#about">About</a><br /><a href="#membership">Membership</a><br /><a href="#home">Back to top</a></p>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
