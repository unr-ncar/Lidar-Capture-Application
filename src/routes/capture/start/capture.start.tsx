import {ChangeEvent, useState} from "react";
import {DataFormat_t, LidarSelection_t} from "../types.capture.tsx";
import LidarStartSelection from "../../../components/lidarStartSelection.tsx";
import useLidarMetadataSelectionList from "../../../hooks/useLidarMetadataSelectionList.tsx";
import PaginationBar from "../../../components/paginationBar.tsx";
import Modal from "../../../components/modal.tsx";
import useRecordingService from "../../../hooks/useRecordingService.tsx";
import JobItem from "../../../components/jobItem.tsx";

export default function CaptureStart() {

    const [formatType, setFormatType] = useState<DataFormat_t>('pcap')
    const {isLoading, error, state, toggleLidarSelection, resetLidarSelections, setPage} = useLidarMetadataSelectionList()
    const [open, setOpen] = useState<boolean>(false)
    const { jobList } = useRecordingService(['lidar_metadata_list', state?.page]);

    const handleFormatType = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-expect-error Standard event for HTMLInputElements
        setFormatType(event.target.value)
        resetLidarSelections()
    }

    const handleJobModal = () => {
        setOpen(!open)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error Occurred...</p>

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
                        return <LidarStartSelection key={selection.lidar.lidar_id}
                                                    currentFormatSelection={formatType}
                                                    onChangeHandler={() => toggleLidarSelection(selection.lidar.lidar_id, formatType)} {...selection}/>
                    })
                }
            </div>
            <hr />
            <button onClick={handleJobModal}>Start Job</button>
            <PaginationBar window_size={state?.size || 10} total_items={state?.total || 0} current_page={state?.page || 1} setter={setPage} />
            <Modal open={open} onOpenChange={handleJobModal}>
                <div>
                    { jobList().map((job: LidarSelection_t) => {
                        return <JobItem key={job.lidar.lidar_id} lidar={job.lidar} format={formatType} operation={'start'} />
                    })}
                </div>
            </Modal>
        </div>
    )
}
