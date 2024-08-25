import {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon} from "@heroicons/react/16/solid";
import {NavLink} from "react-router-dom";

export interface ToastProps_t {
    type: 'info' | 'warning' | 'success';
    label?: string;
    children: string;
    hyperlink?: string;
}

export default function Toast({type, children, label, hyperlink}: ToastProps_t) {
    return (
        <div className={`inline-flex gap-2.5 items-center ${type === 'info' && 'text-blue-600'} ${type === 'warning' && 'text-red-600'} ${type === 'success' && 'text-green-600'}`}>
            <span className='[&>*]:size-4'>
                {type === 'success' ? <CheckCircleIcon /> : undefined}
                {type === 'info' ? <InformationCircleIcon /> : undefined}
                {type === 'warning' ? <ExclamationCircleIcon /> : undefined}
            </span>
            <p className='text-xs'>
                {label && (
                    <span className='font-semibold'>
                        {label}:{' '}
                    </span>
                )}
                {children}{' '}
                {hyperlink && (
                    <span className='underline'>
                        <NavLink to={hyperlink} >See More.</NavLink>
                    </span>
                )}
            </p>
        </div>
    )
}