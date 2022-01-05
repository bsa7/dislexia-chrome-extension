// This file can be imported inside the service worker,
// which means all of its functions and variables will be accessible
// inside the service worker.
// The importation is done in the file `service-worker.js`.
// console.log("service-worker-utils.js#5 External file is also loaded!")

export class TestClass {
  constructor() {
    this.started = false
  }

  start = () => {
    this.started = true
  }
}
