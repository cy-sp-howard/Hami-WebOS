import { request } from '../src/webOSTVAPI'
import targetAppInfo from '../public/appinfo.json'

function launchApp() {
  request('luna://org.webosbrew.hbchannel.service', {
    method: 'autostart',
    onSuccess: function (res) {
      console.log('launchApp', res)
    },
    onFailure: function (res) {
      console.error('launchApp', res)
    }
  })
}

function registerAutostart() {
  request('luna://com.webos.service.eim', {
    method: 'addDevice',
    parameters: {
      appId: targetAppInfo.id, // your application ID, required
      pigImage: 'largeIcon.png', // required, preview image rendered in "All inputs", relative to main application directory, can be just an empty string
      mvpdIcon: '', // required on webOS <3.x
      type: 'MVPD_IP', // optional, no idea (can be MVPD_IP or MVPD_RF)
      showPopup: true, // optional, shows a toast with info that default input has been changed to label
      label: 'Autostart' // optional, used in toast message only
    },
    onSuccess: function (res) {
      console.log('registerAutostart', res)
    },
    onFailure: function (res) {
      console.error('registerAutostart', res)
    }
  })
}

registerAutostart()
launchApp()
