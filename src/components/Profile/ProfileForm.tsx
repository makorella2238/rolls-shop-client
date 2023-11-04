import {useForm} from "react-hook-form";
// @ts-ignore
import s from './Profile.module.css';
import {IProfile} from "../hooks/profile.ts";
import AuthModal from "../AuthModal/AuthModal.tsx";

interface fields {
    label: string
    name: string
    validation: {
        required?: string
        maxLength?: {
            value: number,
            message: string
        }
        pattern?: {
            value: RegExp,
            message: string
        }
    }
}

interface ProfileFormProps {
    fields: fields[]
    profile: IProfile
    onSubmit: (data: any) => void
    updateProfileLoading: boolean
    setUpdateProfileLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileForm = ({onSubmit, fields, profile, updateProfileLoading, setUpdateProfileLoading}: ProfileFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form className={ s.form } onSubmit={ handleSubmit(onSubmit) }>
            { fields.map((field) => (
                <div className={ s.formGroup } key={ field.name }>
                    <label htmlFor={ field.name } className={ errors[field.name] ? s["error-label"] : s.label }>
                        { field.label }
                    </label>
                    <input
                        type="text"
                        id={field.name}
                        defaultValue={profile[field.name]}
                        {...register(field.name, field.validation)}
                        className={`${s.input} ${s.border}`}
                    />
                    { errors[field.name] && (
                        <span className={ s.error }>
                            { errors[field.name].message }
                            { errors[field.name].maxLength && ` ${ errors[field.name].maxLength.message }` }
                         </span>
                    ) }
                </div>
            )) }
            <button type="submit" className={ s.button }>Сохранить</button>
            { updateProfileLoading && <AuthModal
                title="Данные успешно сохранены"
                successfulOperation={ true }
                setUpdateProfileLoading={setUpdateProfileLoading}
            /> }
        </form>
    );
};

export default ProfileForm;