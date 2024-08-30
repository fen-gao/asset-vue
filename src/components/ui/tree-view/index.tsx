import { useState, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import { TreeItem, TreeViewProps } from './types'

export const TreeView = <T extends TreeItem>({ items, expandedItems, onItemSelect, renderItem }: TreeViewProps<T>) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleItemSelect = useCallback(
    (item: T) => {
      setSelectedItemId(item.id)
      if (onItemSelect) {
        onItemSelect(item)
      }
    },
    [onItemSelect]
  )

  const renderTreeItem = (item: T, level: number) => {
    const isExpanded = expandedItems.has(item.id)
    const isSelected = selectedItemId === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <div onClick={() => handleItemSelect(item)}>{renderItem(item, isExpanded, isSelected)}</div>
        {hasChildren && isExpanded && item.children!.map((child) => renderTreeItem(child as T, level + 1))}
      </div>
    )
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>{renderTreeItem(items[index], 0)}</div>
  )

  return (
    <List height={600} itemCount={items.length} itemSize={50} width="100%">
      {Row}
    </List>
  )
}
