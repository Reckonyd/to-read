export interface State {
  search: string
  toReadList: ToReadItem[]
  directories: Directory[]
  selectedItems: SelectedItem[]
  draggedItemInfo?: DraggedItemInfo
  waiting: number
  failStatus: string
}

export interface ToReadItem {
  id: string
  dirId: number | string
  url: string
  title: string
  description: string
  image_url: string
  image_alt: string
}

export interface Directory {
  id: string | number
  name: string
}

export interface SelectedItem {
  itemId: string
  whatDir: string | number
}

export interface DraggedItemInfo {
  id: string
  dir: string | number
}

export type PageInfo = ToReadItem & {
  error?: boolean
  notFound?: boolean
}
