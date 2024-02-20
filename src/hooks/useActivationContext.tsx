import {LidarMetadata_t} from "../api/rest.tsx";
import {DataFormat_t} from "../routes/capture/types.capture.tsx";
import {useContext} from "react";
import {ActivationContext, service_activation_status_t} from "../contexts/ActivationContext.tsx";


const useActivationContext = () => {

    const { state, dispatch } = useContext(ActivationContext)

    if ((dispatch === undefined) || (state === undefined)) throw new Error('ActivationContext is not present')

    function populate(lidarItems: Array<LidarMetadata_t>, format: DataFormat_t) {
        dispatch?.({
            type: 'populate_activations',
            payload: {
                lidars: lidarItems,
                format: format
            }
        })
    }

    function toggle(lidar: LidarMetadata_t) {
        dispatch?.({
            type: 'toggle_activation',
            payload: {
                lidar: lidar
            }
        })
    }

    function reset() {
        dispatch?.({
            type: 'reset_activations'
        })
    }

    function updateStatus(lidar: LidarMetadata_t, status: service_activation_status_t) {
        dispatch?.({
            type: 'update_activation_status',
            payload: {
                lidar: lidar,
                status: status
            }
        })
    }

    return {
        populateActivations: populate,
        toggleActivation: toggle,
        resetActivations: reset,
        updateActivationStatus: updateStatus
    }
}

export default useActivationContext;

