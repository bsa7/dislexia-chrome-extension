// import { Settings } from './settings'

export class Dislexic {
  constructor() {
    this.UNICODE_WORD_X_REG_EXP = XRegExp('\\pL{3,}', 'ig')
    this.NOT_APPLICABLE_NODE_TYPES = ['script', 'style']
    this.allNodes = Array.from(document.body.getElementsByTagName('*'))
  }

  shuffle = (arr = []) => {
    return [...arr].sort(() => 0.5 - Math.random())
  }

  dislexicWord = (word) => {
    const wordLetters = word.split('')
    let result = [wordLetters[0]]
    result = result.concat(this.shuffle(wordLetters.slice(1, wordLetters.length - 1)))
    result.push(wordLetters.slice(-1))
    return result.join('')
  }

  dislexicText = (text) => {
    if (!text) {
      return text
    }

    return text.replace(this.UNICODE_WORD_X_REG_EXP, (word) => {
      return this.dislexicWord(word)
    })
  }

  isBlank = (text) => {
    return !this.UNICODE_WORD_X_REG_EXP.test(text)
  }

  call = () => {
    this.allNodes.forEach((node) => {
      if (node.innerHTML && !this.NOT_APPLICABLE_NODE_TYPES.includes(node.localName)) {
        if (!node.children.length && !/<[^>]+\/?>/m.test(node.innerHTML)) {
          node.dataset.previousInnerHTML = node.innerHTML
          node.innerHTML = this.dislexicText(node.innerHTML)
        }

        if (node.children.length) {
          Array.from(node.childNodes).filter(({ nodeType, textContent }) => {
            return nodeType === 3 && !this.isBlank(textContent)
          }).forEach((textNode) => {
            node.textContent = this.dislexicText(node.textContent)
          })
        }
      }
    })
  }
}
