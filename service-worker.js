import { PopupPage } from "./src/popup.js"

// console.log('service-worker.js#2')

// chrome.tabs.onCreated.addListener(runBackgroundScripts)
const onTabUpdated = () => {
  console.log('onTabUpdated#7')
  new PopupPage().runBackgroundScript()
}

console.log('service-worker.js#11')

chrome.tabs.onUpdated.addListener(onTabUpdated)

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('service-worker.js#5 - DOMContentLoaded')
//   runBackgroundScripts()
// })

// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.
// console.log("This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
// import { TestClass } from './service-worker-utils.js'

// const testClassInstance = new TestClass()

// console.log('#11 service-worker.js', { testClassInstance })

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
