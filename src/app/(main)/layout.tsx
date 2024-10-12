import Menu from "@/components/menu/Menu";
import { FC, PropsWithChildren } from "react";

const LINKS = [
  {title: 'Inicio', href:'/',},
  {title: 'Explorar', href:'/explorar',},
  {title: 'Perfil', href:'/mi-prefil',},
] 

const UsersLayOut: FC<PropsWithChildren> = ({children}) =>{
    return <>
        <div className="w-full h-full grid grid-cols-12">
            <div className="col-span-3">
              <Menu links={LINKS}/>
            </div>
            <main className="col-span-6">
              {children}
            </main>
            <div className="col-span-3">
              PIE DE PÁGINA MAIN
            </div>    
        </div>
        </>
}

export default UsersLayOut;