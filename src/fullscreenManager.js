export default new (class {
  fullscreenClassName = 'fullscreen'
  fullscreenTargetParentClassName = 'fullscreen-target-parent'
  get status() {
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
    if (this.status) return Promise.resolve()
    return this.end().then(() => {
      return player.elements.container.requestFullscreen().catch(() => {
        document.body.classList.add(this.fullscreenClassName)
        player.elements.container.parentElement.classList.add(this.fullscreenTargetParentClassName)
      })
    })
  }
  end() {
    document.body.classList.remove(this.fullscreenClassName)
    player.elements.container.parentElement.classList.remove(this.fullscreenTargetParentClassName)
    return Promise.resolve(document.exitFullscreen().catch(() => {}))
  }
})()
