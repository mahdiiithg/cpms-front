import { useState } from 'react'
import { locales } from '../i18n/translations'

export default function Header({ t, locale, onLocaleChange }) {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#product', label: t.nav.product },
    { href: '#demo', label: t.nav.demo },
    { href: '#channels', label: t.nav.channels },
    { href: '#contact', label: t.nav.contact },
  ]

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="brand" href="#top" onClick={close}>
          <img className="brand__mark" src="/sefir-mark.svg" alt="" />
          <span>{t.hero.brand}</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            {Object.entries(locales).map(([code, meta]) => (
              <button
                key={code}
                type="button"
                aria-pressed={locale === code}
                onClick={() => onLocaleChange(code)}
              >
                {meta.label}
              </button>
            ))}
          </div>

          <a className="btn btn--primary header-cta" href="#contact">
            {t.nav.cta}
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? ' is-open' : ''}`}
        aria-label="Mobile"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className="btn btn--primary" href="#contact" onClick={close}>
          {t.nav.cta}
        </a>
      </nav>
    </header>
  )
}
