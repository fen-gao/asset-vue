import React, { useState, useCallback, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
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

  const flattenedItems = useMemo(() => {
    const flatten = (items: T[], level = 0): { item: T; level: number }[] => {
      return items.reduce((acc, item) => {
        acc.push({ item, level })
        if (item.children && item.children.length > 0 && expandedItems.has(item.id)) {
          acc.push(...flatten(item.children as T[], level + 1))
        }
        return acc
      }, [] as { item: T; level: number }[])
    }
    return flatten(items)
  }, [items, expandedItems])

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const { item, level } = flattenedItems[index]
      const isExpanded = expandedItems.has(item.id)
      const isSelected = selectedItemId === item.id

      return (
        <div style={{ ...style, paddingLeft: `${level * 20}px` }} onClick={() => handleItemSelect(item)}>
          {renderItem(item, isExpanded, isSelected)}
        </div>
      )
    },
    [flattenedItems, expandedItems, selectedItemId, handleItemSelect, renderItem]
  )

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={flattenedItems.length}
          itemSize={40} // Adjust this value based on your item height
          width={width}
        >
          {renderRow}
        </List>
      )}
    </AutoSizer>
  )
}
