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

  origin = async () => {
    let result = undefined
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    result = new URL(tabs[0].url).origin

    return result
  }

  iconDetails = ({ tabId, disabled }) => {
    const iconSizes = [16, 32, 64, 128]
    const iconTemplate = disabled ? '/images/logo-disabled<SIZE>.png' : '/images/logo-default<SIZE>.png'
    const details = { tabId, path: {} }
    iconSizes.forEach((size) => {
      details.path[size.toString()] = iconTemplate.replace('<SIZE>', size)
    })
    return details
  }

  setIcon = async () => {
    const origin = await this.origin()
    const disabled = await this.dislexicDisabled(origin)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return

      const tabId = tabs[0].id
      const details = this.iconDetails({ tabId, disabled })
      chrome.action.setIcon(details)
    })
  }
}
