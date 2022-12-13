import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import HTML5History from "./history/html5";

export default class VueRouter {
  constructor(options) {
    this._routes = options.routes || [];
    this.matcher = createMatcher(this._routes);
    const mode = (this.mode = options.mode || "hash");
    switch (mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new HTML5History(this);
        break;
      default:
        throw new Error("mode error");
    }
  }
  init(app) {
    const history = this.history;
    const setUpListener = () => {
      history.setUpListener();
    };
    history.transitionTo(history.getCurrentLocation(), setUpListener);
  }
}
VueRouter.install = install;
