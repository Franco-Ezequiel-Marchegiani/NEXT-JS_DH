"use client"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from "../form/SubmitButton";
import InputText from "../form/InputText";
import { AccessDeniedError } from "@/services/common/http.erros";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authApi from "@/services/auth/auth.api";
import LoginScheme from "@/schemes/login.scheme";

type FormData = {
    username: string;
    password: string;
}

const LoginForm = () =>{

    const router = useRouter ();
    const [serverError, setServerError] = useState<string | null>(null);
    //Con "methods" extraemos todo para pasar la info al Form Provider
    const methods = useForm<FormData>({
        resolver: yupResolver(LoginScheme)
      });
    //Y luego, una vez teniendo el Methods, extraemos lo que necesitemos para este form
    const {handleSubmit} = methods
      

    const onSubmit = async (data: FormData) =>{
        setServerError(null)
        try {
            const loginResponse = await authApi.login(data.username, data.password);
            console.log(JSON.stringify(loginResponse));
            router.push('/');
            router.refresh();
        } catch (error) {
            if (error instanceof AccessDeniedError) {
                setServerError("Tus credenciales son inválidas")
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
                        label="Nombre de usuario:"
                        fieldName="username"
                        inputType="text"
                        placeholder="Anakin Skywalker"
                    />
                    <InputText 
                        label="Contraseña:"
                        fieldName="password"
                        inputType="password"
                    />
                    <SubmitButton label="Iniciar Sesión" onSubmit={onSubmit} styles="mt-2" />
                    {serverError &&
                        <div className="mt-4 text-red-600">{serverError}</div>
                    }
                </form>
            </FormProvider>
    </>
}

export default LoginForm;