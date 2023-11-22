import {connect} from "react-redux";
import NavBar from "./NavBar.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import {isAuth, username} from "../Redux/app/app-selector.ts";
import {setIsAuthFalse, setUsername} from '../Redux/app/app-slice.ts'
import {useEffect} from "react";
import {useGetTotalFavoriteCount} from "../hooks/favorite.ts";
import {useQueryClient} from "react-query";
import {useGetTotalCartPrice} from "../hooks/cart.ts";

interface MenuAPIComponentProps {
    isAuth: boolean
    setIsAuthFalse: () => void
    setUsername: () => void
    username: string
}

const NavBarAPIContainer = ({username, setIsAuthFalse, isAuth, setUsername}: MenuAPIComponentProps) => {
    if (!isAuth) {
        return <NavBar
            totalFavoritesCount={ 0 } isAuth={ isAuth } setIsAuthFalse={ setIsAuthFalse } totalCartPrice={ 0 }/>
    }
    const token = localStorage.getItem('token')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    if (!token) {
        return <Preloader/>
    }
    const {
        isFetching: totalCartPriceIsFetching,
        data: totalCartPriceData
    } = useGetTotalCartPrice(setUsername, setIsAuthFalse)
    const {isFetching: totalFavoriteCountIsFetching, data: totalFavoriteCountData} = useGetTotalFavoriteCount()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        queryClient.invalidateQueries('totalFavoriteCount');
    }, [queryClient, token, username]);

    if (totalCartPriceIsFetching || totalFavoriteCountIsFetching) {
        return <Preloader/>;
    }
    return <NavBar totalFavoritesCount={ totalFavoriteCountData?.data.totalFavoriteCount } isAuth={ isAuth }
                   username={ username } setIsAuthFalse={ setIsAuthFalse }
                   totalCartPrice={ totalCartPriceData.totalCartPrice }/>
}

const mapStateToProps = (state: never) => {
    return {
        isAuth: isAuth(state),
        username: username(state)
    }
};

// @ts-ignore
export default connect(mapStateToProps, {setIsAuthFalse, setUsername})(NavBarAPIContainer)