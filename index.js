(async () => {
  const dislexicSrc = chrome.runtime.getURL('src/dislexic.js')
  const { Dislexic } = await import(dislexicSrc)
  new Dislexic().call()
})()
