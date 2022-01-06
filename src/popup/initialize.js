(async () => {
  const settingsSrc = chrome.runtime.getURL('src/settings.js')
  const { Settings } = await import(settingsSrc)
  const popupPageSrc = chrome.runtime.getURL('src/popup/popupPage.js')
  const { PopupPage } = await import(popupPageSrc)
  const popupPage = new PopupPage(new Settings())
  await popupPage.initialize()
})()

