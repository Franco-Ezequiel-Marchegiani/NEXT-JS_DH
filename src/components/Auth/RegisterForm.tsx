"use client"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SubmitButton from "../form/SubmitButton";
import InputText from "../form/InputText";

type FormData = {
    username: string;
    password: string;
    name: string;
    photoUrl: string;
}

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    photoUrl: yup.string().required(),
})

const RegisterForm = () =>{
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
      });

    const {handleSubmit} = methods

    const onSubmit = (data: FormData) =>{
        console.log(JSON.stringify(data));
        
    }
    return <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <InputText
                        label="Tu nombre completo:"
                        fieldName="name"
                        inputType="text"
                        placeholder="Anakin Skywalker"
                    />
                    <InputText
                        label="La URL de tu foto de perfil:"
                        fieldName="photoUrl"
                        inputType="text"
                        placeholder="https://..."
                        styles="mt-2"
                    />
                    <InputText
                        label="Nombre de usuario:"
                        fieldName="username"
                        inputType="text"
                        placeholder="Anakin Skywalker"
                        styles="mt-2"
                    />
                    <InputText 
                        label="Contraseña:"
                        fieldName="password"
                        inputType="password"
                        styles="mt-2"
                    />

                    <SubmitButton label="Crear cuenta" onSubmit={onSubmit} styles="mt-2" />
                </form>
            </FormProvider>
    </>
}

export default RegisterForm;