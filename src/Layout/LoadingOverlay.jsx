import { FiLoader } from "react-icons/fi";
import styles from './LoadingOverlay.module.css';
import { useStore } from "../useStore";

export function LoadingOverlay(){

const isLoading = useStore((state)=>state.isLoading)

if(isLoading === false){
    return null;
}
    return(
        <div className={styles.overlay}><FiLoader className={styles.spineerAnimate} /></div>
    )
}