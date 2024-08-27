import { MdOutlineRouter, MdWifiTethering } from 'react-icons/md'
import useUnitContext from '../../../hooks/use-company-context'
import { mergeClasses } from '../../../utils/merge-classes'
import ProductImage from '../../../assets/images/product-image.png'
import { DeviceInfoProps, HeaderDataProps, UnitContextType } from './types'

const HeaderData = ({ name }: HeaderDataProps) => (
  <header className="px-4 py-3 border-b border-card">
    <h3 className="text-gray-950 font-semibold text-lg uppercase">{name}</h3>
  </header>
)

const EquipmentInfo = () => (
  <div className="py-6">
    <h4 className="text-gray-950 font-semibold text-base mb-2">Tipo de Equipamento</h4>
    <span className="font-normal text-gray-500">Motor Elétrico (Trifásico)</span>
  </div>
)

const Responsibilities = () => (
  <div className="py-6 border-t border-card flex-1">
    <h4 className="text-gray-950 font-semibold text-base mb-2">Responsáveis</h4>
    <div className="flex gap-2 items-center">
      <span className="w-6 h-6 border rounded-full flex items-center justify-center bg-blue-500 text-xs text-white">
        E
      </span>
      <span className="font-normal text-gray-500">Elétrica</span>
    </div>
  </div>
)

const DeviceInfo = ({ title, icon, value }: DeviceInfoProps) => (
  <div className="flex-1">
    <h4 className="text-gray-950 font-semibold text-base mb-2">{title}</h4>
    <div className="flex gap-2 items-center">
      {icon}
      <span className="font-normal text-gray-500">{value}</span>
    </div>
  </div>
)

const ComponentData = () => {
  const { activeAsset } = useUnitContext() as UnitContextType

  return (
    <section
      className={mergeClasses('flex-[2] border rounded border-card', {
        invisible: !activeAsset,
      })}
    >
      <HeaderData name={activeAsset?.name} />
      <main className="p-6 flex flex-col gap-6">
        <section className="flex items-center gap-6">
          <img src={ProductImage} alt="Image Gear" />
          <div className="flex flex-col w-full">
            <EquipmentInfo />
            <Responsibilities />
          </div>
        </section>
        <section className="flex border-t border-card py-4">
          <DeviceInfo
            title="Sensor"
            icon={<MdWifiTethering size={20} className="text-blue-500" />}
            value={activeAsset?.sensorId}
          />
          <DeviceInfo
            title="Receptor"
            icon={<MdOutlineRouter size={20} className="text-blue-500" />}
            value={activeAsset?.gatewayId}
          />
        </section>
      </main>
    </section>
  )
}

export default ComponentData
