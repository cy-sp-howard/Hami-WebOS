function main() {
  const originAlert = window.alert;
  let delaySetFullScreenPID = -1;
  window.alert = (text) => {
    if (text === "請先登入") {
      if (!isLogin) {
        loginCheck(true)
        loginBy("otp");
        return 
      }
    }
    originAlert(text)
  };

  addEventListener(
    "playing",
    (evt) => {
      if (document.fullscreenElement) return;
      evt.target.addEventListener(
        "pause",
        () => {
          clearTimeout(delaySetFullScreenPID);
        },
        { once: true }
      );
      delaySetFullScreenPID = setTimeout(() => {
        clearTimeout(delaySetFullScreenPID);
        player.fullscreen.toggle();
      }, 3000);
    },
    { capture: true }
  );
}

main();
