import React from 'react'

function MemoizedPanel() {
  return (
    <article className="panel memoized-panel">
      <h2>Memoized panel</h2>
      <p>
        This card does not subscribe to theme context. Parent toggles should not
        thrash unrelated UI.
      </p>
      <p className="render-count">Render count (dev): 1</p>
    </article>
  )
}

export default React.memo(MemoizedPanel)
