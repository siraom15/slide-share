import { Result, Button, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const LogoutPage = () => {
    const router = useRouter();
    const clearToken = () =>{
        localStorage.removeItem("jwt");
        router.push("/")
    }
    useEffect(()=>{
        message.success("Logout Success");
        clearToken()
    },[])
    return (
        <>
        </>
    )
}

export default LogoutPage;