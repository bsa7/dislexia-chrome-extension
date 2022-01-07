import { Storage } from './utils/storage.js'

export class Settings {
  constructor() {
    this.storage = new Storage()
  }

  dislexicDisabled = async (origin = undefined) => {
    if (typeof origin === 'undefined') return await this.storage.getData(this.disabledStorageKey()) || false
    if (!/^https?:\/\//.test(origin)) return true

    return await this.storage.getData(this.disabledStorageKey(origin)) || false
  }

  changeDisabledStatus = async ({ origin = undefined, disabled }) => {
    await this.storage.setData(this.disabledStorageKey(origin), disabled)
  }

  disabledStorageKey = (origin = undefined) => {
    return `dislexic-disabled-on--${origin}`
  }

  get currentOrigin() {
    return window.location.origin
  }
}
