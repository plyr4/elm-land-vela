import { Elm } from '../src/Main.elm'

let startApp = ({ Interop }) => {
  let env = {}

  let flags = Interop.flags
    ? Interop.flags({ env })
    : undefined

  let app = Elm.Main.init({
    node: document.getElementById('app'),
    flags
  })

  if (Interop.onReady) {
    Interop.onReady({ app, env })
  }
}

// If user has defined an interop.js file, use it
try {
  let Interop = import.meta.globEager('../../src/interop.js')['../../src/interop.js'] || {}
  startApp({ Interop })
} catch (_) {
  startApp({ Interop: {} })
}