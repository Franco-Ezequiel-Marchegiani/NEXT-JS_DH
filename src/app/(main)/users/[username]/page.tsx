const UserPage = ({params}: {params: {username: string}}) =>{
    return <div>
            Nombre de Usuario:{params.username} 
        </div>
}
export default UserPage