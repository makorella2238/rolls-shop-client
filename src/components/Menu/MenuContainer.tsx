import Menu from "./Menu.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import {useQuery} from "react-query";
import {catalog_requests} from "../API/api.ts";


const MenuContainer = () => {

    const {data, isLoading, error} = useQuery('menu', catalog_requests.getMenu)

    if (isLoading) {
        return <Preloader/>
    }
    if (error) {
        // @ts-ignore
        return <p>{error}</p>
    }

    // @ts-ignore
    return <Menu menu={data}/>
}

export default MenuContainer