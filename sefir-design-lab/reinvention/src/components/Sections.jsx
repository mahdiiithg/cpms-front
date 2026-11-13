import { locales } from '../i18n/translations'

export function Channels({ t }) {
  return (
    <section className="channels section" id="channels" aria-labelledby="channels-title">
      <div className="shell">
        <p className="eyebrow">{t.channels.eyebrow}</p>
        <h2 className="section__title" id="channels-title">
          {t.channels.title}
        </h2>
        <div className="channel-rail">
          {t.channels.items.map((item, index) => (
            <article key={item.id} className="channel-item reveal">
              <div className="channel-item__index">0{index + 1}</div>
              <div>
                <h3 className="channel-item__name">{item.name}</h3>
                <p className="channel-item__blurb">{item.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Desk({ t }) {
  return (
    <section className="desk section" id="product" aria-labelledby="desk-title">
      <div className="shell">
        <p className="eyebrow">{t.desk.eyebrow}</p>
        <h2 className="section__title" id="desk-title">
          {t.desk.title}
        </h2>
        <p className="section__lead">{t.desk.lead}</p>
        <div className="lane-grid">
          {t.desk.lanes.map((lane) => (
            <article key={lane.id} className="lane reveal" data-lane={lane.id}>
              <h3 className="lane__title">{lane.title}</h3>
              <p className="lane__body">{lane.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Outreach({ t }) {
  return (
    <section className="section" aria-labelledby="outreach-title">
      <div className="shell split">
        <div>
          <p className="eyebrow">{t.outreach.eyebrow}</p>
          <h2 className="section__title" id="outreach-title">
            {t.outreach.title}
          </h2>
        </div>
        <p className="section__lead">{t.outreach.body}</p>
      </div>
    </section>
  )
}

export function Languages({ t, locale, onLocaleChange }) {
  return (
    <section className="section" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }} aria-labelledby="lang-title">
      <div className="shell split">
        <div>
          <p className="eyebrow">{t.languages.eyebrow}</p>
          <h2 className="section__title" id="lang-title">
            {t.languages.title}
          </h2>
          <p className="section__lead">{t.languages.body}</p>
        </div>
        <div className="lang-panel" role="group" aria-label={t.languages.eyebrow}>
          {Object.entries(locales).map(([code, meta]) => (
            <button
              key={code}
              type="button"
              className="lang-chip"
              aria-pressed={locale === code}
              onClick={() => onLocaleChange(code)}
              style={
                locale === code
                  ? { borderColor: 'var(--ink)', background: 'var(--ink)', color: 'var(--paper)' }
                  : undefined
              }
            >
              {meta.name}
              <span style={locale === code ? { color: 'rgba(247,249,251,0.7)' } : undefined}>
                {meta.dir.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ t }) {
  return (
    <section className="cta-band" id="contact" aria-labelledby="cta-title">
      <div className="shell">
        <h2 className="section__title" id="cta-title">
          {t.cta.title}
        </h2>
        <p className="section__lead" style={{ marginBottom: '1.75rem' }}>
          {t.cta.body}
        </p>
        <a className="btn btn--primary" href="mailto:hello@sefir.example?subject=Sefir%20access%20request">
          {t.cta.button}
        </a>
      </div>
    </section>
  )
}

export function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="site-footer__brand">{t.footer.mark}</p>
        <p className="site-footer__tag">{t.footer.tag}</p>
        <div className="site-footer__meta">
          <span>{t.footer.note}</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}
