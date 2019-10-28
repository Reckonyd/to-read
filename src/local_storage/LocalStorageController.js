const storeTemplate = { toReadList: [], directories: [] }

export default class LocalStorageController {
  constructor() {
    if (!localStorage.getItem('store')) {
      this.setLocalStorage(storeTemplate)
    }
  }

  setLocalStorage(store) {
    localStorage.setItem('store', JSON.stringify(store))
  }

  getLocalStorage() {
    const LSStore = JSON.parse(localStorage.getItem('store'))
    return LSStore ? LSStore : storeTemplate
  }

  addItemToLocalStorage(itemListName, item) {
    let tempStore = { ...this.getLocalStorage() }
    tempStore[itemListName].push(item)

    this.setLocalStorage(tempStore)
  }

  modifyLocalStorageList(itemListName, value) {
    let tempStore = { ...this.getLocalStorage() }

    tempStore[itemListName] = value

    this.setLocalStorage(tempStore)
  }

  removeItemFromLocalStorage(itemListName, itemIndex) {
    let tempStore = this.getLocalStorage()

    tempStore[itemListName].splice(itemIndex, 1)

    this.setLocalStorage(tempStore)
  }
}
