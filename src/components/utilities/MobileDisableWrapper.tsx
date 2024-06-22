import {ReactElement} from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export interface UseMobileDisableProps_t {
    children: ReactElement;
    enableWidthThreshold?: number;
    invert?: boolean;
}
export function MobileDisableWrapper({children, enableWidthThreshold, invert}: UseMobileDisableProps_t) {

    const windowSize = useWindowSize();
    const widthThreshold = (enableWidthThreshold === undefined ? 768 : enableWidthThreshold)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const shouldRender = invert ? windowSize.width < widthThreshold : windowSize.width >= widthThreshold;

    if (shouldRender) {
        return children;
    } else {
        return null;
    }

}