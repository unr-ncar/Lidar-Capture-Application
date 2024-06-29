import {Fragment, ReactElement} from "react";
import {Menu, MenuButton, MenuItem, MenuItemProps, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/16/solid";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {AnchorProps} from '@headlessui/react/dist/internal/floating';

export interface DropdownMenuItemProps_t extends MenuItemProps {
    label: string;
    icon?: ReactElement;
    onClick?: () => void;
    href?: string;
}
export function DropdownMenuItem(props: DropdownMenuItemProps_t) {

    const {label, icon, onClick, disabled, href, ...rest} = props;
    const bodyStyling = 'group px-2 py-1 flex flex-row justify-between items-center gap-1 text-neutral-400 hover:text-white hover:bg-black transition-colors'

    const itemIcon = icon ? (
        <span className='[&>*]:size-4'>
            {icon}
        </span>
    ) : undefined

    const itemLabel = (
        <p className='font-medium text-sm'>
            {label}
        </p>
    )

    if (href) {
        return (
            <MenuItem>
                <a className={bodyStyling} href={href}>
                    {itemIcon}
                    {itemLabel}
                </a>
            </MenuItem>
        )
    }

    return (
        <MenuItem disabled={disabled} {...rest} as={Fragment}>
            <button className={bodyStyling} disabled={disabled} onClick={onClick}>
                {itemIcon}
                {itemLabel}
            </button>
        </MenuItem>
    )
}

export interface DropdownMenuProps_t {
    label: string;
    children: ReactElement<DropdownMenuItemProps_t> | Array<ReactElement<DropdownMenuItemProps_t>> | undefined;
    anchor?: AnchorProps;
}
export function DropdownMenu({label, children, }: DropdownMenuProps_t) {
    return (
        <Menu>
            <MenuButton className='min-w-[100px] w-[100px] h-min px-2 py-1 flex flex-row justify-between items-center gap-1 bg-black text-white rounded-md data-[open]:rounded-b-none'>
                <p className='text-sm'>
                    {label}
                </p>
                <span>
                    <ChevronDownIcon className='size-3' />
                </span>
            </MenuButton>
            <MenuItems className='min-w-[100px] flex flex-col bg-white rounded-b-md rounded-tl-md shadow-lg [&>*]:min-w-[100px] [&>*:last-child]:border-0 [&>*]:border-b-2 [&>*]:border-neutral-100 ' anchor='bottom end'>
                {children}
            </MenuItems>
        </Menu>
    )
}