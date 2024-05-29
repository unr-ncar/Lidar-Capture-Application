import {NavLink, NavLinkProps} from "react-router-dom";
import {ReactElement} from "react";

type PrimaryNavigationLinkProps_t = {
    className?: string;
    label: string;
    icon: ReactElement;
} & NavLinkProps;
export function PrimaryNavigationLink(props: PrimaryNavigationLinkProps_t) {

    const {className, label, icon, ...rest} = props;

    return (
        <NavLink {...rest} className={`${className} flex flex-col gap-0.5 items-center hover:text-black transition-colors text-black/50 [&.active]:text-black`}>
            <div>
                <span className='[&>*]:size-6'>
                    { icon }
                </span>
            </div>
            <p className='text-xs font-medium'>
                { label }
            </p>
        </NavLink>
    )
}

interface PrimaryNavigationProps_t {
    className?: string;
    children: Array<ReactElement<PrimaryNavigationLinkProps_t>> | ReactElement<PrimaryNavigationLinkProps_t>
}
export function PrimaryNavigation({className, children}: PrimaryNavigationProps_t) {

    return (
        <div className={`${className} z-50 bg-neutral-100 flex flex-row justify-around py-3 md:flex-col md:justify-start md:gap-6 md:p-6`}>
            { children }
        </div>
    )
}