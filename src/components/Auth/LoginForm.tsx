"use client"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SubmitButton from "../form/SubmitButton";
import InputText from "../form/InputText";

type FormData = {
    username: string;
    password: string;
}

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
})

const LoginForm = () =>{
    //Con "methods" extraemos todo para pasar la info al Form Provider
    const methods = useForm<FormData>({
        resolver: yupResolver(schema)
      });
    //Y luego, una vez teniendo el Methods, extraemos lo que necesitemos para este form
    const {handleSubmit} = methods
      

    const onSubmit = (data: FormData) =>{
        console.log(JSON.stringify(data));
        
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
                </form>
            </FormProvider>
    </>
}

export default LoginForm;