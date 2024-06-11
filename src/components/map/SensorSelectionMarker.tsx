import {LidarMetadata_t, RecordingFormat, RecordingOperation} from "../../types.tsx";
import {CircleMarker} from "react-leaflet";

export interface SensorSelectionMarkerProps_t {
    format: RecordingFormat;
    operation: RecordingOperation;
    lidarMetadata: LidarMetadata_t;
}
export default function SensorSelectionMarkerProps_t({format, operation, lidarMetadata}: SensorSelectionMarkerProps_t) {
    return (
        <CircleMarker />
    )
}