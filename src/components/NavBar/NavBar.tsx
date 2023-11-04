import {Link} from "react-router-dom";
// @ts-ignore
import s from './NavBar.module.css'
// @ts-ignore
import logoImg from '../../assets/nav/logo.webp'
// @ts-ignore
import personalAccountImg from '../../assets/nav/personal account.png'
// @ts-ignore
import loginImg from '../../assets/nav/login.png'
// @ts-ignore
import logoutImg from '../../assets/nav/logout.png'

interface NavBarProps {
    totalFavoritesCount: number
    isAuth: boolean
    username?: string
    setIsAuthFalse: () => void
    totalCartPrice: number

}

const NavBar = ({setIsAuthFalse, isAuth, username, totalFavoritesCount, totalCartPrice}: NavBarProps) => {
    function handleClick() {
        setIsAuthFalse()
        localStorage.removeItem('token')
    }


    return (
        <header className={ s.header }>
            <div className={ s.logo }>
                <Link to="/">
                    <img className={ s.logoImg } src={ logoImg } alt="logo"/>
                </Link>
            </div>
            <div className={ s.nav }>
                <Link to="/">
                    <div className={ s.card }>
                        <img className={ s.icon } src="../../../public/Icon/home-icon.svg" alt="home"/>
                        <p className={ s.content }>Menu</p>
                    </div>
                </Link>

                <Link to="/about">
                    <div className={ s.card }>
                        <img className={ s.icon } src="../../../public/Icon/about-us-icon.png" alt="aboutAs"/>
                        <p className={ s.content }>About as</p>
                    </div>
                </Link>

                <Link to="/cart">
                    <div className={ s.card }>
                        <img className={ s.icon } src="../../../public/Icon/cart-icon.png" alt="cart"/>
                        <p className={ s.content }> { totalCartPrice }</p>
                    </div>
                </Link>

                <Link to="/favorites">
                    <div className={ s.card }>
                        <img className={ s.icon } src="../../../public/Icon/favorite-icon.png"
                             alt="favorites"/>
                        <p className={ s.content }>{ totalFavoritesCount }</p>
                    </div>
                </Link>

                <div>
                    { isAuth
                        ? (
                            <Link to='profile'>
                                <div className={ s.card }>
                                    <img className={ s.icon } src={ personalAccountImg } alt='personal account'/>
                                    <p className={ s.content }>{ username }</p>
                                </div>
                            </Link>

                        )
                        : (
                            <Link to='login'>
                                <div className={ s.card }>
                                    <img className={ s.icon } src={ loginImg } alt='login'/>
                                    <p className={ s.content }>Login</p>
                                </div>
                            </Link>
                        )
                    }
                </div>

                { isAuth && <div className={ s.card } onClick={ handleClick }>
                    <img className={ s.icon } src={ logoutImg } alt='personal account'/>
                    <p className={ s.content }>Logout</p>
                </div> }

            </div>

        </header>
    )
}
export default NavBar