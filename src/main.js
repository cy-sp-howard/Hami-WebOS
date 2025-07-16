function redirect() {
  return getLastPlayingChannel().then((id) => {
    location.href = `https://hamivideo.hinet.net/channel/${id || 'OTT_LIVE_0000002069'}.do`
  })
}
addEventListener('userScriptLoaded', redirect)
