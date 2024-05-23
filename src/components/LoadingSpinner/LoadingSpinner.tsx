import styles from './LoadingSpinner.module.css'
export default function LoadingSpinner() {
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <span className={styles.loader}></span>
        </div>
    )
}