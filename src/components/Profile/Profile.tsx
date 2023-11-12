// @ts-ignore
import s from './Profile.module.css';
import ProfileForm from './ProfileForm';
import ChangePasswordForm from './ChangePassword.tsx';
import {IChangePassword} from "../hooks/auth.ts";
import {IProfile} from "../hooks/profile.ts";
import Preloader from "../common/Preloader/Preloader.tsx";
// @ts-ignore
import historyIcon from '../../assets/Icon/history-icon.png'
import {Link} from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal.tsx";
import React from "react";

interface ProfileProps {
    profile: never
    username: string
    handleUpdateProfile: (firstName: string, lastName: string, phone: string, email: string) => void
    updateProfileLoading: boolean
    setUpdateProfileLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleChangePassword: ({currentPassword, newPassword}: IChangePassword) => void
    setIsChangePasswordModal: React.Dispatch<React.SetStateAction<boolean>>
    isChangePasswordModal: boolean
    deleteProfileLoading: boolean
    handleDeleteProfile: () => void
    setDeleteProfileLoading: React.Dispatch<React.SetStateAction<boolean>>
    changePasswordErr: string
    profileFormErr: string
    setProfileFormErr: React.Dispatch<React.SetStateAction<string>>
}

export const Profile = ({
                            profile, username, updateProfileLoading, handleUpdateProfile, setUpdateProfileLoading,
                            isChangePasswordModal, setIsChangePasswordModal, handleChangePassword, changePasswordErr,
                            setDeleteProfileLoading, deleteProfileLoading, handleDeleteProfile, profileFormErr,
                            setProfileFormErr
                        }: ProfileProps) => {
    function handleEditProfileSubmit(data: IProfile) {
        // @ts-ignore
        handleUpdateProfile({...data})
        setUpdateProfileLoading(false)
    }

    function handleChangePasswordSubmit(data: IChangePassword) {
        handleChangePassword({...data})
        setIsChangePasswordModal(false)
    }

    const nameValidation = {
        required: "Поле имени обязательно для заполнения",
        maxLength: {
            value: 20,
            message: "Имя не может быть длиннее 20 символов"
        }
    };

    const lastNameValidation = {
        required: "Поле Фамилии обязательно для заполнения",
        maxLength: {
            value: 20,
            message: "Фамилия не может быть длиннее 20 символов"
        }
    };
    const phoneValidation = {
        required: "Поле телефона обязательно для заполнения",
        pattern: {
            value: /^\+7\d{10}$/,
            message: "Некорректный формат телефона (+7 и 10 цифр)"
        }
    };
    const emailValidation = {
        required: "Поле email обязательно для заполнения",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный формат email",
        }
    };

    const profileFields = [
        {label: "Имя", name: "firstName", validation: nameValidation},
        {label: "Фамилия", name: "lastName", validation: lastNameValidation},
        {label: "Телефон", name: "phone", validation: phoneValidation},
        {label: "Email", name: "email", validation: emailValidation},
    ];

    function handleDeleteProfileClick() {
        handleDeleteProfile()
        setDeleteProfileLoading(true)
    }

    return (
        <div className={ s.profile }>
            <h1 className={ s.heading }>Профиль { username }</h1>

            <div className={ s.section }>
                <div className={ s.profileFormHeader }>
                    <h2 className={ s.subheading }>Изменение данных</h2>
                    <p onClick={ handleDeleteProfileClick } className={ s.deleteProfile }>Очистить данные</p>
                </div>
                <ProfileForm onSubmit={ handleEditProfileSubmit } fields={ profileFields } profile={ profile }
                             updateProfileLoading={ updateProfileLoading }
                             setUpdateProfileLoading={ setUpdateProfileLoading }
                />
            </div>

            <div className={ s.section }>
                <h2 className={ s.subheading }>Изменение пароля</h2>
                <ChangePasswordForm onSubmit={ handleChangePasswordSubmit }
                                    isChangePasswordModal={ isChangePasswordModal }
                                    setIsChangePasswordModal={ setIsChangePasswordModal }
                                    changePasswordErr={ changePasswordErr }/>

            </div>
            <Link to='/order'>
                <div className={ s.section }>
                    <div className={ s.historyOrder }>
                        <h2 className={ s.subheading }>История заказов</h2>
                        <img className={ s.icon } src={ historyIcon } alt="history_order"/>
                    </div>
                </div>
            </Link>
            { deleteProfileLoading && <Preloader/> }
            {profileFormErr && <AuthModal title={profileFormErr} setProfileFormErr={setProfileFormErr} operationFailed={true}/> }
        </div>
    );
};