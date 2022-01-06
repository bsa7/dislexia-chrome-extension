(async () => {
  const src = chrome.runtime.getURL('src/popup/popupPage.js')
  const { PopupPage } = await import(src)
  const popupPage = new PopupPage()
  popupPage.initialize()
})()

