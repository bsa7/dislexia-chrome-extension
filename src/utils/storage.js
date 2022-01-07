export class Storage {
  constructor() {}

  getData(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (value) => {
        return chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve(value[key])
      })
    })
  }

  setData(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        return chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve()
      })
    })
  }

}
