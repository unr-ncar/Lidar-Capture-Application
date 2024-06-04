import {ButtonHTMLAttributes, Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";

interface PaginationButtonProps_t extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement | number;
    navigation?: boolean;
    active?: boolean
}

function PaginationButton(props: PaginationButtonProps_t) {

    const {navigation, children, active, ...rest} = props;

    return (
        <button {...rest}
                className={`${active ? 'bg-black' : 'bg-neutral-200'} ${active ? 'text-white' : 'text-neutral-400'} disabled:hidden hover:bg-black hover:text-white transition-colors flex items-center justify-center w-6 h-6 rounded`}>
            {navigation && (
                <span className='[&>*]:size-4'>
                    {children}
                </span>
            )}
            {!navigation && (
                <p className='font-medium text-sm'>
                    {children}
                </p>
            )}
        </button>
    )

}


export interface PaginationProps_t {
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalItemCount: number;
    pageSize: number;
    selectionWindowSize?: number;
}

export function Pagination({
                               currentPage,
                               setPage,
                               totalItemCount,
                               pageSize,
                               selectionWindowSize = 3
                           }: PaginationProps_t) {
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setPageCount(Math.ceil(totalItemCount / pageSize));
    }, [pageSize, totalItemCount]);

    const generateDisplayedPages = () => {
        const halfWindow = Math.floor(selectionWindowSize / 2);
        let start = Math.max(1, currentPage - halfWindow);
        let end = Math.min(pageCount, currentPage + halfWindow);

        // NOTE: The start and end are adjusted if they don't fill the window size.
        if (end - start < selectionWindowSize - 1) {
            if (start === 1) {
                end = Math.min(pageCount, start + selectionWindowSize - 1);
            } else if (end === pageCount) {
                start = Math.max(1, end - selectionWindowSize + 1);
            }
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };
    const displayedPages = generateDisplayedPages().map(page => (
        <PaginationButton
            key={page}
            active={currentPage === page}
            onClick={() => setPage(page)}
        >
            {page}
        </PaginationButton>
    ))

    return (
        <div className="flex flex-row items-center gap-2">
            {!(pageCount <= selectionWindowSize) &&
                <PaginationButton navigation onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                    <ChevronLeftIcon />
                </PaginationButton>}
            {displayedPages}
            {!(pageCount <= selectionWindowSize) &&
                <PaginationButton navigation onClick={() => setPage(prev => Math.min(pageCount, prev + 1))} disabled={currentPage === pageCount}>
                    <ChevronRightIcon />
                </PaginationButton>}
        </div>
    );
}
