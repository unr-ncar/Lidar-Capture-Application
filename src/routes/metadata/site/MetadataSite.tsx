import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {LidarMetadata_t} from "../../../api/rest.tsx";
import requestSiteMetadata from "../../../api/rest.siteMetadata.tsx";

export default function MetadataSite() {

    const {site_id} = useParams();

    const {data, isPending, error} = useQuery({
        queryKey: ['site_metadata', Number(site_id)],
        queryFn: async (): Promise<Array<LidarMetadata_t>> => requestSiteMetadata('http://134.197.75.31:31538', Number(site_id))
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