import {CircleMarker} from "react-leaflet";
import {LatLngTuple, PathOptions} from "leaflet";

export function FileOriginMarker(props: {center: LatLngTuple}) {

    const bluePath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#2563eb',
        fillColor: '#60a5fa',
        fillOpacity: 0.75
    }

    return <CircleMarker radius={7} pathOptions={bluePath} center={props.center} />
}