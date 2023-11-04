import {useForm} from "react-hook-form"
// @ts-ignore
import s from './Login.module.css'
import {Link} from "react-router-dom";

interface LoginProps {
    handleLogin: (password: string, username: string) => void;
    error: string
}

function Login({handleLogin, error}: LoginProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data: any) => {
        const {password, username} = data
        // @ts-ignore
        handleLogin({password, username})
    }
    return (
        <div className={s.form}>
            <h1 className={s.title}>Login</h1>
            {error &&  <p className={s.error}>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input className={errors.username ? `${s.input} ${s.errorInput}` : s.input}
                           {...register("username", {required: true})}
                           placeholder='введите логин'
                    />
                </div>
                <div>
                    <input className={errors.username ? `${s.input} ${s.errorInput}` : s.input}
                           {...register("password", {required: true})}
                           placeholder='введите пароль'
                    />
                </div>
                <button className={s.button}>Войти</button>
                <div className={s.text}>Нету аккаунта ? <Link to='/registration'><p className={s.registration}> Зарегестрироваться</p></Link></div>
            </form>
        </div>
    );
}

export default Login;