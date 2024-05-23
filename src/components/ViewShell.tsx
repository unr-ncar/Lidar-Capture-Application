import {ReactElement, ReactNode} from "react";
import { SecondaryNavigationProps_t} from "./Navigation.tsx";

export interface PageShellProps_t {
    children?: ReactNode;
    navigation: ReactElement<SecondaryNavigationProps_t>;
}
export default function ViewShell({ children, navigation }: PageShellProps_t) {
    return (
        <div className='flex flex-col h-full'>
            <>
                { navigation }
            </>
            <div className='p-3 h-full overflow-auto md:p-5'>
                { children }
            </div>
        </div>

    )
}