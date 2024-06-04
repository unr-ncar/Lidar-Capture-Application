import {ReactElement} from "react";

export default function ItemList({className, children}: {className?: string, children: ReactElement | Array<ReactElement>}) {
    return (
        <div className={`${className} flex flex-col gap-4`}>
            {children}
        </div>
    )
}