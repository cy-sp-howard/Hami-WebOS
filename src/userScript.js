import { platformBack } from './webOSTVAPI'
import './overwrite.css'
import DB from './db'
import fullscreenManager from './fullscreenManager'

const userDB = new DB('1')

function main() {
  print('userScript running')
  alertOverwrite()
  buyRedirectOverwrite()
  eventHandler()
  launch()
}
function alertOverwrite() {
  const originAlert = window.alert
  window.alert = (text) => {
    if (!isLogin) {
      loginCheck && loginCheck(true)
      loginBy && loginBy('otp')
      return
    }
    originAlert(text)
  }
}
function buyRedirectOverwrite() {
  addEventListener('load', () => {
    if (!myPlayer) return
    myPlayer.callBuy = () => {
      launch('OTT_LIVE_0000001508')
    }
  })
}
function eventHandler() {
  let delaySetFullScreenPID = -1
  addEventListener('wheel', (evt) => {
    document.documentElement.scrollTop += evt.deltaY
  })
  document.addEventListener(
    'webOSRelaunch',
    () => {
      print('webOSRelaunch')
      launch()
    },
    true
  )
  document.addEventListener('keydown', function (evt) {
    const code = evt.keyCode || evt.which
    print(`got keyCode: ${code}`)
    switch (code) {
      case 461:
        if (fullscreenManager.status) {
          fullscreenManager.end()
          delaySetFullScreenPID = setTimeout(() => {
            if (fullscreenManager.status) return
            fullscreenManager.start()
          }, 5000)
          break
        }
        platformBack()
        break
      case 37:
        toggleQuality()
        break
      case 39:
        fullscreenManager.toggle()
        break
      case 13:
        player && player.elements.buttons.play[0].click()
        break
    }
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
      myPlayer && setLastPlayingChannel(myPlayer.contentID)
      if (document.fullscreenElement) return
      delaySetFullScreenPID = setTimeout(() => {
        clearTimeout(delaySetFullScreenPID)
        print('set fullscreen')
        fullscreenManager.start()
      }, 5000)
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
function launch(id) {
  if (id) {
    location.href = `https://hamivideo.hinet.net/channel/${id}.do`
    return
  }
  if (location.href.includes('hamivideo')) return
  return getLastPlayingChannel().then((id) => {
    location.href = `https://hamivideo.hinet.net/channel/${id || 'OTT_LIVE_0000002069'}.do`
  })
}
function print(text) {
  if (typeof text !== 'string') return console.log(text)
  console.log(`%c${text}`, 'color:PeachPuff;')
}
function toggleQuality() {
  if (!player) return
  if (player.elements.controls.computedStyleMap().get('opacity') === 0) {
    player.toggleControls()
  }
  player.elements.qualityswitch.popup.hidden = false
  const list = Array.from(player.elements.qualityswitch.popup.querySelectorAll('button'))
  const nextIndex = list.findIndex((i) => i.checked) + 1
  const target = list[nextIndex % list.length]
  target.click()
  showMessage(`畫質：${target.textContent}`)
}
function showMessage(msg) {
  if (!player) return
  const id = 'user-script-msg'
  const el = player.elements.container.querySelector(`#${id}`) || document.createElement('div')
  el.remove()
  el.id = id
  el.dataset.msg = msg
  player.elements.container.appendChild(el)
  player.elements.container.addEventListener('animationend', () => el.remove(), { once: true })
}

main()
