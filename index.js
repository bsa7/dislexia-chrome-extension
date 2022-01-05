(async () => {
  const src = chrome.runtime.getURL('src/dislexic.js')
  const { Dislexic } = await import(src)
  new Dislexic().call()
})()
