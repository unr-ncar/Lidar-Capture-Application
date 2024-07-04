import {CircleMarker, CircleMarkerProps} from "react-leaflet";
import {PathOptions} from "leaflet";

export function FileOriginMarker(props: CircleMarkerProps) {

    const bluePath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#2563eb',
        fillColor: '#60a5fa',
        fillOpacity: 0.75
    }

    return <CircleMarker radius={7} pathOptions={bluePath} {...props} />
}