import { CompanyEntity } from './compose-tree'

export type HierarchyElementType = 'facility' | 'area' | 'equipment' | 'sensor'

export const determineElementType = (element: CompanyEntity): HierarchyElementType => {
  if (isSensor(element)) {
    return 'sensor'
  }

  if (isEquipment(element)) {
    return 'equipment'
  }

  if (isArea(element)) {
    return 'area'
  }

  if (isFacility(element)) {
    return 'facility'
  }

  throw new Error(`Unable to determine element type for: ${JSON.stringify(element)}`)
}

const isSensor = (element: CompanyEntity): boolean => {
  return element.sensorType !== undefined
}

const isEquipment = (element: CompanyEntity): boolean => {
  return element.sensorType === undefined && element.status !== undefined
}

const isArea = (element: CompanyEntity): boolean => {
  return element.parentId !== null
}

const isFacility = (element: CompanyEntity): boolean => {
  return element.parentId === null
}
