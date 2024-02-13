export interface status_information_response_t {
    getStatus?: Array<status_information_t>
    getSystemInfo?: Array<storage_information_t>
}

export interface status_information_t {
    pcapService?: Array<pcap_service_t>;
    rosService?: Array<ros_service_t>;
    ip?: string;
    siteId?: number;
    state?: string;
    city?: string;
    street?: string;
    crossStreet?: string;
}

export interface pcap_service_t {
    isRecording?: boolean;
    start?: number;
    elapsed?: number;
    fileInformation?: file_information_t;
    lidarId?: number;
    corner?: string;
}

export interface ros_service_t {
    isRecording?: boolean;
    start?: number;
    elapsed?: number;
    fileInformation?: file_information_t;
    lidarId?: number;
    corner?: string;
}

export interface file_information_t {
    fileName?: string;
    fileSize?: number;
    creationTime?: number;
    lastModified?: number;
}

export interface storage_information_t {
    totalSpace?: number;
    usedSpace?: number;
    freeSpace?: number;
    host?: string;
    siteId?: number;
}