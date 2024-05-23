import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

export interface ErrorOccurredProps_t {
    error: Error;
}
export function ErrorOccurred({error}: ErrorOccurredProps_t) {
    return (
        <div className='flex flex-col items-center justify-center h-full w-full gap-1 text-red-400'>
            <div>
                <ExclamationTriangleIcon className='size-10' />
            </div>
            <p>
                <span className='font-semibold'>Error!</span> {error.message}.
            </p>
        </div>
    )
}