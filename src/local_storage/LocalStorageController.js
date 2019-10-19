export default class LocalStorageController {
  constructor() {
    this.store = {}
  }

  setLocalStorage() {
    localStorage.setItem('store', JSON.stringify(this.store))
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('store'))
  }

  addItemToLocalStorage(itemListName, item) {
    let tempStore = { ...this.getLocalStorage() }

    if (!Object.prototype.hasOwnProperty.call(tempStore, itemListName)) {
      tempStore = { ...tempStore, [itemListName]: [] }
    }
    tempStore[itemListName].push(item)

    this.store = tempStore
    this.setLocalStorage()
  }

  removeItemFromLocalStorage(itemListName, itemIndex) {
    let tempStore = this.getLocalStorage()

    tempStore[itemListName].splice(itemIndex, 1)

    this.store = tempStore
    this.setLocalStorage()
  }
}
