import { PopupPage } from "./src/popupPage.js"

const onTabUpdated = () => {
  new PopupPage().runBackgroundScript()
}

chrome.tabs.onUpdated.addListener(onTabUpdated)
