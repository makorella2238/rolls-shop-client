// @ts-ignore
import mainPhoto from '../../assets/aboutUs/main.jpg'
// @ts-ignore
import guestsPhoto from '../../assets/aboutUs/guests.jpg'
// @ts-ignore
import s from './AboutAs.module.css'

export default function AboutUs() {

    return (
        <div className={s.about}>
            <h1>О нас</h1>

            <div className={s.welcome}>
                <div className={s.description}>
                    Добро пожаловать в SUSHI! Мы рады предложить вам большой выбор
                    вкуснейших блюд японской кухни - суши, роллы, супы и десерты.

                    <br/>
                    <br/>

                    Наш ресторан был основан в 2020 году. Мы гордимся тем, что используем
                    только свежие и натуральные ингредиенты от проверенных поставщиков.
                    Все блюда готовятся вручную опытными поварами.

                    <br/>
                    <br/>

                    Мы ценим каждого гостя и стремимся сделать каждое посещение
                    нашего ресторана приятным. Наш дружелюбный персонал всегда
                    поможет с выбором и быстро обслужит вас.

                    <br/>
                    <br className=''/>

                    Наше меню включает в себя разнообразные виды суши и роллов с лососем, тунцом, креветками, огурцом, авокадо и другими ингредиентами.
                    Мы предлагаем как классические, так и авторские роллы с необычными сочетаниями начинок.
                </div>
                <div className={s.photos}>
                    <img className={s.mainPhoto} src={mainPhoto} alt="mainPhoto"/>
                    <img className={s.mainPhoto} src={guestsPhoto} alt="guestsPhoto"/>
                </div>
            </div>

            <p className={s.address}>
                Приходите к нам отведать вкуснейшей японской кухни! Мы ежедневно
                открыты с 11:00 до 23:00. Ждем вас по адресу: <b>г. Москва, ул. Пушкина, д. 5</b>
            </p>

        </div>
    )

}