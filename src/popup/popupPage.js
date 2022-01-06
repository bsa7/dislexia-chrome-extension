export class PopupPage {
  constructor(settings) {
    this.settings = settings
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

  initialize = () => {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#ee7700'
    const statusSpan = document.querySelector('#dislexic-disabled')
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const { origin } = new URL(tabs[0].url)
      const disabled = await this.settings.dislexicDisabled(origin)
      statusSpan.innerHTML = disabled ? 'DISABLED' : 'ENABLED'
    })
  }
}
