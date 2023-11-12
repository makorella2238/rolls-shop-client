import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {isAuth} from '../Redux/app/app-selector';

import {useCreateCartItem} from '../hooks/cart';
import {useGetMenuElements} from '../hooks/menuItems';
import {useGetFavoriteItems, useToggleFavoriteItem} from '../hooks/favorite';

import {IMenuElement, IMenuItem} from '../../../types';

import MenuElements from './MenuElements';
import {useInView} from 'react-intersection-observer';
import Preloader from '../common/Preloader/Preloader';
interface MenuElementsContainerProps {
    isAuth: boolean;
}

const MenuElementsContainer = ({isAuth}: MenuElementsContainerProps) => {
    // @ts-ignore
    let favoriteFetching = false;
    let favoriteError = null;
    let favoriteItems: IMenuItem[] = []

    const {ref, inView} = useInView({threshold: 0});
    const [menuElementsCartLoading, setMenuElementsCartLoading] = useState(false);
    const [menuElementsFavoriteLoading, setMenuElementsFavoriteLoading] = useState(false);
    const {handleCreateCartItem} = useCreateCartItem(setMenuElementsCartLoading);
    const {handleToggleFavorite} = useToggleFavoriteItem(setMenuElementsFavoriteLoading);

    const [menuElementsData, setMenuElementsData] = useState<IMenuElement[]>([]);
    // const [favoriteItems, setFavoriteItems] = useState<IMenuItem[]>([]);
    const [categoryId, setCategoryId] = useState(1);

    const {data: menuItemsData, isFetching: menuElementsIsFetching, error: menuElementsError} = useGetMenuElements(categoryId);

    // eslint-disable-next-line no-debugger
    debugger
    if (isAuth) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const favoriteHook = useGetFavoriteItems();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        favoriteItems = favoriteHook.data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        favoriteFetching = favoriteHook.isFetching;
        favoriteError = favoriteHook.error;
    }

    if(menuElementsIsFetching) {
        return <Preloader/>
    }

    useEffect(() => {
        if (menuItemsData) {
            setMenuElementsData(prev => [...prev, menuItemsData]);
        }
    }, [menuItemsData]);

    useEffect(() => {
        if (inView && menuElementsData.length) {
            if (categoryId < 6) {
                loadNextCategory();
            }
        }
    }, [inView, menuElementsData]);

    const loadNextCategory = () => {
        setCategoryId(prev => prev + 1);
    };

    if (menuElementsError || favoriteError) {
        return <p>{menuElementsError || favoriteError}</p>
    }

    return (
    // @ts-ignore
        <MenuElements isAuth={ isAuth } handleCreateCartItem={ handleCreateCartItem } menuItems={ menuElementsData } menuRef={ ref }
                      handleToggleFavorite={ handleToggleFavorite } favoriteItems={ favoriteItems } menuElementsCartLoading={menuElementsCartLoading} setMenuElementsCartLoading={setMenuElementsCartLoading}
                      menuElementsFavoriteLoading={menuElementsFavoriteLoading} setMenuElementsFavoriteLoading={setMenuElementsFavoriteLoading}
        />
    );
}

const mapStateToProps = (state: never) => ({
    isAuth: isAuth(state)
});

export default connect(mapStateToProps)(MenuElementsContainer);