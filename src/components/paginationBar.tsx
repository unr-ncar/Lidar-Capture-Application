// Based on: https://hygraph.com/blog/react-pagination
import {Dispatch, SetStateAction} from "react";

interface pagination_bar_t {
    window_size: number,
    total_items: number,
    current_page: number,
    setter: Dispatch<SetStateAction<number>>
}
export default function PaginationBar({window_size, total_items, current_page, setter}: pagination_bar_t) {

    const page_numbers: Array<number> = []

    for (let index: number = 1; index <= Math.ceil(total_items / window_size); index++) {
        page_numbers.push(index);
    }

    return (
        <ul>
            { page_numbers.map((page: number) => <li key={page} onClick={() => setter(page)} className={`${current_page === page ? 'font-bold text-red-500' : undefined}`} >{page}</li>)}
        </ul>
    )

}