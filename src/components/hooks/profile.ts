import {useMutation, useQuery, useQueryClient} from "react-query";
import {profile_request} from "../API/api.ts";

export const useGetProfile = () => {
    return useQuery('getProfile', profile_request.getProfile)
}

export interface IProfile {
    firstName: string
    lastName: string
    phone: string
    email: string
}

export const useUpdateProfile = (setUpdateProfileLoading: React.Dispatch<React.SetStateAction<boolean>>, setProfileFormErr: React.Dispatch<React.SetStateAction<string>>) => {
    const queryClient = useQueryClient();

    const updateCartItemCount = useMutation(profile_request.updateProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries('getProfile');
            setUpdateProfileLoading(true)
        },
        onError: (err: any) => {
            setProfileFormErr(err.response.data.message)
        }

    });

    const handleUpdateProfile = ({firstName, lastName, phone, email}: IProfile) => {
        updateCartItemCount.mutate({firstName, lastName, phone, email});
    }
    return {handleUpdateProfile}
}
export const useDeleteProfile = (setDeleteProfileLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();

    const deleteProfile = useMutation(profile_request.deleteProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries('getProfile');
            setDeleteProfileLoading(false)
        },
    });

    const handleDeleteProfile = ( )=> {
        deleteProfile.mutate();
    }
    return {handleDeleteProfile}
}