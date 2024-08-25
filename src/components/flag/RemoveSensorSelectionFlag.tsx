import {Flag} from "./Flag.tsx";
import {MinusIcon} from "@heroicons/react/16/solid";

export default function RemoveSensorSelectionFlag() {
    return (
        <Flag colorType='active'>
            <MinusIcon />
        </Flag>
    )
}