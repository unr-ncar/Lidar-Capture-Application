import {NavLink, NavLinkProps} from "react-router-dom";
import {ReactElement} from "react";

/*
* NOTE: This component is designed to work with ViewShell.tsx
 */
export type SecondaryNavigationLinkProps_t = {
    className?: string;
    label: string;
    icon?: ReactElement;
    idleBackgroundColor?: string;
    idleTextColor?: string;
    activeBackgroundColor?:string;
    activeTextColor?: string;
} & NavLinkProps;
export function SecondaryNavigationLink(props: SecondaryNavigationLinkProps_t) {

    const { className, label, icon, ...rest } = props;

    return (
        <NavLink {...rest} end className={`${className} hover:text-black transition-colors [&.active]:text-black text-black/50 items-center rounded flex flex-row text-nowrap gap-2`}>
            <span className='[&>*]:size-4'>
                { icon }
            </span>
            <p className='font-medium'>
                { label }
            </p>
        </NavLink>
    )
}



export interface SecondaryNavigationProps_t {
    className?: string;
    children: Array<ReactElement<SecondaryNavigationLinkProps_t>> | ReactElement<SecondaryNavigationLinkProps_t>
}
export function SecondaryNavigation({className, children}: SecondaryNavigationProps_t) {
    return (
            <div className={`${className} p-6 bg-white flex flex-row justify-stretch overflow-x-auto gap-6 border-b-neutral-100 border-b-2`}>
                { children }
            </div>
    )
}