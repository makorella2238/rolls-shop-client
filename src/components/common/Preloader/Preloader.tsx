// @ts-ignore
import preloaderNormal from '../../../assets/Preloader/loading.svg'
// @ts-ignore
import s from './Preloader.module.css'
function Preloader() {
    return (
        <div className={s.loading_screen}>
            <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Preloader;