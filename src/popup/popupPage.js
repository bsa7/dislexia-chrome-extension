export class PopupPage {
  constructor() {}

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
    body.style.backgroundColor = '#ee9999'
  }
}
