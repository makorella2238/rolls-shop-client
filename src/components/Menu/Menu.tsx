import {Link} from "react-router-dom";
import {IMenu} from "../../../types.ts";
// @ts-ignore
import s from './Menu.module.css';
import {memo} from "react";

interface MenuProps {
    menu: IMenu[]
}

const Menu = memo(({menu}: MenuProps) => {
    return (
        <div className={ s.menu }>
            { menu.map((menu) => (
                <Link to={ '/menu/' + menu.title } key={ menu._id }>
                    <div className={ s.menuItem }>
                        <img className={ s.img } src={ menu.img } alt="menuImg"/>
                        <p className={ s.title }>{ menu.title }</p>
                    </div>
                </Link>
            )) }
        </div>
    );
})

export default Menu;