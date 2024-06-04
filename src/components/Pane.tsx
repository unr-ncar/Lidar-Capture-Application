import {ReactElement} from "react";

interface PaneHeaderProps_t {
    label?: string;
    description?: string;
}

export function PaneHeader({label, description}: PaneHeaderProps_t) {

    if (!label) return null

    return (
        <div>
            <p className='font-bold text-xl mb-0.5'>
                {label}
            </p>
            {description && (
                <p className='italic text-neutral-400'>
                    {description}
                </p>
            )}
        </div>
    )
}

export interface PaneProps_t {
    children: ReactElement | undefined | Array<ReactElement | undefined>;
    label?: string;
    description?: string;
    stretch?: boolean;
    minimalWidth?: boolean;
    mobileDetach?: boolean;
}

export function Pane({children, label, description, stretch, minimalWidth}: PaneProps_t) {

    return (
        <div
            className={`${stretch ? 'grow' : null} ${!stretch ? 'md:max-w-[450px]' : null} ${minimalWidth ? 'md:min-w-[350px]' : null} flex flex-col gap-6 p-6 md:overflow-y-auto md:h-full`}>
            <PaneHeader label={label} description={description}/>
            <div className='grow'>
                {children}
            </div>
        </div>
    )
}