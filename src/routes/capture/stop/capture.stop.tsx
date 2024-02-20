import {ChangeEvent, useState} from "react";
import {DataFormat_t, LidarSelection_t} from "../types.capture.tsx";
import useLidarMetadataList from "../../../hooks/useLidarMetadataList.tsx";
import LidarStopSelection from "../../../components/lidarStopSelection.tsx";
import PaginationBar from "../../../components/paginationBar.tsx";
import useJobsList from "../../../hooks/useJobList.tsx";
import Modal from "../../../components/modal.tsx";
import JobItem from "../../../components/jobItem.tsx";

export default function CaptureStop() {

    const [formatType, setFormatType] = useState<DataFormat_t>('pcap')
    const {isLoading, error, state, toggleLidarSelection, resetLidarSelections, setPage} = useLidarMetadataList()
    const [open, setOpen] = useState<boolean>(false)
    const list: Array<LidarSelection_t> = useJobsList(['lidar_metadata_list', state?.page || 1])

    const handleFormatType = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-expect-error Standard event for HTMLInputElements
        setFormatType(event.target.value)
        resetLidarSelections()
    }

    const handleJobModal = () => {
        setOpen(!open)
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
            <hr/>
            <button onClick={handleJobModal}>Stop Job</button>
            {state && <PaginationBar window_size={state?.size} total_items={state?.total} current_page={state?.page}
                                     setter={setPage}/>}
            <Modal open={open} onOpenChange={handleJobModal}>
                <div>
                    <div>
                        {
                            list.map((job: LidarSelection_t) => {
                                return <JobItem key={job.lidar.lidar_id} lidar={job.lidar} format={formatType}
                                                operation='stop'/>
                            })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}