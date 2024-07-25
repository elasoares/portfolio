import { LuLoader2 } from "react-icons/lu"
import styles from './LoadingOverlay.module.css';
import { useStore } from "../useStore";

export function LoadingOverlay(){

const isLoading = useStore((state)=>state.isLoading)

if(isLoading === false){
    return null;
}
    return(
        <div className={styles.overlay}><LuLoader2 className={styles.spineerAnimate} /></div>
    )
}