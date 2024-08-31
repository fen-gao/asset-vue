import { SensorTreeNode } from './compose-tree'

export type ElementType = 'location' | 'sub-location' | 'asset' | 'component'

export const determineElementType = (node: SensorTreeNode): ElementType => {
  const { parentId, sensorType } = node

  if (sensorType) return 'component'

  if (sensorType === null) return 'asset'

  if (parentId) return 'sub-location'

  return 'location'
}
