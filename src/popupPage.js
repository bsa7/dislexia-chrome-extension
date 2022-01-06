export class PopupPage {
  constructor() {}

  runBackgroundScript = () => {
    // if (this.dislexicDisabledForThisHost()) return

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['vendor/js/xregexp-all.js', 'index.js'],
      })
    })
  }

  dislexicDisabledForThisHost = () => {
    const disabled = chrome.storage.sync.get(this.disabledStorageKey)
    console.log('dislexicDisabledForThisHost#17', { disabled })
    return disabled
  }

  disableDislexicForThisHost = () => {
    chrome.storage.sync.set({ [this.disabledStorageKey]: true })
  }

  get disabledStorageKey() {
    return `dislexic-disabled-for-${this.currentOrigin}`
  }

  get currentOrigin() {
    return window.location.origin
  }
}
