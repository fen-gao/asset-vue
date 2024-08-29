import { TreeItem } from './components/tree-item'
import { TreeViewProps } from './types'

export const TreeView = ({ items, selectedAsset, onAssetSelect, expandedNodeIds }: TreeViewProps) => {
  return (
    <div className="h-full overflow-auto">
      {items.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          onAssetSelect={onAssetSelect}
          selectedAsset={selectedAsset}
          expandedNodeIds={expandedNodeIds}
        />
      ))}
    </div>
  )
}
