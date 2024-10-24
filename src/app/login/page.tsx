import LoginForm from "@/components/Auth/LoginForm";


const LoginPage = () =>{
    return <>
        <div className="flex items-center w-full flex-col">
            <h2 className="mb-2">Iniciar sesión a la red social</h2>
            <LoginForm/>
        </div>
    </>
}
export default LoginPage