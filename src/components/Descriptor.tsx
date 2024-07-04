export interface DescriptorProps_t {
    label: string;
    children: string | Array<string>;
    href?: string;
}
export function Descriptor({label, children, href}: DescriptorProps_t) {
    return (
        <div className='flex flex-col gap-0.5'>
            <p className='text-xs font-semibold text-neutral-400 uppercase'>
                {label}
            </p>
            <span className='text-sm break-all leading-snug'>
                { href ? (
                    <a href={href}>
                        {children}
                    </a>
                ) : (
                    <p>
                        {children}
                    </p>
                )}
            </span>
        </div>
    )
}