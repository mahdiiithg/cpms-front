import { useEffect, useState } from 'react'

const LANES = ['answer', 'handoff', 'stop']

export default function RoutingDemo({ t }) {
  const [selectedId, setSelectedId] = useState(t.demo.scenarios[0]?.id ?? null)
  const [phase, setPhase] = useState('idle') // idle | running | done
  const [activeLane, setActiveLane] = useState(null)

  const scenarios = t.demo.scenarios
  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0]

  useEffect(() => {
    // Reset when language or scenario list changes
    setSelectedId(t.demo.scenarios[0]?.id ?? null)
    setPhase('idle')
    setActiveLane(null)
  }, [t])

  useEffect(() => {
    if (phase !== 'running' || !selected) return undefined

    const settle = window.setTimeout(() => {
      setActiveLane(selected.decision)
      setPhase('done')
    }, 1400)

    return () => window.clearTimeout(settle)
  }, [phase, selected])

  const run = () => {
    if (!selected) return
    setActiveLane(null)
    setPhase('running')
  }

  const reset = () => {
    setPhase('idle')
    setActiveLane(null)
  }

  return (
    <section className="demo section" id="demo" aria-labelledby="demo-title">
      <div className="shell">
        <div className="demo__badge-row">
          <p className="eyebrow" style={{ marginBottom: 0 }}>
            {t.demo.eyebrow}
          </p>
          <span className="sim-badge">{t.demo.badge}</span>
        </div>
        <h2 className="section__title" id="demo-title">
          {t.demo.title}
        </h2>
        <p className="section__lead">{t.demo.lead}</p>

        <div className="demo-stage">
          <div>
            <p className="eyebrow">{t.demo.pick}</p>
            <div className="scenario-list" role="listbox" aria-label={t.demo.pick}>
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className="scenario"
                  role="option"
                  aria-selected={scenario.id === selected?.id}
                  aria-pressed={scenario.id === selected?.id}
                  onClick={() => {
                    setSelectedId(scenario.id)
                    setPhase('idle')
                    setActiveLane(null)
                  }}
                >
                  <span className="scenario__channel">{scenario.channel}</span>
                  <span className="scenario__text">{scenario.customer}</span>
                </button>
              ))}
            </div>

            <div className="demo-controls">
              <button
                type="button"
                className="btn btn--signal"
                onClick={run}
                disabled={phase === 'running' || !selected}
              >
                {phase === 'running' ? t.demo.running : t.demo.run}
              </button>
              <button type="button" className="btn btn--ghost" onClick={reset} style={{ color: '#f7f9fb', borderColor: 'rgba(247,249,251,0.28)' }}>
                {t.demo.reset}
              </button>
            </div>
          </div>

          <div className="routing-board" aria-live="polite">
            <div className="tracks">
              {LANES.map((lane) => {
                const isTarget = selected?.decision === lane
                const showPacket =
                  (phase === 'running' && isTarget) || (phase === 'done' && activeLane === lane)

                return (
                  <div
                    key={lane}
                    className={`track${activeLane === lane ? ' is-active' : ''}`}
                    data-lane={lane}
                  >
                    <div className="track__label">{t.demo.laneLabels[lane]}</div>
                    <div className="track__rail">
                      {showPacket && (
                        <div
                          className={`packet${phase === 'running' ? ' is-moving' : ''}${
                            phase === 'done' ? ' is-settled' : ''
                          }`}
                        >
                          {selected.channel}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {phase === 'done' && selected && (
              <div className="result-panel">
                <div className="result-panel__meta">
                  <span>
                    {t.demo.result}:{' '}
                    <strong className="result-panel__decision">{selected.decisionLabel}</strong>
                  </span>
                  <span>
                    {t.demo.knowledge}: {selected.knowledge}
                  </span>
                </div>
                <p className="result-panel__reply">{selected.reply}</p>
              </div>
            )}
          </div>
        </div>

        <p className="demo__footer-note">{t.demo.footer}</p>
      </div>
    </section>
  )
}
