import {ReactElement} from "react";
import { ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";

interface ItemListHeaderProps_t {
    label?: string;
    accordion?: boolean;
}

function ItemListHeader({label, accordion}: ItemListHeaderProps_t) {

    if (!label) return null

    const containerStyles = `group flex flex-row gap-2 justify-between items-center w-full ${accordion ? 'bg-neutral-200 text-neutral-400 px-3 py-1 rounded-md' : 'text-neutral-400 border-b-2 border-neutral-200 pb-1'} ${accordion ? 'hover:bg-black hover:text-white transition-colors' : null}`
    const textStyling = 'font-semibold text-sm uppercase'

    if (accordion) {
        return (
            <DisclosureButton className={containerStyles}>
                <p className={textStyling}>
                    {label}
                </p>
                {accordion && (
                    <span className='[&>*]:size-4'>
                        <ChevronDownIcon className='block group-data-[open]:hidden'/>
                        <ChevronUpIcon className='hidden group-data-[open]:block'/>
                    </span>
                )}
            </DisclosureButton>
        )
    }

    return (
        <div className={containerStyles}>
            <p className={textStyling}>
                {label}
            </p>
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

    const containerStyles = 'flex flex-col gap-4'

    if (accordion) {
        return (
            <Disclosure>
                <div className={containerStyles}>
                    <ItemListHeader accordion label={label}/>
                    <DisclosurePanel className={`${className} flex flex-col gap-4`}>
                        {children}
                    </DisclosurePanel>
                </div>
            </Disclosure>
        )
    }

    return (
        <div className={containerStyles}>
            <ItemListHeader label={label} />
            <div className={`${className} flex flex-col gap-4`}>
                {children}
            </div>
        </div>
    )
}