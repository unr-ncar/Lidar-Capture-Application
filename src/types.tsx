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
    intersection_center: {
        latitude: number;
        longitude: number;
    }
}
export type RecordingOperation = 'start' | 'stop';
export type RecordingFormat = 'pcap' | 'ros';
export interface LidarSelection_t {
    selectedFormats: Array<RecordingFormat>
    item: LidarMetadata_t;
}

/* === LIDAR SERVICES STATUS - GRAPHQL === */
export interface PcapService_t {
    up: boolean;
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
export interface RosService_t {
    up: boolean;
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
export interface ServicesStatusInformation_t {
    crossStreet: string;
    street: string;
    siteId: number;
    pcapService: PcapService_t & Array<PcapService_t>;
    rosService: RosService_t & Array<RosService_t>;
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

/* === STATUS - GRAPHQL === */
export type StatusResponse_t = LidarServicesStatusResponse_t & SiteStorageStatusResponse_t

/* === STATUS METADATA - GRAPHQL === */
export interface StatusMetadata_t {
    crossStreet: string;
    street: string;
    siteId: number;
    pcapServiceStatus: PcapService_t;
    rosServiceStatus: RosService_t;
    edgeStorageStatus: StorageInformation_t | undefined;
}

export interface StatusMetadataComposite_t {
    crossStreet: string;
    street: string;
    siteId: number;
    pcapServiceStatus: Array<PcapService_t>;
    rosServiceStatus: Array<RosService_t>;
    edgeStorageStatus: StorageInformation_t | undefined;
}

/* === GENERALIZED SERVICE STATUS LABELS === */
export type StorageStatusLabel_t = "stable" | "critical" | "unstable" | "error";
export type SensorStatusLabel_t = "ready" | "unavailable" | "recording" | "error";
export type StatusLabel_t = StorageStatusLabel_t | SensorStatusLabel_t;

/* === GATEWAY CONFIGURATION === */
export interface GatewayConfiguration_t {
    gatewayPath: string;
    metadataServicePort: number;
    graphqlServicePort: number;
    rosRecordingServicePort: number;
    pcapRecordingServicePort: number;
    fileServicePort: number;
    clusterWebServerPort: number;
}

/* === RECORDING SERVICES - REST === */
export interface RecordingServiceResponse_t {
    message: string;
    success: boolean;
}

/* === FILE SERVICE - REST */
export interface FileServiceRequest_t {
    lidar_id: number;
    site_id?: number;
    deployment_id?: number;
    state?: string;
    city?: string;
    street?: string;
    cross_street?: string;
    type?: string;
    corner?: string;
    file_size?: number;
    time?: string;
    date?: string;
    datetime: string;
}

export interface DatabaseMetadata_t {
    lidar_id: string;
    site_id: string;
    deployment_id: string;
    state: string;
    city: string;
    street: string;
    crossstreet: string;
    type: string;
    corner: string;
    file_size: string;
    filename: string;
    path: string;
    time: string;
    date: string;
    datetime: number;
}

export interface DatabaseMetadataResponse_t {
    items: Array<DatabaseMetadata_t>;
    total: number;
    page: number;
    size: number;
    pages: number;
}