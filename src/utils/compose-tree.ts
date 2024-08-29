import { Asset, Location, SensorType, Status } from '../types'

export interface CompanyEntity {
  id: string
  name: string
  level?: number
  parentId: string | null
  locationId?: string | null
  children?: CompanyEntity[]
  sensorType?: SensorType
  status?: Status | null
  gatewayId?: string | null
  sensorId?: string | null
}

interface HierarchyStructure {
  roots: CompanyEntity[]
  entityLookup: Map<string, CompanyEntity>
}

const linkEntityToParent = (
  entity: CompanyEntity,
  parentId: string | null,
  entityIndex: Map<string, CompanyEntity>,
  topLevelEntities: CompanyEntity[]
): void => {
  if (parentId === null) {
    topLevelEntities.push(entity)
    return
  }

  const parentEntity = entityIndex.get(parentId)
  if (parentEntity) {
    parentEntity.children = parentEntity.children || []
    parentEntity.children.push(entity)
  } else {
    topLevelEntities.push(entity)
  }
}

const createEntityNode = (source: Location | Asset): CompanyEntity => ({
  ...source,
  children: undefined,
})

/**
 * Constructs a company hierarchy from a list of locations and assets.
 *
 * @param {Location[]} locations - The list of locations to include in the hierarchy.
 * @param {Asset[]} assets - The list of assets to include in the hierarchy.
 * @return {HierarchyStructure} An object containing the roots of the hierarchy and a lookup map of entities.
 */
export const constructCompanyHierarchy = (locations: Location[], assets: Asset[]): HierarchyStructure => {
  const entityIndex = new Map<string, CompanyEntity>()
  const topLevelEntities: CompanyEntity[] = []

  const processCompanyEntity = (item: Location | Asset) => {
    const entityNode = createEntityNode(item)
    entityIndex.set(entityNode.id, entityNode)
    const parentId = 'locationId' in item ? item.locationId || item.parentId || null : item.parentId
    linkEntityToParent(entityNode, parentId, entityIndex, topLevelEntities)
  }

  locations.forEach(processCompanyEntity)
  assets.forEach(processCompanyEntity)

  return { roots: topLevelEntities, entityLookup: entityIndex }
}
