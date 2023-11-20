import Registration from "./Registration.tsx";
import {useState} from "react";
import {useRegistration} from "../hooks/auth.ts";


function RegistrationAPIContainer() {
    const [error, setError] = useState('');
    const {handleRegistration} = useRegistration(setError)

    return (
        <>
            <Registration handleRegistration={handleRegistration} error={error}/>
        </>
    )
}

export default RegistrationAPIContainer