import { FC, PropsWithChildren } from "react";

const UsersLayOut: FC<PropsWithChildren> = ({children}) =>{
    return <>
        <div>
            ENCABEZADO MAIN
        </div>
        {children}
        <div>
          PIE DE PÁGINA MAIN
        </div>    
        </>
}

export default UsersLayOut;