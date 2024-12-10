import { MapContainer, TileLayer, useMap } from 'react-leaflet'

export default function MapView() {
    return (
        <div className='relative flex flex-col w-full max-h-full h-full'>
            <div className='absolute inline-flex overflow-x-auto w-full top-0 left-0 gap-2 z-50 p-2'>
            </div>
            <MapContainer className='z-0 w-full h-full' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </MapContainer>
        </div>
    )
}