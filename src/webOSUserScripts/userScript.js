function main() {
  const originAlert = window.alert;
  window.alert = (text) => {
    if (text === "請先登入") {
      if (isLogin) return;
      loginCheck(true) && loginBy("otp");
    }
  };
}

main();
