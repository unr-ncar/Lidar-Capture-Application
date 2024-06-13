import {ReactElement} from "react";
import {ListBulletIcon, ChevronDownIcon} from "@heroicons/react/24/solid";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";

interface ItemListHeaderProps_t {
    label?: string;
    accordion?: boolean;
}

function ItemListHeader({label, accordion}: ItemListHeaderProps_t) {

    if (!label) return null

    const containerStyles = `bg`

    if (accordion) {
        return (
            <DisclosureButton className='flex flex-row justify-between items-center w-full bg-neutral-100 text-neutral-400 px-3 py-1 rounded-md'>
                <div className='flex flex-row items-center gap-1'>
                    <p className='font-semibold text-sm uppercase'>
                        {label}
                    </p>
                </div>
                {accordion && (
                    <span>
                        <ChevronDownIcon className='size-4' />
                    </span>
                )}
            </DisclosureButton>
        )
    }

    return (
        <div>
            <div>
                <span>
                    <ListBulletIcon/>
                </span>
                <p>
                    {label}
                </p>
            </div>
        </div>
    )

}

export interface ItemListProps_t {
    className?: string;
    children: ReactElement | Array<ReactElement> | undefined;
    label?: string;
    accordion?: boolean;
}

export default function ItemList({className, children, label, accordion}: ItemListProps_t) {

    if (accordion) {
        return (
            <Disclosure>
                <div className='flex flex-col gap-2'>
                    <ItemListHeader accordion label={label} />
                    <DisclosurePanel>
                        { children }
                    </DisclosurePanel>
                </div>
            </Disclosure>
        )
    }

    return (
        <div>
            <ItemListHeader />
            <div className={`${className} flex flex-col gap-4`}>
                {children}
            </div>
        </div>
    )
}