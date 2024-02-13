import {useQuery} from "@tanstack/react-query";
import {LidarMetadata_t} from "../../../api/rest.tsx";
import requestLidarMetadata from "../../../api/rest.lidarMetadata.tsx";
import {useParams} from "react-router-dom";

export default function MetadataLidar() {

    const {lidar_id} = useParams();

    const {data, isPending, error} = useQuery({
        queryKey: ['lidar_metadata'],
        queryFn: async (): Promise<LidarMetadata_t> => requestLidarMetadata('http://134.197.75.31:31538', Number(lidar_id))
    })

    if (isPending) return  <p>Loading...</p>
    if (error) return <p>Error Occurred...{error.message}</p>
    console.log(data)

    return (
        <p>
            MetadataSite
        </p>
    )
}