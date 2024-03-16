import {UseMutateFunction} from "@tanstack/react-query";
/* === LIDAR METADATA - REST: /metadata === */
export interface LidarMetadataResponse_t {
    items: Array<LidarMetadata_t>;
    total: number;
    page: number;
    size: number;
    pages: number;
}
export interface LidarMetadata_t {
    lidar_id: number;
    site_id: number;
    deployment_id: number;
    state: string;
    city: string;
    street: string;
    cross_street: string;
    mqtt_topic: string;
    data_port: number;
    nmea_port: number;
    interface: string;
    front_direction: number;
    lidar_ip: string;
    ip: string;
    model: string;
    corner: string;
    longitude: number;
    latitude: number;
}
export type RecordingOperation = 'start' | 'stop';
export type RecordingFormat = 'pcap' | 'ros';
export interface LidarSelection_t {
    format: RecordingFormat;
    item: LidarMetadata_t;
    mutate?: UseMutateFunction;
    operation: RecordingOperation;
    selected: boolean;
}

/* === LIDAR SERVICES STATUS - GRAPHQL === */
export interface PcapService_t {
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
export interface RosService_t {
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
export interface ServicesStatusInformation_t {
    pcapService: Array<PcapService_t>;
    rosService: Array<RosService_t>;
}
export interface LidarServicesStatusResponse_t {
    getStatus: Array<ServicesStatusInformation_t>
}

/* === SITE STORAGE STATUS - GRAPHQL === */
export interface StorageInformation_t {
    totalSpace: number;
    usedSpace: number;
    freeSpace: number;
    host: string;
    siteId: number;
}
export interface SiteStorageStatusResponse_t {
    getSystemInfo: Array<StorageInformation_t>
}

/* === BULK STATUS - GRAPHQL === */
export type BulkStatusResponse_t = LidarServicesStatusResponse_t & SiteStorageStatusResponse_t

/* === GATEWAY CONFIGURATION === */
export interface GatewayConfiguration_t {
    gatewayPath: string;
    metadataServicePort: number;
    graphqlServicePort: number;
    rosRecordingServicePort: number;
    pcapRecordingServicePort: number;
}