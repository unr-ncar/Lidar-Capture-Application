import {LidarMetadata_t, RecordingFormat, RecordingOperation, StatusMetadata_t} from "../types.tsx";

export interface SensorSelectionItemProps_t {
    format: RecordingFormat;
    operation: RecordingOperation;
    lidarMetadata: LidarMetadata_t;
    statusMetadata: StatusMetadata_t;
}
export function SensorSelectionItem({format, operation, lidarMetadata, statusMetadata}: SensorSelectionItemProps_t) {
    return (
        <div>
            <p>
                SensorSelectionItem
            </p>
        </div>
    )
}