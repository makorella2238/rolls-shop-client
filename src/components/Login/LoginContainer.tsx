import {connect} from "react-redux";
import Login from "./Login.tsx";
import {Link, useNavigate} from "react-router-dom";
import {setIsAuthTrue, setUsername, setIsAuthFalse} from '../Redux/app/app-slice.ts'
import {useMutation, useQueryClient} from "react-query";
import {auth_request} from "../API/api.ts";
import {useState} from "react";
import {isAuth} from "../Redux/app/app-selector.ts";
// @ts-ignore
import s from './Login.module.css'

interface FavoritesAPIContainerProps {
    setIsAuthTrue: () => void;
    setUsername: () => void
    isAuth: boolean
    setIsAuthFalse: () => void
}

function LoginAPIContainer({setIsAuthTrue, setUsername, isAuth, setIsAuthFalse}: FavoritesAPIContainerProps) {

    if (isAuth) {

        const handleClick = () => {
            setIsAuthFalse()
            localStorage.removeItem('token')
        }

        return (<div className={ s.linkLogin }>
                <h2>Вы уже зарегестрированы</h2>
                <Link to='/'>Перейти в меню </Link>
                <p className={ s.handleLogout } onClick={ handleClick }>Выйти из аккаунта</p>
            </div>
        )
    }

    const queryClient = useQueryClient()
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // @ts-ignore
    const login = useMutation('login', auth_request.login, {
        onSuccess: (data) => {
            const {username, token} = data;
            localStorage.setItem('token', token);
            navigate('/');
            // @ts-ignore
            setUsername(username)
            setIsAuthTrue()
            queryClient.invalidateQueries('totalFavoriteCount')
            queryClient.invalidateQueries('getTotalCartPrice')
        }, onError: (errors: any) => {
            setError(errors.response.data.message)
        }
    })

    // @ts-ignore
    const handleLogin = ({password, username}) => {
        login.mutate({password, username});
    };

    // @ts-ignore
    return <Login handleLogin={ handleLogin } error={ error }/>
}

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state),
    }
};

// @ts-ignore
export default connect(mapStateToProps, {setIsAuthTrue, setUsername, setIsAuthFalse})(LoginAPIContainer)