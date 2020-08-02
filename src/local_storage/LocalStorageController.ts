/***********************************************************************
 Local Storage Controller acts as an abstraction over Local Storage API.
 ***********************************************************************/

import { ToReadItem, Directory, PageInfo } from '@/store/types'

interface ToReadStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
  toReadList: ToReadItem[]
  directories: Directory[]
}

// Store Template for Local Storage Initialization.
const storeTemplate: ToReadStore = { toReadList: [], directories: [] }

export default class LocalStorageController {
  constructor() {
    // Create an entry in Local Storage, based on the template, if there is none.
    if (!localStorage.getItem('toReadStore')) {
      this.setLocalStorage(storeTemplate)
    }
  }

  // Create a new Local Storage entry or overwrite existing with whole store.
  setLocalStorage(store: ToReadStore): void {
    localStorage.setItem('toReadStore', JSON.stringify(store))
  }

  // Return Local Storage Entry or Store Template in absence of an entry.
  getLocalStorage(): ToReadStore {
    const LSStore: ToReadStore = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.getItem('toReadStore')!,
    )

    return LSStore ? LSStore : storeTemplate
  }

  // Create a temporary store object from Local Storage,
  // add item to the specified list and set Local Storage entry
  // with new value.
  addItemToLocalStorage(itemListName: string, item: PageInfo): void {
    const tempStore = { ...this.getLocalStorage() }
    tempStore[itemListName].push(item)

    this.setLocalStorage(tempStore)
  }

  // Create a temporary store object from Local Storage,
  // overwrite the whole list and set Local Storage entry
  // with new value.
  modifyLocalStorageList(itemListName: string, value: ToReadItem[]): void {
    const tempStore = { ...this.getLocalStorage() }
    tempStore[itemListName] = value

    this.setLocalStorage(tempStore)
  }

  // Create a temporary store object from Local Storage,
  // remove item from the specified list and set Local Storage entry
  // with new value.
  removeItemFromLocalStorage(itemListName: string, itemIndex: number): void {
    const tempStore = this.getLocalStorage()
    tempStore[itemListName].splice(itemIndex, 1)

    this.setLocalStorage(tempStore)
  }
}
