import {ReactElement} from "react";

export interface PaginationItemProps_t {
    setter: (page: number) => void;
    assignedPage: number;
    currentPage: number;
}
export function PaginationItem({setter, assignedPage, currentPage}: PaginationItemProps_t) {

    return (
        <button onClick={() => setter(assignedPage)} className={`${currentPage === assignedPage ? 'bg-black' : 'bg-neutral-300'} ${currentPage === assignedPage ? 'text-white' : 'text-neutral-500'} text-sm w-7 rounded-md h-7 font-semibold`}>
            {assignedPage}
        </button>
    )
}
export function Pagination({children, className}: {children: Array<ReactElement>, className?: string}) {

    return (
        <div className={`${className} flex flex-row gap-2 justify-center pt-2`}>
            { children }
        </div>
    )

}
