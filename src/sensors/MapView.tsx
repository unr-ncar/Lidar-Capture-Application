import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import * as ScrollArea from "@radix-ui/react-scroll-area";

export default function MapView() {
    return (
        <div className='relative flex flex-col w-full max-h-full h-full'>
            <MapContainer className='z-0 w-full h-full' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </MapContainer>
            <ScrollArea.Root className='overflow-x-auto overflow-hidden w-full gap-2 z-50 p-2 h-20 bg-white/70 backdrop-blur'>
                <ScrollArea.Viewport className='absolute bottom-0 left-0 inline-flex flex-row items-center w-full'>
                <div className='border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center'>
                    <p className='text-sm font-semibold'>
                        Virginia St. & 8th St.
                    </p>
                    <p className='text-xs bg-black p-1 rounded font-medium w-min text-white leading-none'>
                        SW
                    </p>
                </div>
                <div className='border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center'>
                    <p className='text-sm font-semibold'>
                        Virginia St. & 8th St.
                    </p>
                    <p className='text-xs bg-black p-1 rounded font-medium w-min text-white leading-none'>
                        SW
                    </p>
                </div>
                <div className='border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center'>
                    <p className='text-sm font-semibold'>
                        Virginia St. & 8th St.
                    </p>
                    <p className='text-xs bg-black p-1 rounded font-medium w-min text-white leading-none'>
                        SW
                    </p>
                </div>
                <div className='border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center'>
                    <p className='text-sm font-semibold'>
                        Virginia St. & 8th St.
                    </p>
                    <p className='text-xs bg-black p-1 rounded font-medium w-min text-white leading-none'>
                        SW
                    </p>
                </div>
                </ScrollArea.Viewport>
                <ScrollArea.ScrollAreaScrollbar orientation='horizontal' className='h-1 w-full bg-black/20 rounded-full'>
                    <ScrollArea.Thumb className='h-full w-1 bg-black/50 rounded-full' />S
                </ScrollArea.ScrollAreaScrollbar>
            </ScrollArea.Root>
        </div>
    )
}