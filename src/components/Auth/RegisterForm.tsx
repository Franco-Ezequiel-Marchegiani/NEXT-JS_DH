"use client"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from "../form/SubmitButton";
import InputText from "../form/InputText";
import RegisterScheme from "@/schemes/register.scheme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authApi from "@/services/auth/auth.api";
import { ConflictError } from "@/services/common/http.erros";

type FormData = {
    username: string;
    password: string;
    name: string;
    photoUrl: string;
}


const RegisterForm = () =>{

    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const methods = useForm<FormData>({
        resolver: yupResolver(RegisterScheme)
      });

    const {handleSubmit} = methods

    const onSubmit = async (data: FormData) =>{
        console.log(JSON.stringify(data));
        setServerError(null)
        try {
            const loginResponse = await authApi.register(data.username, data.password, data.name, data.photoUrl);
            console.log(JSON.stringify(loginResponse));
            router.push('/');
            router.refresh();
        } catch (error) {
            if (error instanceof ConflictError) {
                setServerError("El nombre de usuario ya existe")
            }else{
                setServerError("Ocurrió un error, intenta más tarde")
            }
        }
        return false      
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
                    {serverError &&
                        <div className="mt-4 text-red-600">{serverError}</div>
                    }
                </form>
            </FormProvider>
    </>
}

export default RegisterForm;