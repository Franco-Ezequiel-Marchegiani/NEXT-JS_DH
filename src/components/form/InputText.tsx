import { useFormContext } from "react-hook-form";

type InputTextProps = {
    label: string,
    fieldName: string,
    inputType: string,
    placeholder?: string,
    styles?: string,
}

const InputText = ({label, fieldName, inputType, placeholder, styles}: InputTextProps) =>{
    const {register, formState: {errors}} = useFormContext();
    return <>
            <div className={`flex flex-col ${styles ?? ''}`}>
                <label className="mb-2">{label}</label>
                <input 
                    {...register(fieldName)}
                    type={inputType} 
                    placeholder={placeholder} 
                    className="p-4 mb-2 rounded bg-gray-50 border border-gray-200" />
                {errors && errors[fieldName] && 
                    <div className="text-red-600">
                        Este campo es obligatorio
                    </div> 
                }
            </div>
    </>
}

export default InputText;