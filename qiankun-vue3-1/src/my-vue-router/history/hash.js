import History from "./base";
export default class HashHistory extends History {
  constructor(router) {
    super(router);
    ensureSlash();
  }
  getCurrentLocation() {
    return window.location.hash.slice(1);
  }
  setUpListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(this.getCurrentLocation());
    });
  }
}
function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = "/";
}
