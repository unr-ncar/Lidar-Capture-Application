import {LidarMetadata_t, RecordingFormat, RecordingOperation} from "../types.tsx";
import {Checkbox} from "@headlessui/react";
import {useStatus} from "../hooks/useStatus.tsx";
import {Tag} from "./Tag.tsx";
import useSensorStatusLabel from "../hooks/useSensorStatusLabel.tsx";
import useStorageStatusLabel from "../hooks/useStorageStatusLabel.tsx";
import {ExclamationCircleIcon, InformationCircleIcon} from "@heroicons/react/16/solid";
import {NavLink, useNavigate} from "react-router-dom";
import {ReactElement, useMemo} from "react";
import SensorStatusLoadingFlag from "./flag/SensorStatusLoadingFlag.tsx";
import Toast from "./Toast.tsx";
import AddSensorSelectionFlag from "./flag/AddSensorSelectionFlag.tsx";
import RemoveSensorSelectionFlag from "./flag/RemoveSensorSelectionFlag.tsx";
import SensorDisabledFlag from "./flag/SensorDisabledFlag.tsx";

export interface SensorSelectionItemProps_t {
    selected: boolean;
    format: RecordingFormat;
    toggleFunction: () => void;
    lidarMetadata: LidarMetadata_t;
    operation: RecordingOperation;
    storageStatusOverride?: boolean;
    sensorStatusOverride?: boolean;
}

export function SensorSelectionItem({
                                        selected,
                                        toggleFunction,
                                        format,
                                        operation,
                                        lidarMetadata,
                                        storageStatusOverride,
                                        sensorStatusOverride
                                    }: SensorSelectionItemProps_t) {

    const navigate = useNavigate();
    const {lidar_id, site_id, street, cross_street, corner} = lidarMetadata;
    const {isPending: statusPending, data: status} = useStatus({
        siteId: Number(site_id),
        lidarId: Number(lidar_id)
    })
    const sensorStatus = useSensorStatusLabel(statusPending ? undefined : format === "ros" ? status!.rosServiceStatus : status!.pcapServiceStatus)
    const storageStatus = useStorageStatusLabel(statusPending ? undefined : status!.edgeStorageStatus)

    const sensorStatusSelectionDisable = useMemo<boolean>(() => {

        if (sensorStatusOverride) return false
        if (operation === 'start' && sensorStatus === 'ready') return false
        if (operation === 'stop' && sensorStatus === 'recording') return false

        return true

    }, [operation, sensorStatus, sensorStatusOverride])

    const storageStatusSelectionDisable = useMemo<boolean>(() => {

        if (storageStatusOverride) return false
        if (operation === 'start' && storageStatus === 'stable') return false
        if (operation === 'start' && storageStatus === 'critical') return false
        if (operation === 'stop') return false

        return true;

    }, [operation, storageStatus, storageStatusOverride])


    const selectionStatusFlag: ReactElement = useMemo<ReactElement>(() => {

        if (!sensorStatusSelectionDisable && !storageStatusSelectionDisable) {
            if (selected) return <RemoveSensorSelectionFlag />
            else return <AddSensorSelectionFlag />
        } else {
            if (statusPending) return <SensorStatusLoadingFlag />
            else if (sensorStatusSelectionDisable || storageStatusSelectionDisable) {
                return <SensorDisabledFlag />
            } else {
                if (selected) return <RemoveSensorSelectionFlag />
                else return <AddSensorSelectionFlag />
            }
        }

    }, [selected, sensorStatusSelectionDisable, statusPending, storageStatusSelectionDisable])

    const navigateSensorMetadata = () => {
        navigate(`/metadata/sensor/${lidarMetadata.site_id}/${lidarMetadata.lidar_id}`)
    }

    return (
        <Checkbox disabled={sensorStatusSelectionDisable || storageStatusSelectionDisable}
                  className={`group ${statusPending ? 'hover:data-[disabled]:cursor-wait' : 'hover:data-[disabled]:cursor-not-allowed'} flex flex-row items-center gap-3 bg-neutral-100 rounded p-4`}
                  checked={selected} onChange={toggleFunction}>
            <div className='flex flex-row gap-4 justify-between items-center w-full'>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row items-center gap-2'>
                        <>
                            {selectionStatusFlag}
                        </>
                        <p className='font-medium line-clamp-2 leading-tight'>
                            {street} &#x2022; {cross_street} ({corner})
                        </p>
                    </div>
                    {
                        (sensorStatusSelectionDisable || storageStatusSelectionDisable) && (
                            <div className='flex flex-col gap-1'>
                                {
                                    sensorStatusSelectionDisable && sensorStatus === 'recording' ? (
                                        <Toast type='info'
                                               hyperlink={`/metadata/sensor/${lidarMetadata.site_id}/${lidarMetadata.lidar_id}`}>
                                            Sensor is currently recording.
                                        </Toast>
                                    ) : (
                                        <Toast type='warning'
                                               label='Storage'
                                               hyperlink={`/metadata/sensor/${lidarMetadata.site_id}/${lidarMetadata.lidar_id}`}>
                                            Sensor is experiencing issues. Recording is disabled.
                                        </Toast>
                                    )
                                }
                                {
                                    storageStatusSelectionDisable && (
                                        <Toast label='Sensor' hyperlink={`/metadata/site/${lidarMetadata.site_id}`} type='warning'>
                                            Site computer is currently experiencing issues. Recording is disabled.
                                        </Toast>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <Tag icon={<InformationCircleIcon/>} label="LIDAR ID" value={String(lidar_id)}
                     onClick={() => navigateSensorMetadata()}/>
            </div>
        </Checkbox>
    )
}