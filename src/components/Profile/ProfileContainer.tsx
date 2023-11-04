import {connect} from "react-redux";
import {isAuth, username} from "../Redux/app/app-selector.ts";
import {Profile} from "./Profile.tsx";
import AuthModal from "../AuthModal/AuthModal.tsx";
import {useDeleteProfile, useGetProfile, useUpdateProfile} from "../hooks/profile.ts";
import Preloader from "../common/Preloader/Preloader.tsx";
import {useState} from "react";
import {useChangePassword} from "../hooks/auth.ts";

interface ProfileContainerProps {
    isAuth: boolean;
    username: string
}

const ProfileContainer = ({isAuth, username}: ProfileContainerProps) => {
    if (!isAuth) {
        return <AuthModal/>
    }
    const {data, isFetching, error} = useGetProfile()

    const [updateProfileLoading, setUpdateProfileLoading] = useState(false)
    const [isChangePasswordModal, setIsChangePasswordModal] = useState(false)
    const [deleteProfileLoading, setDeleteProfileLoading] = useState(false)
    const [changePasswordErr, setChangePasswordErr] = useState('')
    const [profileFormErr, setProfileFormErr] = useState('')

    const {handleUpdateProfile} = useUpdateProfile(setUpdateProfileLoading, setProfileFormErr)
    const {handleChangePassword} = useChangePassword(setIsChangePasswordModal, setChangePasswordErr)
    const {handleDeleteProfile} = useDeleteProfile(setDeleteProfileLoading)

    if (isFetching) {
        return <Preloader/>;
    }

    if (error) {
        // @ts-ignore
        return <p>{ error }</p>;
    }
    return (
        // @ts-ignore
        <Profile profile={ data } username={ username } handleUpdateProfile={ handleUpdateProfile }
                 updateProfileLoading={ updateProfileLoading }
                 setUpdateProfileLoading={ setUpdateProfileLoading } handleChangePassword={ handleChangePassword }
                 setIsChangePasswordModal={ setIsChangePasswordModal }
                 isChangePasswordModal={ isChangePasswordModal } changePasswordErr={ changePasswordErr }
                 deleteProfileLoading={ deleteProfileLoading }
                 handleDeleteProfile={ handleDeleteProfile } setDeleteProfileLoading={ setDeleteProfileLoading }
                 profileFormErr={profileFormErr} setProfileFormErr={setProfileFormErr}/>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state),
        username: username(state)
    };
};
export default connect(mapStateToProps, {})(ProfileContainer);