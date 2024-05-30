import {StorageInformation_t} from "../../types.tsx";
import useStorageStatusLabel from "../../hooks/useStorageStatusLabel.tsx";
import {StatusMarker} from "./StatusMarker.tsx";

export interface SiteStatusMarkerProps_t {
    longitude: number;
    latitude: number;
    siteStatus: StorageInformation_t | undefined
}
export function SiteStatusMarker({longitude, latitude, siteStatus}: SiteStatusMarkerProps_t) {

    const status = useStorageStatusLabel({totalSpace: siteStatus?.totalSpace, usedSpace: siteStatus?.usedSpace});
    return <StatusMarker status={status} longitude={longitude} latitude={latitude} />

}