import {useForm} from "react-hook-form";
// @ts-ignore
import s from './Registration.module.css'
import {Link} from "react-router-dom";
import React from "react";
import AuthModal from "../Modal/Modal.tsx";

interface RegistrationProps {
    handleRegistration: (p: {password: string, username: string}) => void;
    error?: string
    isRegistered: boolean
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
}

interface error {
    message: string
    field: string
}

function Registration({handleRegistration, error, isRegistered, setIsRegistered}: RegistrationProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data: {password: string, username: string} ) => {
        handleRegistration({...data})
    }

    return (
        <div className={ s.form }>
            <h1 className={ s.title }>Registration</h1>
            { error?.length === 1 && <p className={ s.error }>{ error }</p> }

            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    {!Array.isArray(error) && <p className={s.error}>{error}</p>}
                    <input className={ errors.username ? `${ s.input } ${ s.errorInput }` : s.input }
                           { ...register("username", {required: true}) }
                           placeholder='введите логин'
                    />
                    {Array.isArray(error) && (
                        <p className={s.error}>
                            {error?.find((el: error) => el.field === 'username')?.message}
                        </p>
                    )}
                </div>
                <div>
                    <input className={ errors.password ? `${ s.input } ${ s.errorInput }` : s.input }
                           { ...register("password", {required: true,}) }
                           placeholder='введите пароль'
                    />
                    {Array.isArray(error) && (
                        <p className={s.error}>
                            {error?.find((el: error) => el.field === 'password')?.message}
                        </p>
                    )}
                </div>
                <button className={ s.button }>Зарегистрироваться</button>

                <p className={s.text}>Уже есть аккаунт ? <Link to='/login'>Войти</Link></p>
            </form>
            {isRegistered && <AuthModal title='Successful authorization' successfulOperation={true} setIsRegistered={setIsRegistered}/>}
        </div>
    );
}

export default Registration;