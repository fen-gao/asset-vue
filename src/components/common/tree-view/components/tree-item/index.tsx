import { mergeClasses } from '../../../../../utils/merge-classes'
import { determineElementType } from '../../../../../utils/get-element-type'
import { TreeItemContent } from '../tree-content'
import { TreeItemProps } from './types'

export const TreeItem = ({ item, selectedAsset, onAssetSelect, expandedNodeIds }: TreeItemProps) => {
  const { name, children, sensorType, status } = item

  const nodeType = determineElementType(item)
  const hasChildren = children && children.length > 0
  const isExpanded = expandedNodeIds.has(item.id)
  const isComponent = nodeType === 'sensor'
  const isSelected = selectedAsset?.id === item.id && isComponent

  const handleSelect = () => {
    onAssetSelect(item, isComponent)
  }

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <TreeItemContent
        onSelect={handleSelect}
        name={name}
        hasChildren={hasChildren!}
        isExpanded={isExpanded}
        type={nodeType}
        sensorType={sensorType}
        status={status}
        isSelected={isSelected}
      />
      {hasChildren && isExpanded && (
        <ul
          className={mergeClasses('ml-[1.5rem] ps-5', {
            'border-l border-card': hasChildren,
          })}
          role="group"
        >
          {children.map((childNode) => (
            <TreeItem
              key={childNode.id}
              item={childNode}
              onAssetSelect={onAssetSelect}
              selectedAsset={selectedAsset}
              expandedNodeIds={expandedNodeIds}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
