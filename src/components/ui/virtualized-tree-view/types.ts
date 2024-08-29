export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
  [key: string]: any
}

export interface VirtualizedTreeViewProps<T extends TreeItem> {
  items: T[]
  expandedItems: Set<string>
  onItemSelect?: (item: T) => void
  renderItem: (item: T, isExpanded: boolean, isSelected: boolean) => React.ReactNode
}
