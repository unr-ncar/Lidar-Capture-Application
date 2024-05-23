export interface TagProp_t {
    className?: string;
    label: string;
    value: string;
    onClick?: () => void;
}
export function Tag({className, label, value, onClick}:TagProp_t) {

    return (
        <button className={`text-xs ${className} ${onClick !== undefined ? 'bg-blue-400' : 'bg-black'} text-white px-1.5 py-0.5 rounded`} onClick={onClick}>
            <span className='font-semibold'>{label}</span>{' '}{value}
        </button>
    )

}