import { ReactElement } from "react";

export default function ViewLayout(props: { children: ReactElement }) {
    return (
        <div className="block w-full h-full">
            {props.children}
        </div>
    )
}