import {StatusLabel_t} from "../../types.tsx";
import {ReactElement} from "react";
import {Link} from "react-router-dom";

export interface ServiceWidgetProps {
    className?: string;
    serviceIcon: ReactElement;
    serviceLabel: string;
    serviceLabelLink?: string;
    status: StatusLabel_t;
    dataValue?: string;
}

export function ServiceWidget({
                                  className,
                                  serviceLabel,
                                  serviceLabelLink,
                                  serviceIcon,
                                  status,
                                  dataValue
                              }: ServiceWidgetProps) {

    function backgroundColor() {
        if (status === 'stable' || status === 'ready') {
            return 'bg-green-600'
        } else if (status === 'critical' || status === 'unavailable') {
            return 'bg-yellow-600'
        } else if (status === 'unstable' || status === 'error') {
            return 'bg-red-600'
        } else {
            return 'bg-neutral-400'
        }
    }

    console.log(serviceLabel, status)

    return (
        <div
            className={`${className} ${backgroundColor()} flex flex-row justify-between p-2 rounded-md text-white items-center gap-2`}>
            <div className='flex flex-row items-center gap-2'>
                <div className='[&>*]:size-5'>
                    {serviceIcon}
                </div>
                {serviceLabelLink ? (
                    <Link to={serviceLabelLink}
                          className='text-xs md:text-sm font-medium uppercase hover:underline decoration-2 underline-offset-2'>
                        {serviceLabel}
                    </Link>) : (
                    <p className='text-xs md:text-sm font-medium uppercase'>
                        {serviceLabel}
                    </p>)
                }
            </div>
            <p className='text-xs font-semibold uppercase'>
                {dataValue ? dataValue : status}
            </p>
        </div>
    )

}