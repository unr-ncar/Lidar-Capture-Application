import {LidarSelection_t} from "../types.tsx";
import useStatus from "../hooks/useStatus.tsx";
import useLidarSelections from "../hooks/useLidarSelections.tsx";
import {CircleMarker} from "react-leaflet";
import {useNavigate} from "react-router-dom";

export interface LidarSelectionMarkerProps_t {
    lidarSelection: LidarSelection_t;
}
export default function LidarSelectionMarker({lidarSelection}: LidarSelectionMarkerProps_t) {

    const {lidar_id, site_id, longitude, latitude} = lidarSelection.item
    const {isPending, error, data} = useStatus(lidar_id, site_id)
    const toggleSelection = useLidarSelections((state) => state.toggleSelection)
    const navigate = useNavigate()

    const gotoLidarMetadata = () => {
        navigate(`lidar/${lidar_id}`)
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

    const selectedPath = {
        stroke: true,
        fill: true,
        color: '#2563eb',
        fillColor: '#60a5fa',
        fillOpacity: 0.75
    }

    const unselectedPath = {
        stroke: true,
        fill: true,
        color: '#3f3f46',
        fillColor: '#a1a1aa',
        fillOpacity: 0.75
    }

    if (isPending) return null
    if (error) return null
    if (data.pcapServiceStatus.isRecording || data.rosServiceStatus.isRecording) return <CircleMarker eventHandlers={{click: () => gotoLidarMetadata()}} center={[longitude, latitude]} radius={7} pathOptions={recordingPath} />
    if (!data.pcapServiceStatus.up || !data.rosServiceStatus.up) return <CircleMarker eventHandlers={{click: () => gotoLidarMetadata()}} center={[longitude, latitude]} radius={7} pathOptions={serviceRequiresAttention} />

    return <CircleMarker eventHandlers={{click: () => toggleSelection(lidar_id)}} center={[longitude, latitude]} radius={7} pathOptions={lidarSelection.selected ? selectedPath : unselectedPath} />

}