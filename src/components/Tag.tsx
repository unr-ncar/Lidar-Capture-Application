export interface TagProps_t {
    label: string;
    value: string;
    onClick?: () => void;
}
export function Tag({ label, value, onClick }: TagProps_t) {

    if (onClick) {
        return (
            <button onClick={onClick} className='flex flex-row'>
                <p className='bg-black rounded-md text-white text-xs px-1.5 py-1 '>
                    <span className='font-semibold '>{label}:</span>{' '}{value}
                </p>
            </button>
        )
    }

    return (
        <div className='flex flex-row'>
            <p className='bg-black rounded-md text-white text-xs px-1.5 py-1 '>
                <span className='font-semibold '>{label}:</span>{' '}{value}
            </p>
        </div>
    )
}