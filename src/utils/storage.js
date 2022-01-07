export class Storage {
  constructor() {}

  get runtimeError() {
    return Error(chrome.runtime.lastError.message)
  }

  get lastError() {
    return chrome.runtime.lastError
  }

  getData(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (value) => {
        return this.lastError ? reject(this.runtimeError) : resolve(value[key])
      })
    })
  }

  setData(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        return this.lastError ? reject(this.runtimeError) : resolve()
      })
    })
  }

  removeData(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove([key], () => {
        return this.lastError ? reject(this.runtimeError) : resolve()
      })
    })
  }
}
