(async () => {
  const popupPageSrc = chrome.runtime.getURL('src/popup/popupPage.js')
  const { PopupPage } = await import(popupPageSrc)
  const popupPage = new PopupPage()
  await popupPage.initialize()
})()

