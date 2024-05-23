import {LidarMetadata_t} from "../types.tsx";
import useStatus from "../hooks/useStatus.tsx";
import {CircleMarker} from "react-leaflet";
import {useNavigate} from "react-router-dom";

export interface LidarMarkerProps_t {
    lidarItem: LidarMetadata_t
}
export default function LidarMarker({lidarItem}: LidarMarkerProps_t) {

    const {lidar_id, site_id, longitude, latitude} = lidarItem
    const {isPending, error, data} = useStatus(lidar_id, site_id)
    const navigate = useNavigate()

    const gotoLidarMetadata = () => {
        navigate(`/lidar/${lidar_id}`)
    }

    const serviceRequiresAttention = {
        stroke: true,
        fill: true,
        color: '#ca8a04',
        fillColor: '#facc15',
        fillOpacity: 0.75
    }

    const recordingPath = {
        stroke: true,
        fill: true,
        color: '#dc2626',
        fillColor: '#f87171',
        fillOpacity: 0.75
    }

    const idlePath = {
        stroke: true,
        fill: true,
        color: '#3f3f46',
        fillColor: '#a1a1aa',
        fillOpacity: 0.75
    }

    if (isPending) return null
    if (error) return null
    if (data.pcapServiceStatus.isRecording || data.rosServiceStatus.isRecording) return <CircleMarker eventHandlers={{click: () => gotoLidarMetadata()}} center={[latitude, longitude]} radius={7} pathOptions={recordingPath} />
    return <CircleMarker eventHandlers={{click: () => gotoLidarMetadata()}} center={[latitude, longitude]} radius={7} pathOptions={idlePath} />

}