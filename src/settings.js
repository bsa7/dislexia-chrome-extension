import { Storage } from './utils/storage.js'

export class Settings {
  constructor() {
    this.storage = new Storage()
  }

  dislexicDisabled = async (origin = undefined) => {
    if (typeof origin !== 'undefined') {
      if (!/^https?:\/\//.test(origin)) return true

      let disabled = await this.storage.getData(this.disabledStorageKey(origin))
      if (typeof disabled === 'undefined') {
        disabled = await this.storage.getData(this.disabledStorageKey())
      }

      return disabled
    }

    return await this.storage.getData(this.disabledStorageKey())
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
