import {useForm} from "react-hook-form";
// @ts-ignore
import s from './Registration.module.css'
import {Link} from "react-router-dom";

interface RegistrationProps {
    handleRegistration: (p: any) => void;
    error?: string
}

interface error {
    message: string
    field: string
}

function Registration({handleRegistration, error}: RegistrationProps) {
    debugger
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
        handleRegistration({...data})
    }

    return (
        <div className={ s.form }>
            <h1 className={ s.title }>Registration</h1>
            { error?.length === 1 && <p className={ s.error }>{ error }</p> }

            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <input className={ errors.username ? `${ s.input } ${ s.errorInput }` : s.input }
                           { ...register("username", {required: true}) }
                           placeholder='введите логин'
                    />
                    {error?.length > 1 && <p className={s.error}>{error?.find((el: error) => el.field === 'username').message }</p>}
                </div>
                <div>
                    <input className={ errors.password ? `${ s.input } ${ s.errorInput }` : s.input }
                           { ...register("password", {required: true,}) }
                           placeholder='введите пароль'
                    />
                    {error?.length > 1 && <p className={s.error}>{error?.find((el: error) => el.field === 'password').message }</p>}
                </div>
                <button className={ s.button }>Зарегистрироваться</button>

                <p className={s.text}>Уже есть аккаунт ? <Link to='/login'>Войти</Link></p>
            </form>
        </div>
    );
}

export default Registration;