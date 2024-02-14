export interface PcapService_response_t {
    message: string;
    success: boolean;
}

export interface RosService_response_t {
    message: string;
    success: boolean;
}

export interface LidarMetadata_response_t {
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