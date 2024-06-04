import {ReactElement} from "react";

export default function ItemList({className, children}: {className?: string, children: ReactElement | Array<ReactElement> | undefined}) {
    return (
        <div className={`${className} flex flex-col gap-4`}>
            {children}
        </div>
    )
}