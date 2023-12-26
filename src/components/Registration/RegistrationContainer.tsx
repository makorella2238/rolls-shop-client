import Registration from "./Registration.tsx";
import {useState} from "react";
import {useRegistration} from "../hooks/auth.ts";


function RegistrationAPIContainer() {
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const {handleRegistration} = useRegistration(setError, setIsRegistered)

    return (
        <>
            <Registration handleRegistration={handleRegistration} error={error} isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>
        </>
    )
}

export default RegistrationAPIContainer