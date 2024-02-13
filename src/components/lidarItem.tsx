import {LidarMetadata_t} from "../api/rest.tsx";
import {useNavigate} from "react-router-dom";

export default function LidarItem({lidar_id, site_id, state, city, cross_street, street, corner}: LidarMetadata_t) {

    const navigate = useNavigate();

    const handleSiteMetadataButton = () => {
        navigate(`/site/${site_id}`)
    }
    const handleLidarMetadataButton = () => {
        navigate(`/lidar/${lidar_id}`)
    }

    return (
        <div className='bg-neutral-100 rounded flex flex-row flex-wrap gap-1 max-w-[300px] p-3 [&>p]:bg-neutral-200 [&>p]:px-2 [&>p]:rounded'>

            <p>
                LidarId: {lidar_id}
            </p>
            <p>
                SiteId: {site_id}
            </p>
            <p>
                Location: {city}, {state}
            </p>
            <p>
                Intersection: {street}, {cross_street}
            </p>
            <p>
                Corner: {corner}
            </p>
            <div className='flex gap-1'>
                <button className='bg-blue-300 px-1.5 py-0.5 text-sm rounded' onClick={handleSiteMetadataButton}>
                    View Site
                </button>
                <button className='bg-blue-300 px-1.5 py-0.5 text-sm rounded' onClick={handleLidarMetadataButton}>
                    View LIDAR
                </button>
            </div>
        </div>
    )
}