import webos from './webOSTV'

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
    if (document.fullscreenElement) return player.fullscreen.toggle()
  })
  addEventListener(
    'playing',
    (evt) => {
      if (document.fullscreenElement) return
      evt.target.addEventListener(
        'pause',
        () => {
          clearTimeout(delaySetFullScreenPID)
        },
        { once: true }
      )
      delaySetFullScreenPID = setTimeout(() => {
        clearTimeout(delaySetFullScreenPID)
        player.fullscreen.toggle()
      }, 3000)
    },
    { capture: true }
  )
}

main()
