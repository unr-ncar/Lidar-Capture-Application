import {useState} from "react";
import {
    requestStartPcapService,
    requestStartRosService,
    requestStopPcapService,
    requestStopRosService
} from "../api/rest.recordingService.tsx"

export default function useRecordingService(lidar_id: number) {

    const [error, setError] = useState<Error | null>(null)

    const startPcapService = () => {
        setError(null)
        requestStartPcapService('http://134.197.75.31:31538', lidar_id).catch((error) => {
            if (error.response) {
                setError(error)
            }
        })
    }

    const stopPcapService = () => {
        setError(null)
        requestStopPcapService('http://134.197.75.31:31538', lidar_id).catch((error) => {
            if (error.response) {
                setError(error)
            }
        })
    }

    const startRosService = () => {
        setError(null)
        requestStartRosService('http://134.197.75.31:31538', lidar_id).catch((error) => {
            if (error.response) {
                setError(error)
            }
        })
    }

    const stopRosService = () => {
        setError(null)
        requestStopRosService('http://134.197.75.31:31538', lidar_id).catch((error) => {
            if (error.response) {
                setError(error)
            }
        })
    }

    return {
        startPcapService: startPcapService,
        stopPcapService: stopPcapService,
        startRosService: startRosService,
        stopRosService: stopRosService,
        error: error

    }


}