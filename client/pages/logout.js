import { Result, Button, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const LogoutPage = () => {
    const router = useRouter();
    message.success("Logout Success");
    localStorage.removeItem("jwt");
    router.push("/")

    return (
        <>
            <Result
                icon={<SmileOutlined />}
                title="We have log you out the website"
                extra={<Button type="primary">Next</Button>}
            />
        </>
    )
}

export default LogoutPage