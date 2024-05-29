import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

export interface ErrorOccurredProps_t {
    error: Error;
}

export function ErrorOccurred({error}: ErrorOccurredProps_t) {
    return (
        <div className='h-full w-full text-neutral-400 gap-2 flex flex-col items-center justify-center'>
            <div>
                <ExclamationTriangleIcon className='size-16 leading-tight'/>
            </div>
            <p className='text-lg'>
                <span className='font-semibold'>Error!</span>{' '}{error.message}.
            </p>
        </div>
    )
}