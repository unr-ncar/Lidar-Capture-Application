import {LidarMetadata_t, PcapService_t, RosService_t, StatusMetadata_t, StatusMetadataComposite_t} from "../types.tsx";

export default function(bulkStatusArray: Array<StatusMetadataComposite_t>, lidar: LidarMetadata_t): StatusMetadata_t {
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