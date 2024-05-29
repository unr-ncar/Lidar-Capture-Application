import {ReactElement} from "react";
import {SecondaryNavigationProps_t} from "./SecondaryNavigation.tsx";


export interface ViewContentContainerProps_t {
    children: ReactElement | Array<ReactElement>;
}

export interface ViewShellProps_t {
    className?: string;
    secondaryNavigation?: ReactElement<SecondaryNavigationProps_t>;
    children: ReactElement | Array<ReactElement>;
}
export function ViewShell({className, secondaryNavigation, children}: ViewShellProps_t) {
    return (
        <div className={`${className} flex flex-col h-full w-full `}>
            { secondaryNavigation }
            <div className='w-full h-full max-h-full overflow-auto '>
                { children }
            </div>
        </div>
    )
}