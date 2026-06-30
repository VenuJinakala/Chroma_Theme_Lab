import React from 'react'

function SurfaceCard() {
  return (
    <article className="panel surface-panel">
      <h2>Surface tokens</h2>
      <p>
        Cards use Tailwind dark: variants. Inline script in <code>index.html</code>{' '}
        applies the correct class before paint.
      </p>
    </article>
  )
}

export default React.memo(SurfaceCard)
