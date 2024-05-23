import {NavLink, NavLinkProps} from "react-router-dom";
import {ReactElement} from "react";
import {Cog6ToothIcon, FolderIcon, VideoCameraIcon} from "@heroicons/react/20/solid";

export type PrimaryNavigationLinkProps_t = {
    className?: string;
    label: string;
    icon: ReactElement;
} & NavLinkProps
export function PrimaryNavigationLink(props: PrimaryNavigationLinkProps_t) {

    const {className, label, icon, ...rest} = props;

    return (
        <NavLink {...rest} className={`${className} flex flex-col items-center gap-0.5 text-white/50 [&.active]:text-white py-2.5 md:flex-row`}>
            { icon && <span className='[&>*]:size-5'> {icon} </span> }
            <p className='text-xs font-semibold'>
                { label }
            </p>
        </NavLink>
    )

}
export function PrimaryNavigation({className}: {className: string}) {

    return (
        <nav className={`${className} flex flex-row justify-around bg-black md:justify-start md:gap-x-4 md:px-4`}>
            <PrimaryNavigationLink label='Explorer' icon={<FolderIcon />} to='/explorer' />
            <PrimaryNavigationLink label='Capture' icon={<VideoCameraIcon />} to='/capture' />
            <PrimaryNavigationLink className='mt-auto' label='Settings' icon={<Cog6ToothIcon />} to='/settings' />
        </nav>
    )
}

export type SecondaryNavigationLinkProps_t = {
    label: string;
    icon: ReactElement;
} & NavLinkProps
export function SecondaryNavigationLink(props: SecondaryNavigationLinkProps_t) {

    const {className, label, icon, ...rest} = props;

    return (
        <NavLink {...rest} end className={`${className} flex flex-row gap-0.5 items-center text-neutral-400 [&.active]:text-neutral-600 `}>
            { icon && <span className='[&>*]:size-5'> {icon} </span> }
            <p className='text-xs font-semibold'>
                { label }
            </p>
        </NavLink>
    )
}

export interface SecondaryNavigationProps_t {
    className?: string;
    children: Array<ReactElement<SecondaryNavigationProps_t>>;
}
export function SecondaryNavigation({className, children}: SecondaryNavigationProps_t) {

    return (
        <div className={`${className} flex flex-row justify-around bg-neutral-200  py-2.5 md:justify-start md:gap-x-4 md:px-4`}>
            { children }
        </div>
    )
}