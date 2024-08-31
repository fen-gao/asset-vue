import { Asset, Location, SensorType, Status } from '../types'

export interface SensorTreeNode {
  id: string
  name: string
  level?: number
  parentId: string | null
  locationId?: string | null
  children?: SensorTreeNode[]
  sensorType?: SensorType
  status?: Status | null
  gatewayId?: string | null
  sensorId?: string | null
}

const insertTreeNode = (
  node: SensorTreeNode,
  parentId: string | null,
  nodesById: Map<string, SensorTreeNode>,
  rootNodes: SensorTreeNode[]
) => {
  if (parentId === null) {
    rootNodes.push(node)
  } else {
    const parent = nodesById.get(parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(node)
    } else {
      rootNodes.push(node)
    }
  }
}

export const createLocationAssetHierarchy = (locations: Location[], assets: Asset[]) => {
  const nodesById = new Map<string, SensorTreeNode>()
  const rootNodes: SensorTreeNode[] = []

  for (const location of locations) {
    const locNode: SensorTreeNode = { ...location }
    nodesById.set(locNode.id, locNode)
    insertTreeNode(locNode, locNode.parentId, nodesById, rootNodes)
  }

  for (const asset of assets) {
    const assetNode: SensorTreeNode = { ...asset }
    nodesById.set(assetNode.id, assetNode)
    insertTreeNode(assetNode, asset.locationId || asset.parentId || null, nodesById, rootNodes)
  }

  return { tree: rootNodes, map: nodesById }
}
