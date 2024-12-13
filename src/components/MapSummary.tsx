import useRecordingStatus from "../hooks/backend/graphqlService/useRecordingStatus";
import useLidarMetadata, {ILidarMetadataItem} from "../hooks/backend/metadataService/useLidarMetadata"
import { useCallback, useEffect } from "react";

export default function SensorSummary(props: {sensor: ILidarMetadataItem}) {

    const {lidar_id, cross_street, street, corner} = props.sensor;
    const {isPending, data, error} = useRecordingStatus([Number(lidar_id)], true)


    useEffect(() => {
        if (data) console.log(data)
    }, [data])

    // const lidarIds = useCallback(() => {
    //    console.log(data)
    //    if (data === undefined) return [];
    //    return data.items.filter((item: ILidarMetadataItem) => String(item.site_id) === String(siteId));
    //}, [data])


    return (
        <div className="border-2 border-neutral-300 px-2.5 py-1.5 h-10 rounded inline-flex items-center gap-x-4 justify-center min-w-fit">
          <p className="text-sm font-semibold">{street} & {cross_street}</p>
          <p className="text-xs bg-black p-1 rounded font-medium w-min text-white leading-none h-min">
            {corner}
          </p>
        </div>
    )
}