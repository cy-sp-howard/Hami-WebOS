import './webOSTV'
import './overwrite.css'
import DB from './db'

const userDB = new DB('1')

function main() {
  alertOverwrite()
  eventHandler()
  launch()
}
function alertOverwrite() {
  const originAlert = window.alert
  window.alert = (text) => {
    if (!isLogin) {
      loginCheck(true)
      loginBy('otp')
      return
    }
    originAlert(text)
  }
}
function eventHandler() {
  let delaySetFullScreenPID = -1
  document.addEventListener('webOSRelaunch', launch, true)
  document.addEventListener('keydown', function (evt) {
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
  document.addEventListener(
    'playing',
    (evt) => {
      evt.target.addEventListener(
        'pause',
        () => {
          clearTimeout(delaySetFullScreenPID)
        },
        { once: true }
      )
      setLastPlayingChannel(myPlayer.contentID)
      if (document.fullscreenElement) return
      delaySetFullScreenPID = setTimeout(() => {
        clearTimeout(delaySetFullScreenPID)
        player.fullscreen.toggle()
      }, 3000)
    },
    { capture: true }
  )
}
function setLastPlayingChannel(id) {
  userDB.simpleWrite('lastPlayingChannel', id)
}
function getLastPlayingChannel() {
  return userDB.simpleRead('lastPlayingChannel')
}
function launch() {
  return getLastPlayingChannel().then((id) => {
    location.href = `https://hamivideo.hinet.net/channel/${id || 'OTT_LIVE_0000002069'}.do`
  })
}

main()
