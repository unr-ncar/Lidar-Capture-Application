import {ChangeEvent, useState} from "react";
import {DataFormat_t, LidarSelection_t} from "../types.capture.tsx";
import useLidarMetadataSelectionList from "../../../hooks/useLidarMetadataSelectionList.tsx";
import LidarStopSelection from "../../../components/lidarStopSelection.tsx";

export default function CaptureStop() {

    const [formatType, setFormatType] = useState<DataFormat_t>('pcap')
    const {isLoading, error, state, toggleLidarSelection, resetLidarSelections} = useLidarMetadataSelectionList()

    const handleFormatType = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-expect-error Standard event for HTMLInputElements
        setFormatType(event.target.value)
        resetLidarSelections()
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error occurred...</p>

    return (
        <div>
            <div>
                <label>
                    PCAP
                    <input onChange={handleFormatType} checked={formatType === 'pcap'} type='radio' name='format'
                           value='pcap'/>
                </label>
                <label>
                    ROS
                    <input onChange={handleFormatType} checked={formatType === 'ros'} type='radio' name='format'
                           value='ros'/>
                </label>
            </div>
            <div>
                {
                    state?.items.map((selection: LidarSelection_t) => {
                        return <LidarStopSelection key={selection.lidar.lidar_id}
                                                    currentFormatSelection={formatType}
                                                    onChangeHandler={() => toggleLidarSelection(selection.lidar.lidar_id, formatType)} {...selection}/>
                    })
                }
            </div>
        </div>
    )
}