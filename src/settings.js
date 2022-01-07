import { Storage } from './utils/storage.js'

export class Settings {
  constructor() {
    this.storage = new Storage()
  }

  dislexicDisabledForAll = async () => {
    return await this.storage.getData(this.disabledStorageKey())
  }

  dislexicDisabledForOrigin = async (origin) => {
    return await this.storage.getData(this.disabledStorageKey(origin))
  }

  dislexicDisabled = async (origin = undefined) => {
    if (typeof origin !== 'undefined') {
      if (!/^https?:\/\//.test(origin)) return true

      let disabled = await this.dislexicDisabledForOrigin(origin)
      if (typeof disabled === 'undefined') {
        disabled = await this.dislexicDisabledForAll()
      }

      return disabled
    }

    return await this.dislexicDisabledForAll()
  }

  changeDisabledStatus = async ({ origin = undefined, disabled }) => {
    if (typeof disabled === 'undefined') {
      await this.storage.removeData(this.disabledStorageKey(origin))
      return
    }

    await this.storage.setData(this.disabledStorageKey(origin), disabled)
  }

  disabledStorageKey = (origin = undefined) => {
    return `dislexic-disabled-on--${origin}`
  }

  origin = async () => {
    let result = undefined
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (typeof tab === 'undefined') return undefined

    result = new URL(tab.url).origin

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
