import LatticeField from './LatticeField'

export default function Hero({ t, reducedMotion }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <LatticeField reducedMotion={reducedMotion} />
      <div className="hero__content">
        <p className="hero__brand" id="hero-brand">
          {t.hero.brand}
        </p>
        <h1 className="hero__headline">{t.hero.headline}</h1>
        <p className="hero__support">{t.hero.support}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#product">
            {t.hero.primary}
          </a>
          <a className="btn btn--ghost" href="#demo">
            {t.hero.secondary}
          </a>
        </div>
        <p className="hero__note">
          <span className="sim-badge" style={{ marginInlineEnd: '0.55rem' }}>
            SIM
          </span>
          {t.hero.simNote}
        </p>
      </div>
    </section>
  )
}
