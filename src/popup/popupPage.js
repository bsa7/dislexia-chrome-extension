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

  get changeDisabledStatusForOriginButton() {
    return document.querySelector('#change-status-for-this-origin')
  }

  get changeDisabledStatusForAllButton() {
    return document.querySelector('#change-status-for-all')
  }

  changeDisabledStatusForThisOrigin = async () => {
    const disabled = await this.settings.dislexicDisabled(await this.settings.origin())
    await this.settings.changeDisabledStatus({ origin: await this.settings.origin(), disabled: !disabled })
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
    const origin = await this.settings.origin()
    const disabledForOrigin = await this.settings.dislexicDisabled(origin)
    this.statusForOriginSpan.innerHTML = this.disabledState(disabledForOrigin)
    this.changeDisabledStatusForOriginButton.innerHTML = this.disableAction(disabledForOrigin)
    this.settings.setIcon()
  }

  reflectChangesForAll = async () => {
    const origin = await this.settings.origin()
    const disabledForAll = await this.settings.dislexicDisabled()
    this.statusForAllSpan.innerHTML = this.disabledState(disabledForAll)
    this.changeDisabledStatusForAllButton.innerHTML = this.disableAction(disabledForAll)
    this.settings.setIcon()
  }

  initialize = async () => {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#ee7700'

    const disabledForOrigin = await this.settings.dislexicDisabled(await this.settings.origin())
    this.reflectChangesForOrigin()
    this.changeDisabledStatusForOriginButton.addEventListener('click', this.changeDisabledStatusForThisOrigin)

    const disabledForAll = await this.settings.dislexicDisabled()
    this.reflectChangesForAll()
    this.changeDisabledStatusForAllButton.addEventListener('click', this.changeDisabledStatusForAll)
  }
}
