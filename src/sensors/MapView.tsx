import { MapContainer, TileLayer, useMap } from "react-leaflet";

export default function MapView() {
  return (
    <div className="relative flex flex-col w-full max-h-full h-full">
      <MapContainer
        className="z-0 w-full h-full"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="absolute bottom-0 left-0 p-4 bg-white/70 backdrop-blur w-full inline-flex flex-row gap-4 overflow-x-auto">
        <div className="border-2 px-2.5 py-1.5 rounded inline-flex items-center gap-1.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
        <div className="border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
        <div className="border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
        <div className="border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
        <div className="border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
        <div className="border-2 px-2 py-1 h-min rounded flex flex-col gap-0.5 justify-center min-w-fit">
          <p className="text-sm font-semibold">Virginia St. & 8th St.</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none">
            SW
          </p>
        </div>
      </div>
    </div>
  );
}
