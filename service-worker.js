import { PopupPage } from "./src/popupPage.js"
import { Settings } from "./src/settings.js"

const onTabUpdated = async (tabId, action, tab) => {
  const settings = new Settings()
  // await settings.disableDislexic({ origin: 'https://stackoverflow.com' })
  const origin = new URL(tab.url).origin
  const disabled = await settings.dislexicDisabled({ origin })
  console.log('onTabUpdated#7', { tabId, action, tab, disabled })

  if (disabled) return

  new PopupPage().runBackgroundScript()
}

chrome.tabs.onUpdated.addListener(onTabUpdated)
