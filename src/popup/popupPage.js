import { Settings } from '../settings.js'

export class PopupPage {
  constructor() {
    this.settings = new Settings()
  }

  runBackgroundScript = async () => {
    this.settings.setIcon()
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (typeof tabs !== 'undefined' && typeof tabs[0] !== 'undefined') {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['vendor/js/xregexp-all.js', 'index.js'],
        })
      }
    })
  }

  get statusForOriginSpan() {
    return document.querySelector('#dislexic-status-for-origin')
  }

  get statusForAllSpan() {
    return document.querySelector('#dislexic-status-for-all')
  }

  get disableForOriginButton() {
    return document.querySelector('#for-this-origin button#disable')
  }

  get enableForOriginButton() {
    return document.querySelector('#for-this-origin button#enable')
  }

  get unsetForOriginButton() {
    return document.querySelector('#for-this-origin button#unset')
  }

  get changeDisabledStatusForAllButton() {
    return document.querySelector('#change-status-for-all')
  }

  disableForThisOrigin = async () => {
    await this.settings.changeDisabledStatus({ origin: await this.settings.origin(), disabled: true })
    this.reflectChangesForOrigin()
  }

  enableForThisOrigin = async () => {
    await this.settings.changeDisabledStatus({ origin: await this.settings.origin(), disabled: false })
    this.reflectChangesForOrigin()
  }

  unsetForThisOrigin = async () => {
    await this.settings.changeDisabledStatus({ origin: await this.settings.origin(), disabled: undefined })
    this.reflectChangesForOrigin()
  }

  changeDisabledStatusForAll = async () => {
    const disabled = await this.settings.dislexicDisabledForAll()
    await this.settings.changeDisabledStatus({ disabled: !disabled })
    this.reflectChangesForAll()
  }

  disabledState = async (disabled) => {
    if (typeof disabled === 'undefined') {
      return await this.settings.dislexicDisabledForAll() ? 'DISABLED' : 'ENABLED'
    }

    return disabled ? 'DISABLED' : 'ENABLED'
  }

  disableAction = (disable) => {
    return disable ? 'ENABLE' : 'DISABLE'
  }

  disable = (domElement) => {
    domElement.setAttribute('disabled', 'disabled')
  }

  enable = (domElement) => {
    domElement.removeAttribute('disabled')
  }

  reflectChangesForOrigin = async () => {
    const origin = await this.settings.origin()
    const disabledForOrigin = await this.settings.dislexicDisabledForOrigin(origin)
    this.statusForOriginSpan.innerHTML = `${await this.disabledState(disabledForOrigin)} for ${typeof disabledForOrigin === 'undefined' ? 'all sites' : 'this site'}`

    if (disabledForOrigin === true) {
      this.disable(this.disableForOriginButton)
      this.enable(this.enableForOriginButton)
      this.enable(this.unsetForOriginButton)
    } else if (disabledForOrigin === false) {
      this.enable(this.disableForOriginButton)
      this.disable(this.enableForOriginButton)
      this.enable(this.unsetForOriginButton)
    } else if (typeof disabledForOrigin === 'undefined') {
      this.enable(this.disableForOriginButton)
      this.enable(this.enableForOriginButton)
      this.disable(this.unsetForOriginButton)
    }
    this.settings.setIcon()
  }

  reflectChangesForAll = async () => {
    const origin = await this.settings.origin()
    const disabledForAll = await this.settings.dislexicDisabledForAll()
    this.statusForAllSpan.innerHTML = `${await this.disabledState(disabledForAll)} for all sites`
    this.changeDisabledStatusForAllButton.innerHTML = `${await this.disableAction(disabledForAll)} for all sites`
    this.settings.setIcon()
  }

  initialize = async () => {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#ee7700'

    this.reflectChangesForOrigin()
    this.enableForOriginButton.addEventListener('click', this.enableForThisOrigin)
    this.disableForOriginButton.addEventListener('click', this.disableForThisOrigin)
    this.unsetForOriginButton.addEventListener('click', this.unsetForThisOrigin)

    this.reflectChangesForAll()
    this.changeDisabledStatusForAllButton.addEventListener('click', this.changeDisabledStatusForAll)
  }
}
