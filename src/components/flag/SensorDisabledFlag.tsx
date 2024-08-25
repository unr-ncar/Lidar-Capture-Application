import {Flag} from "./Flag.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";

export default function SensorDisabledFlag() {
    return (
        <Flag colorType='disabled'>
            <XMarkIcon />
        </Flag>
    )
}