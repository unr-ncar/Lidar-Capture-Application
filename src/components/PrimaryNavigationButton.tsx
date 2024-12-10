import { ReactElement, cloneElement } from "react";
import { NavLink, NavLinkProps } from "react-router";

export interface IPrimaryNavigationButtonProps extends NavLinkProps {
    label: string;
    icon: ReactElement;
}

export default function PrimaryNavigationButton(props: IPrimaryNavigationButtonProps) {
    const styledIcon = cloneElement(props.icon, {
        className: "size-6"
    });

    return (
        <NavLink {...props} className="flex flex-col text-neutral-400 items-center gap-0.5 [&.active]:text-black">
            {styledIcon}
            <span className="font-medium text-xs">
                {props.label}
            </span>
        </NavLink>
    );
}