/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
            protocol: 'http',
            hostname: 't1-gstatic.com',
            port: '',
            pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/**'
                },
        ]
    },
    //Función ya establecida de Next, para direccionar al usuario a una ruta
    async redirects(){
        return [{
            source: "/messages", //Ruta la cual el usuario debe escribir para ser redirecto
            destination: "/", //Destino el cual se le enviará al usuario
            permanent: true //Valor siempre en true para que siempre se aplique esta regla
        }]
    }
};

export default nextConfig;
