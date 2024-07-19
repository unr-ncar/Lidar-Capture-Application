import {CircleMarker} from "react-leaflet";
import {LatLngTuple, PathOptions} from "leaflet";

export function GeographicMarker(props: {center: LatLngTuple}) {

    const grayPath: PathOptions = {
        stroke: true,
        fill: true,
        color: '#3f3f46',
        fillColor: '#a1a1aa',
        fillOpacity: 0.75
    }

    return <CircleMarker radius={7} pathOptions={grayPath} center={props.center} />
}