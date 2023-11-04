import {useMutation, } from "react-query";
import {auth_request} from "../API/api.ts";

export interface IChangePassword {
    currentPassword: string
    newPassword: string
}

export const useChangePassword = (setIsChangePasswordModal:  React.Dispatch<React.SetStateAction<boolean>>,  setChangePasswordErr:React.Dispatch<React.SetStateAction<string>>) => {

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