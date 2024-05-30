import {CircleMarker} from "react-leaflet";
import {StatusLabel_t} from "../../types.tsx";
import {PathOptions} from "leaflet";

export interface StatusMarkerProps_t {
    status: StatusLabel_t
    longitude: number;
    latitude: number;
    onClick?: () => void;
}
export function StatusMarker({status, longitude, latitude, onClick}: StatusMarkerProps_t) {

    const greenPath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#16a34a',
        fillColor: '#4ade80',
        fillOpacity: 0.75
    }

    const yellowPath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#ca8a04',
        fillColor: '#facc15',
        fillOpacity: 0.75
    }

    const redPath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#dc2626',
        fillColor: '#f87171',
        fillOpacity: 0.75
    }

    const grayPath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#3f3f46',
        fillColor: '#a1a1aa',
        fillOpacity: 0.75
    }

    const pathColor = (): PathOptions => {
        if (status === 'stable' || status === 'ready') {
            return greenPath
        } else if (status === 'critical' || status === 'unavailable') {
            return yellowPath
        } else if (status === 'unstable' || status === 'error') {
            return redPath
        } else {
            return grayPath
        }
    }

    if (onClick) return <CircleMarker eventHandlers={{click: () => onClick}} center={[latitude, longitude]} radius={7} pathOptions={pathColor()} />

    return <CircleMarker center={[latitude, longitude]} radius={7} pathOptions={pathColor()} />

}