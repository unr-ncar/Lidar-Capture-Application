export interface DescriptorProps_t {
    label: string;
    children: string | Array<string>;
}
export function Descriptor({label, children}: DescriptorProps_t) {
    return (
        <div className='flex flex-col gap-0.5'>
            <p className='text-xs font-semibold text-neutral-400 uppercase'>
                {label}
            </p>
            <p className='text-sm break-all leading-snug'>
                {children}
            </p>
        </div>
    )
}