import {ReactElement} from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export interface UseMobileDisableProps_t {
    children: ReactElement;
    enableWidthThreshold?: number;
}
export function MobileDisableWrapper({children, enableWidthThreshold}: UseMobileDisableProps_t) {

    const windowSize = useWindowSize();
    const widthThreshold = (enableWidthThreshold === undefined ? 768 : enableWidthThreshold)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (windowSize.width >= widthThreshold) {
        return children
    } else {
        return null
    }

}