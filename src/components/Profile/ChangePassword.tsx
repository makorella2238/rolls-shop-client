import {useForm} from "react-hook-form";
// @ts-ignore
import s from './Profile.module.css';
import AuthModal from "../Modal/Modal.tsx";
// @ts-ignore

interface ChangePasswordFormProps {
    onSubmit: (data: never) => void
    isChangePasswordModal: boolean
    setIsChangePasswordModal: React.Dispatch<React.SetStateAction<boolean>>
    changePasswordErr: string
}

const ChangePasswordForm = ({
                                onSubmit,
                                isChangePasswordModal,
                                setIsChangePasswordModal,
                                changePasswordErr
                            }: ChangePasswordFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form className={ s.form } onSubmit={ handleSubmit(onSubmit) }>
            <div className={ s.formGroup }>
                <input
                    type="password"
                    id="current-password"
                    className={ errors.currentPassword ? `${ s.input } ${ s.errorInput }` : s.input }
                    placeholder='Текущий пароль'
                    { ...register('currentPassword', {
                        required: 'Поле действующего пароля обязательно для заполнения'
                    }) }
                />
            </div>

            <div className={ s.formGroup }>
                <input
                    type="password"
                    id="new-password"
                    className={ errors.newPassword ? `${ s.input } ${ s.errorInput }` : s.input }
                    placeholder='Новый пароль'
                    { ...register('newPassword', {
                        required: 'Поле нового пароля обязательно для заполнения',
                        maxLength: {
                            value: 20,
                            message: "Новый пароль не может быть более 20 символов"
                        },
                        minLength: {
                            value: 6,
                            message: "Новый пароль должен быть более 6 символов"
                        }
                    }) }
                />
                { errors.newPassword && <span className={ s.error }>{ errors.newPassword.message }</span> }
                <div>{ changePasswordErr && <span className={ s.error }>{ changePasswordErr }</span> }</div>
            </div>

            <button type="submit" className={ s.button }>Изменить пароль</button>
            { isChangePasswordModal && (
                <AuthModal
                    setIsChangePasswordModal={ setIsChangePasswordModal }
                    title="Пароль успешно изменен"
                    successfulOperation={ true }
                />
            ) }
        </form>
    );
};

export default ChangePasswordForm;