import {LidarMetadata_t} from "../api/rest.tsx";
import {DataFormat_t} from "../routes/capture/types.capture.tsx";
import {Context, createContext, Dispatch, ReactElement, useReducer} from "react";

export interface service_activation_status_t {
    success: boolean | null;
    error: Error | null;
    message: string | null;
}
export interface service_activation_item_t {
    lidar: LidarMetadata_t;
    format: DataFormat_t;
    selected: boolean;
    status: service_activation_status_t
}
export type serviceActivationActions = {
    type: 'populate_activations',
    payload: {
        lidars: Array<LidarMetadata_t>;
        format: DataFormat_t;
    }
} | {
    type: 'toggle_activation',
    payload: {
        lidar: LidarMetadata_t;
    }
} | {
    type: 'reset_activations'
} | {
    type: 'update_activation_status'
    payload: {
        lidar: LidarMetadata_t;
        status: {
            success: boolean | null;
            error: Error | null;
            message: string | null;
        }
    }
}
function serviceActivationReducer(activations: Array<service_activation_item_t>, action: serviceActivationActions): Array<service_activation_item_t> {
    switch (action.type) {

        case 'populate_activations': {
            return action.payload.lidars.map((lidar: LidarMetadata_t): service_activation_item_t => {
                return {
                    lidar: lidar,
                    format: action.payload.format,
                    selected: false,
                    status: {
                        success: false,
                        error: null,
                        message: null
                    }
                }
            })
        }

        case 'toggle_activation': {
            return activations.filter((activation: service_activation_item_t): service_activation_item_t => {
                if (activation.lidar.lidar_id !== action.payload.lidar.lidar_id) return activation
                return {
                    ...activation,
                    selected: !activation.selected
                }
            })
        }

        case 'reset_activations': {
            return []
        }

        case 'update_activation_status' : {
            return activations.filter((activation: service_activation_item_t): service_activation_item_t => {
                if (activation.lidar.lidar_id !== action.payload.lidar.lidar_id) return activation
                return {
                    ...activation,
                    status: action.payload.status
                }
            })
        }
    }
}

export interface ActivationContext_t {
    state?: Array<service_activation_item_t>;
    dispatch?: Dispatch<serviceActivationActions>
}
export const ActivationContext: Context<ActivationContext_t> = createContext<ActivationContext_t>({state: undefined, dispatch: undefined})

export const ActivationContextProvider = ({element}: {element: ReactElement}) => {

    const [activation, dispatchActivation] = useReducer(serviceActivationReducer, [])

    return (
        <ActivationContext.Provider value={{state: activation, dispatch: dispatchActivation}}>
            { element }
        </ActivationContext.Provider>
    )
}
