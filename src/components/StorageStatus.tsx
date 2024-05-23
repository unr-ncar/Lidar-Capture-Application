import { StorageInformation_t} from "../types.tsx";

export interface StorageStatusProps_t {
    storageInformation?: StorageInformation_t
}
export function StorageStatus({storageInformation}: StorageStatusProps_t){
    if (storageInformation === undefined) return null

    const convertBytesToGB = (bytes: number):string => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(0);
    }

    const totalSpaceMB = convertBytesToGB(storageInformation.totalSpace)
    const freeSpaceMB = convertBytesToGB(storageInformation.freeSpace)
    const usagePercentage = ((storageInformation.usedSpace / storageInformation.totalSpace)*100).toFixed(0)


    const statusBackground = () => {
        const storageSatisfactoryBackground = 'bg-gradient-to-tr from-green-400 to-green-600'
        const storageCriticalBackground = 'bg-gradient-to-tr from-yellow-400 to-yellow-600'
        const storageUnstableBackground = 'bg-gradient-to-tr from-red-400 to-red-600'

        if (Number(usagePercentage) > 80) {
            return storageUnstableBackground
        } else if (Number(usagePercentage) > 60) {
            return storageCriticalBackground
        } else {
            return storageSatisfactoryBackground
        }
    }

    return (
        <div className={`${statusBackground()} flex flex-row gap-3 p-3 rounded-md align-middle`}>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <p className='leading-none font-semibold text-lg'>
                    {usagePercentage}%
                </p>
                <p className='font-semibold text-xs'>
                    USAGE
                </p>
            </div>
            <div className='flex flex-col align-middle'>
                <p className='text-xs font-semibold'>
                    STORAGE CAPACITY
                </p>
                <p className=''>
                    {String(freeSpaceMB)} GB available out of {String(totalSpaceMB)} GB.
                </p>
            </div>
        </div>
    )
}