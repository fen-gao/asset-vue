export interface Asset {
  name: string
  sensorId: string
  gatewayId: string
}

export interface UnitContextType {
  activeAsset: Asset | null
}

export interface HeaderDataProps {
  name: string | undefined
}

export interface DeviceInfoProps {
  title: string
  icon: React.ReactNode
  value: string | undefined
}
