export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface TreeViewProps<T extends TreeItem> {
  items: T[]
  expandedItems: Set<string>
  onItemSelect?: (item: T) => void
  renderItem: (item: T, isExpanded: boolean, isSelected: boolean) => React.ReactNode
}
