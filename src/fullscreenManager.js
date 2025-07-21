export default new (class {
  constructor() {
    this.fullscreenClassName = 'fullscreen'
    this.fullscreenTargetParentClassName = 'fullscreen-target-parent'
  }
  get status() {
    if (!player) return document.fullscreenElement
    return (
      document.fullscreenElement ||
      (document.body.classList.contains(this.fullscreenClassName) &&
        player.elements.container.parentElement.classList.contains(
          this.fullscreenTargetParentClassName
        ))
    )
  }
  toggle() {
    this.status ? this.end() : this.start()
  }
  start() {
    if (this.status || !player) return Promise.resolve()
    return this.end().then(() => {
      return player.elements.container.requestFullscreen().catch(() => {
        document.body.classList.add(this.fullscreenClassName)
        player.elements.container.parentElement.classList.add(this.fullscreenTargetParentClassName)
      })
    })
  }
  end() {
    if (!player) return Promise.resolve()
    document.body.classList.remove(this.fullscreenClassName)
    player.elements.container.parentElement.classList.remove(this.fullscreenTargetParentClassName)
    return Promise.resolve(document.exitFullscreen().catch(() => {}))
  }
})()
