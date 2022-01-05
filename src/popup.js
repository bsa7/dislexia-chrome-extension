export class PopupPage {
  constructor() {}

  runBackgroundScript = () => {
    console.log('runBackgroundScripts#4')
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('#18', { tabs })
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['vendor/js/xregexp-all.js', 'index.js'],
      })
    })
  }
}
