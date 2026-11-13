import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RoutingDemo from './components/RoutingDemo'
import {
  Channels,
  CtaBand,
  Desk,
  Footer,
  Languages,
  Outreach,
} from './components/Sections'
import { copy, locales } from './i18n/translations'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion'
import useReveal from './hooks/useReveal'
import './styles/global.scss'

export default function App() {
  const [locale, setLocale] = useState('en')
  const reducedMotion = usePrefersReducedMotion()
  const t = copy[locale]
  const meta = locales[locale]

  useReveal(reducedMotion)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = meta.dir
    document.documentElement.dataset.locale = locale
    document.title =
      locale === 'en'
        ? 'Sefir — Customer communication, orchestrated'
        : `${t.hero.brand} — ${t.footer.tag}`
  }, [locale, meta.dir, t])

  return (
    <>
      <Header t={t} locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero t={t} reducedMotion={reducedMotion} />
        <Channels t={t} />
        <Desk t={t} />
        <RoutingDemo t={t} />
        <Outreach t={t} />
        <Languages t={t} locale={locale} onLocaleChange={setLocale} />
        <CtaBand t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
