class Notifier {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers = this.observers.filter((ob) => ob !== observer);
  }
  notify() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(this.name, "name");
  }
}

const ob1 = new Observer("aaa");
const ob2 = new Observer("bbb");
const notifier = new Notifier();
notifier.add(ob1);
notifier.add(ob2);
notifier.notify();
