import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {isAuth} from '../Redux/app/app-selector';
import {useCreateCartItem} from '../hooks/cart';
import {useGetMenuElements} from '../hooks/menuItems';
import {useGetFavoriteItems, useToggleFavoriteItem} from '../hooks/favorite';
import MenuElements from './MenuElements';
import {useInView} from 'react-intersection-observer';
import Preloader from '../common/Preloader/Preloader';
import {IMenuElement, IMenuItem} from "../../../types.ts";
interface MenuElementsContainerProps {
    isAuth: boolean;
}

const MenuElementsContainer = ({isAuth}: MenuElementsContainerProps) => {

    const {ref, inView} = useInView({threshold: 0});
    const [menuElementsCartLoading, setMenuElementsCartLoading] = useState(false);
    const [menuElementsFavoriteLoading, setMenuElementsFavoriteLoading] = useState(false);
    const {handleCreateCartItem} = useCreateCartItem(setMenuElementsCartLoading);
    const {handleToggleFavorite} = useToggleFavoriteItem(setMenuElementsFavoriteLoading);

    const [menuElementsData, setMenuElementsData] = useState<IMenuElement[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<IMenuItem[]>([]);
    const [categoryId, setCategoryId] = useState(1);
    const {data: menuItemsData, isFetching: menuElementsIsFetching, error: menuElementsError} = useGetMenuElements(categoryId);
    const { isFetching: favoriteIsFetching, error: favoriteError} = useGetFavoriteItems(setFavoriteItems)

    // eslint-disable-next-line no-debugger
    debugger

    if(menuElementsIsFetching || favoriteIsFetching) {
        return <Preloader/>
    }

    useEffect(() => {
        if (menuItemsData) {
            setMenuElementsData(prev => [...prev, menuItemsData]);
        }
        if (inView && menuElementsData.length) {
            if (categoryId < 6) {
                loadNextCategory();
            }
        }
    }, [menuItemsData, inView, menuElementsData]);

    const loadNextCategory = () => {
        setCategoryId(prev => prev + 1);
    };

    if (menuElementsError || favoriteError) {
        // @ts-ignore
        return <p>{menuElementsError || favoriteError}</p>
    }

    return (
        // @ts-ignore
        <MenuElements isAuth={ isAuth } handleCreateCartItem={ handleCreateCartItem } menuItems={ menuItemsData } menuRef={ ref }
                      handleToggleFavorite={ handleToggleFavorite } favoriteItems={ favoriteItems } menuElementsCartLoading={menuElementsCartLoading} setMenuElementsCartLoading={setMenuElementsCartLoading}
                      menuElementsFavoriteLoading={menuElementsFavoriteLoading} setMenuElementsFavoriteLoading={setMenuElementsFavoriteLoading}
        />
    );
}

const mapStateToProps = (state: never) => ({
    isAuth: isAuth(state)
});

export default connect(mapStateToProps, {})(MenuElementsContainer);
