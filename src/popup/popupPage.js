import { Settings } from '../settings.js'

export class PopupPage {
  constructor() {
    this.origin = undefined
    this.settings = new Settings()
  }

  runBackgroundScript = () => {
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

  get changeDisabledStatusForOriginButton() {
    return document.querySelector('#change-status-for-this-origin')
  }

  get changeDisabledStatusForAllButton() {
    return document.querySelector('#change-status-for-all')
  }

  changeDisabledStatusForThisOrigin = async () => {
    const disabled = await this.settings.dislexicDisabled(this.origin)
    await this.settings.changeDisabledStatus({ origin: this.origin, disabled: !disabled })
    this.reflectChangesForOrigin()
  }

  changeDisabledStatusForAll = async () => {
    const disabled = await this.settings.dislexicDisabled()
    await this.settings.changeDisabledStatus({ disabled: !disabled })
    this.reflectChangesForAll()
  }

  disabledState = (disabled) => {
    return disabled ? 'DISABLED' : 'ENABLED'
  }

  disableAction = (disable) => {
    return disable ? 'ENABLE' : 'DISABLE'
  }

  reflectChangesForOrigin = async () => {
    const disabledForOrigin = await this.settings.dislexicDisabled(this.origin)
    this.statusForOriginSpan.innerHTML = this.disabledState(disabledForOrigin)
    this.changeDisabledStatusForOriginButton.innerHTML = this.disableAction(disabledForOrigin)
  }

  reflectChangesForAll = async () => {
    const disabledForAll = await this.settings.dislexicDisabled()
    this.statusForAllSpan.innerHTML = this.disabledState(disabledForAll)
    this.changeDisabledStatusForAllButton.innerHTML = this.disableAction(disabledForAll)
  }

  initialize = () => {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#ee7700'

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      this.origin = new URL(tabs[0].url).origin

      const disabledForOrigin = await this.settings.dislexicDisabled(this.origin)
      this.reflectChangesForOrigin()
      this.changeDisabledStatusForOriginButton.addEventListener('click', this.changeDisabledStatusForThisOrigin)

      const disabledForAll = await this.settings.dislexicDisabled()
      this.reflectChangesForAll()
      this.changeDisabledStatusForAllButton.addEventListener('click', this.changeDisabledStatusForAll)
    })
  }
}
