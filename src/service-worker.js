import { Settings } from "./settings.js"
import { PopupPage } from "./popup/popupPage.js"

const onTabUpdated = async (tabId, action, tab) => {
  const settings = new Settings()
  const popupPage = new PopupPage()
  const { origin } = new URL(tab.url)
  settings.setIcon()
  if (await settings.dislexicDisabled(origin)) return

  popupPage.runBackgroundScript()
}

chrome.tabs.onUpdated.addListener(onTabUpdated)
