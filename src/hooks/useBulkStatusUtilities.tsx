import {LidarMetadata_t, PcapService_t, RosService_t, StatusMetadata_t, StatusMetadataComposite_t} from "../types.tsx";

export default function useBulkStatusUtilities(lidarMetadataList: Array<LidarMetadata_t>, bulkStatusArray: Array<StatusMetadataComposite_t>) {
    const getSiteIds = (): Array<number> => {
        if (lidarMetadataList === undefined) return []
        const siteIds = lidarMetadataList.map((site: LidarMetadata_t) => {
            return site.site_id
        })
        return [...new Set(siteIds)]
    }

    const getLidarStatus = (lidar: LidarMetadata_t): StatusMetadata_t => {
        const status = bulkStatusArray.find((statusMetadata: StatusMetadataComposite_t) => statusMetadata.siteId === lidar.site_id)
        return {
            pcapServiceStatus: status!.pcapServiceStatus.find((service: PcapService_t) => service.lidarId === lidar.lidar_id),
            rosServiceStatus: status!.rosServiceStatus.find((service: RosService_t) => service.lidarId === lidar.lidar_id),
            edgeStorageStatus: status!.edgeStorageStatus,
            street: status!.street,
            crossStreet: status!.crossStreet,
            siteId: status!.siteId
        } as StatusMetadata_t
    }

    return {
        getSiteIds: getSiteIds,
        getLidarStatus: getLidarStatus,
    }

}