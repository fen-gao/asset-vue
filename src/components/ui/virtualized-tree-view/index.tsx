import React, { useState, useCallback, useRef, useEffect } from 'react'
import { VariableSizeList as List } from 'react-window'

export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
  [key: string]: any
}

interface VirtualizedTreeViewProps<T extends TreeItem> {
  items: T[]
  expandedItems: Set<string>
  onItemSelect?: (item: T) => void
  renderItem: (item: T, isExpanded: boolean, isSelected: boolean) => React.ReactNode
}

function useContainerDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return [ref, dimensions] as const
}

function VirtualizedTreeView<T extends TreeItem>({
  items,
  expandedItems,
  onItemSelect,
  renderItem,
}: VirtualizedTreeViewProps<T>) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [containerRef, { width, height }] = useContainerDimensions()
  const listRef = useRef<List>(null)

  const handleItemSelect = useCallback(
    (item: T) => {
      setSelectedItemId(item.id)
      if (onItemSelect) {
        onItemSelect(item)
      }
    },
    [onItemSelect]
  )

  const flattenedItems = React.useMemo(() => {
    const flattened: { item: T; level: number }[] = []
    const flatten = (items: T[], level: number) => {
      items.forEach((item) => {
        flattened.push({ item, level })
        if (item.children && expandedItems.has(item.id)) {
          flatten(item.children as T[], level + 1)
        }
      })
    }
    flatten(items, 0)
    return flattened
  }, [items, expandedItems])

  const getItemSize = useCallback(() => {
    return 40
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  }, [flattenedItems])

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const { item, level } = flattenedItems[index]
    const isExpanded = expandedItems.has(item.id)
    const isSelected = selectedItemId === item.id

    return (
      <div style={{ ...style, paddingLeft: `${level * 20}px` }}>
        <div onClick={() => handleItemSelect(item)}>{renderItem(item, isExpanded, isSelected)}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {height > 0 && width > 0 && (
        <List
          ref={listRef}
          height={height}
          itemCount={flattenedItems.length}
          itemSize={getItemSize}
          width={width}
          style={{ paddingBottom: '15px' }}
        >
          {Row}
        </List>
      )}
    </div>
  )
}

export default VirtualizedTreeView
