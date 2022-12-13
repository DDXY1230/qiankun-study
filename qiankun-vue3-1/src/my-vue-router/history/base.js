import createRoute from "../util/route";
export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, "/");
  }
  transitionTo(path, onComplete) {
    this.current = this.router.matcher(path);
    onComplete && onComplete();
  }
}
