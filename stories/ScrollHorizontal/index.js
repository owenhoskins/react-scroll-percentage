import React from 'react'

const style = {
  width: '101vh',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'papayawhip',
}

/**
 * ScrollWrapper directs the user to scroll the page to reveal it's children.
 * Use this on Modules that have scroll and/or observer triggers.
 */
function ScrollWrapper({ children, ...props }) {
  return (
    <div {...props}>
      <section style={{ ...style }}>
        <h1>⬇ Scroll Right ⬇</h1>
      </section>
      {children}
      <section style={{ ...style }}>
        <h1>⬆︎ Scroll Left ⬆︎</h1>
      </section>
    </div>
  )
}

export default ScrollWrapper
