import {PcapService_t, RosService_t, StatusMetadataComposite_t} from "../types.tsx";
import {Tag} from "./Tag.tsx";
import {StorageServiceWidget} from "./service_widget/StorageServiceWidget.tsx";
import {RosServiceWidget} from "./service_widget/RosServiceWidget.tsx";
import {PcapServiceWidget} from "./service_widget/PcapServiceWidget.tsx";
import {useNavigate} from "react-router-dom";
import {InformationCircleIcon} from "@heroicons/react/16/solid";

export function SiteStatusItem({street, crossStreet, siteId, edgeStorageStatus, pcapServiceStatus, rosServiceStatus }: StatusMetadataComposite_t) {

    const navigate = useNavigate()
    const rosServiceItems = rosServiceStatus.map((serviceItem: RosService_t) => {
        return <RosServiceWidget key={serviceItem.lidarId} {...serviceItem} />
    })
    const pcapServiceItems = pcapServiceStatus.map((serviceItem: PcapService_t) => {
        return <PcapServiceWidget key={serviceItem.lidarId} {...serviceItem} />
    })
    const navigateSiteMetadata = () => {
        navigate(`/metadata/site/${siteId}`)
    }

    return (
        <div className='bg-neutral-100 rounded p-4 flex flex-col gap-4'>
            <div className='flex flex-row items-center justify-between '>
                <p className='font-medium'>
                    {street} &#x2022; {crossStreet}
                </p>
                <Tag icon={<InformationCircleIcon />} label="SITE ID" value={String(siteId)} onClick={() => navigateSiteMetadata()} />
            </div>
            <div className='flex flex-col gap-2'>
                <StorageServiceWidget {...edgeStorageStatus!} />
                <>
                    { rosServiceItems }
                </>
                <>
                    { pcapServiceItems }
                </>
            </div>
        </div>
    )

}