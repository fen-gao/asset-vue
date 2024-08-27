import { CompanyEntity } from './compose-tree'

/**
 * Represents the possible types of elements in the component hierarchy.
 */
export type HierarchyElementType = 'facility' | 'area' | 'equipment' | 'sensor'

/**
 * Determines the type of an element in the component hierarchy.
 *
 * @param element - The component hierarchy element to analyze
 * @returns The type of the element
 * @throws Error if the element doesn't match any known type
 */
export function determineElementType(element: CompanyEntity): HierarchyElementType {
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

/**
 * Checks if the element is a sensor.
 * @param element - The component hierarchy element to check
 * @returns True if the element is a sensor, false otherwise
 */
function isSensor(element: CompanyEntity): boolean {
  return element.sensorType !== undefined
}

/**
 * Checks if the element is an equipment.
 * @param element - The component hierarchy element to check
 * @returns True if the element is an equipment, false otherwise
 */
function isEquipment(element: CompanyEntity): boolean {
  return element.sensorType === undefined && element.status !== undefined
}

/**
 * Checks if the element is an area.
 * @param element - The component hierarchy element to check
 * @returns True if the element is an area, false otherwise
 */
function isArea(element: CompanyEntity): boolean {
  return element.parentId !== null
}

/**
 * Checks if the element is a facility.
 * @param element - The component hierarchy element to check
 * @returns True if the element is a facility, false otherwise
 */
function isFacility(element: CompanyEntity): boolean {
  return element.parentId === null
}
