import {MapContainer, TileLayer} from 'react-leaflet'
import {ReactElement} from "react";
export interface MapProps_t {
    className?: string;
    children?: ReactElement | Array<ReactElement>;
}
export function Map({className, children}: MapProps_t) {

    return (
        <MapContainer center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={true} zoomControl={false} className={`${className} w-full h-full rounded-lg shadow-lg`}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <>
                { children }
            </>
        </MapContainer>
    )

}