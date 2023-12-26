import {useMutation,} from "react-query";
import {auth_request} from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import React from "react";

export interface IChangePassword {
    currentPassword: string
    newPassword: string
}

export const useRegistration = (setError: React.Dispatch<React.SetStateAction<string>>, setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>) => {
    const navigate = useNavigate()
    const registration = useMutation(auth_request.registration, {
        onSuccess: () => {
            setIsRegistered(true)
            navigate('/login')
        },
        onError: (error: never) => {
            setError(
                error.response.data.message
                    ? error.response.data.message
                    : error.response.data.errors.length > 1
                        ? error.response.data.errors.map((err: never) => {
                            return ({
                                message: err.msg,
                                field: err.path
                            })
                        })
                        : error.response.data.errors[0].msg
            )
        }
    });

    const handleRegistration = ({password, username}) => {
        registration.mutate({password, username})
    }
    return {handleRegistration}
}

export const useChangePassword = (setIsChangePasswordModal: React.Dispatch<React.SetStateAction<boolean>>, setChangePasswordErr: React.Dispatch<React.SetStateAction<string>>) => {

    const createCartItem = useMutation(auth_request.changePassword, {
        onSuccess: () => {
            setIsChangePasswordModal(true)
        },
        onError: (error) => {
            // @ts-ignore
            setChangePasswordErr(error.response.data.message)
        }
    });
    // @ts-ignore
    const handleChangePassword = ({currentPassword, newPassword}: IChangePassword) => {
        createCartItem.mutate({currentPassword, newPassword});

    }
    return {handleChangePassword}
}