export function platformBack() {
  window.PalmSystem.platformBack()
}

export function fetchAppId() {
  return window.PalmSystem.identifier.split(' ')[0]
}

export function request(service, opts) {
  const bridge = new PalmServiceBridge()
  bridge.onservicecallback = (resultJSON) => {
    const result = {}
    try {
      Object.assign(result, JSON.parse(resultJSON))
    } catch (e) {
      Object.assign(result, { errorCode: -1, errorText: resultJSON, returnValue: false })
    }
    if (!result.errorCode && !result.returnValue) {
      result.returnValue = false
      opts.onFailure && opts.onFailure(result)
    } else {
      result.returnValue = true
      opts.onSuccess && opts.onSuccess(result)
    }
    opts.onComplete && opts.onComplete(result)
    opts.subscribe || bridge.cancel()
  }

  const uri = `${service}/${opts.method}`
  bridge.call(uri, JSON.stringify(opts.parameters))
}
