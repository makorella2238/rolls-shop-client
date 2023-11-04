import {Route, Routes} from 'react-router-dom';
import AboutAs from "./AboutAs/AboutAs";
import MenuContainer from "./Menu/MenuContainer.tsx"
import Preloader from "./common/Preloader/Preloader.tsx";
import './App.css'
import BaseComponentContainer from "./BaseComponent/BaseComponentContainer.tsx";
import FavoritesContainer from "./Favorites/FavoritesContainer.tsx";
import NavBarContainer from "./NavBar/NavBarContainer.tsx";
import CartContainer from "./Cart/CartContainer.tsx";
import LoginContainer from "./Login/LoginContainer.tsx";
import RegistrationContainer from "./Registration/RegistrationContainer.tsx";
import MenuOneElementContainer from "./MenuOneElement/MenuOneElementContainer.tsx";
import MenuElementsContainer from "./MenuElements/MenuElementsContainer.tsx";
import ProfileContainer from "./Profile/ProfileContainer.tsx";
import OrderContainer from "./Order/OrderContainer.tsx";

interface AppProps {
    initialized:boolean
}
const App = ({initialized}: AppProps) => {
    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className='card-wrapper'>
            <NavBarContainer/>
            <MenuContainer/>
            <main className='card-wrapper-content'>
                <Routes>
                    <Route path="/" element={<MenuElementsContainer/>}/>
                    <Route path="/menu/:title" element={<BaseComponentContainer/>}/>
                    <Route path="/menu/:title/:id" element={<MenuOneElementContainer/>}/>
                    <Route path="/profile" element={<ProfileContainer/>}/>
                    <Route path="/order" element={<OrderContainer/>}/>
                    <Route path="/cart" element={<CartContainer/>}/>
                    <Route path="/favorites" element={<FavoritesContainer/>}/>
                    <Route path="/about" element={<AboutAs/>}/>
                    <Route path="/login" element={<LoginContainer/>}/>
                    <Route path="/registration" element={<RegistrationContainer/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App