import { DatabaseSelection_t} from "../types.tsx";

export interface DownloadItemProps_t {
    item: DatabaseSelection_t;
    isSelected: () => boolean;
    isSaved: () => boolean;
    toggleSelectionFunction: () => void;
    removeSelectionFunction: () => boolean;
}

export function DownloadItem(props: DownloadItemProps_t) {

    const {filename} = props.item.item;
    const {isSelected, toggleSelectionFunction, removeSelectionFunction, } = props;

    return (
        <div className='h-[100px] w-[100px] bg-neutral-100 rounded-md'>
            <p className='break-all line-clamp-2 text-sm'>
                {filename}
            </p>
            <button onClick={removeSelectionFunction}>
                Remove Item
            </button>
        </div>
    )

}