// @ts-ignore
import s from './Modal.module.css'
import {Link} from "react-router-dom";
// @ts-ignore
import success_update from "../../../public/Icon/success_update.png";
// @ts-ignore
import failed_update from '../../../public/Icon/failed-operation-icon.png'
import React from "react";

interface AuthModalProps {
    title?: string
    description?: string
    successfulOperation?: boolean
    setUpdateProfileLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setIsChangePasswordModal?:React.Dispatch<React.SetStateAction<boolean>>
    setSuccessCreateOrder?:React.Dispatch<React.SetStateAction<boolean>>
    setIsRegistered?:React.Dispatch<React.SetStateAction<boolean>>
    operationFailed?: boolean
    setProfileFormErr?: React.Dispatch<React.SetStateAction<string>>
}

function Modal({description, title, successfulOperation, setUpdateProfileLoading, setIsChangePasswordModal, setSuccessCreateOrder, setProfileFormErr, operationFailed, setIsRegistered}: AuthModalProps) {

    const handleClickOK = () => {
        if (setUpdateProfileLoading) {
            setUpdateProfileLoading(false)
        }
        if (setIsChangePasswordModal) {
            setIsChangePasswordModal(false)
        }
        if (setSuccessCreateOrder) {
            setSuccessCreateOrder(false)
        }
        if (setIsRegistered) {
            setIsRegistered(false)
        }
        if (setProfileFormErr) {
            setProfileFormErr('')
        }
    }

    return (
        <div className={ s.Modal }>
            <div className={ s.ModalContent }>
                <div className={ s.ModalHeader }>
                    <h3 className={title ? `${s.title} ${s.titleWithClass}` : s.title }>{ title ? title : "Авторизация необходима" }</h3>
                    { successfulOperation && <img className={ s.success_img } src={ success_update } alt="success"/> }
                    { operationFailed && <div className={s.failedContainer}><img className={ s.failed_update } src={ failed_update } alt="failed_update"/></div>}
                </div>


                <div className={ s.ModalBody }>
                    <p>
                        {(!operationFailed) && (!successfulOperation) && (description ? description : 'Для просмотра данной страницы необходимо войти на сайт. Пожалуйста,выполните вход или зарегистрируйтесь.') }
                    </p>
                </div>

                { successfulOperation || operationFailed
                    ? <div className={ s.ModalFooter }>
                        <button className={ s.CloseButton } onClick={ handleClickOK }>
                            ОК
                        </button>
                    </div>
                    : <Link to={ title ? '/' : '/login' }>
                        <div className={ s.ModalFooter }>
                            <button className={ s.CloseButton }>
                                ОК
                            </button>
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
}

export default Modal;