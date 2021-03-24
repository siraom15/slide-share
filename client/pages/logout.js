import { Result, Button, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const LogoutPage = () => {
    const router = useRouter();
    const clearToken = () =>{
        Cookies.remove("token");
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