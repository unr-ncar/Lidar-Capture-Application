import {StorageInformation_t} from "../../types.tsx";
import {ServiceWidget} from "./ServiceWidget.tsx";
import {CircleStackIcon} from "@heroicons/react/20/solid";
import useStorageStatusLabel from "../../hooks/useStorageStatusLabel.tsx";

export function StorageServiceWidget(props: StorageInformation_t) {

    const status = useStorageStatusLabel(props);

    const { usedSpace, totalSpace} = props;
    const usagePercentage = ((usedSpace / totalSpace)*100).toFixed(0)

    if (status === "error") {
        return (
            <ServiceWidget serviceIcon={<CircleStackIcon />} serviceLabel="DATA USAGE" status={status} />
        )
    }

    return (
        <ServiceWidget serviceIcon={<CircleStackIcon />} serviceLabel="DATA USAGE" dataValue={`${usagePercentage}%`} status={status} />
    )

}