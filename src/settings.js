export class Settings {
  constructor() {}

  dislexicDisabled = async (origin = this.currentOrigin) => {
    if (!/^https?:\/\//.test(origin)) return true

    return await this.getStorageData(this.disabledStorageKey(origin)) || false
  }

  disableDislexic = ({ origin = this.currentOrigin }) => {
    this.setStorageData(this.disabledStorageKey(origin), true)
  }

  disabledStorageKey = (origin = this.currentOrigin) => {
    return `dislexic-disabled-on--${origin}`
  }

  get currentOrigin() {
    return window.location.origin
  }

  getStorageData(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (value) => {
        return chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve(value[key])
      })
    })
  }

  setStorageData(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        return chrome.runtime.lastError ? reject(Error(chrome.runtime.lastError.message)) : resolve()
      })
    })
  }
}
