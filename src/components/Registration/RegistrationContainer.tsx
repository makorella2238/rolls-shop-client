import Registration from "./Registration.tsx";
import {useMutation} from "react-query";
import {auth_request} from "../API/api.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


function RegistrationAPIContainer() {
    const navigate = useNavigate()
    const [error, setError] = useState('');

    const registration =  useMutation(auth_request.registration, {
        onSuccess: () => {
            navigate('/login')
        },
        onError: (error: any) => {
            setError(error.response.data.message || error.response.data.errors.length > 1
                ? error.response.data.errors.map((err: any) => {
                 return ({
                         message: err.msg,
                         field: err.path
                     })
                })
                : error.response.data.errors[0].msg)
        }
    });

    // @ts-ignore
    const handleRegistration = ({password , username})  => {
        // @ts-ignore
        registration.mutate({password, username})
    }

    return (
        <>
            <Registration handleRegistration={handleRegistration} error={error}/>
        </>
    )
}

export default RegistrationAPIContainer