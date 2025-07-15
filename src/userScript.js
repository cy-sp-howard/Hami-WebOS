import './webOSTV'
import 'overwrite.css'

function main() {
  const originAlert = window.alert
  let delaySetFullScreenPID = -1
  window.alert = (text) => {
    if (!isLogin) {
      loginCheck(true)
      loginBy('otp')
      return
    }
    originAlert(text)
  }
  addEventListener('keydown', function (evt) {
    const code = evt.keyCode || evt.which
    if (code !== 461) return
    if (document.fullscreenElement) {
      player.fullscreen.toggle()
      delaySetFullScreenPID = setTimeout(() => {
        if (document.fullscreenElement) return
        player.fullscreen.toggle()
      }, 5000)
    }
    webOS.platformBack()
  })
  addEventListener(
    'playing',
    (evt) => {
      evt.target.addEventListener(
        'pause',
        () => {
          clearTimeout(delaySetFullScreenPID)
        },
        { once: true }
      )
      if (document.fullscreenElement) return
      delaySetFullScreenPID = setTimeout(() => {
        clearTimeout(delaySetFullScreenPID)
        player.fullscreen.toggle()
      }, 3000)
    },
    { capture: true }
  )
}

main()
