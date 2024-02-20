import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DataFormat_t} from "../types.capture.tsx";
import Modal from "../../../components/modal.tsx";
import useLidarMetadataList from "../../../hooks/useLidarMetadataList.tsx";
import useActivationContext from "../../../hooks/useActivationContext.tsx";
import {QueryStatus} from "@tanstack/react-query";

export default function CaptureStart() {

    const [formatType, setFormatType] = useState<DataFormat_t>('pcap')
    const [open, setOpen] = useState<boolean>(false)
    const { populateActivations } = useActivationContext()
    const {state, status} = useLidarMetadataList()

    const handleFormatType = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-expect-error Standard event for HTMLInputElements
        setFormatType(event.target.value)
    }

    const handleJobModal = () => {
        setOpen(!open)
    }


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
            <hr />
            <button onClick={handleJobModal}>Start Job</button>
            <Modal open={open} onOpenChange={handleJobModal}>
                <p>
                    Testing
                </p>
            </Modal>
        </div>
    )
}
