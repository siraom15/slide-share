import Link from 'next/link'
import { Row, Col, Card, Form, Input, Button, Checkbox, Typography, message, Divider } from 'antd'
import Head from 'next/head';
const { Text, Title } = Typography;
const { ArrowLeftOutlined } = require('@ant-design/icons')
import { host } from '../config/server'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

const divStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Login = () => {
    const router = useRouter();
    const onFinish = (values) => {
        const payload = { ...values }
        fetch(host + '/api/user/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    message.error(data.error);
                } else {
                    message.success(data.success);
                    Cookies.set('token', data.token);
                    router.push("/")
                }
            })
            .catch(err => {
                console.log(err);
                message.error("Server Timeout");
            })
    };

    return (
        <>
            <Head>
                <title>Login | Slide Share</title>
            </Head>
            <Row>
                <Col xs={0} sm={0} md={0} lg={10} xl={14} style={{ ...divStyle, backgroundImage: "url('/img/login-side.jpg'" }}>

                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={10} style={{ padding: '10vh' }}>
                    <Divider>Login</Divider>
                    <Row>
                        <Col span={24}>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: false,
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {

                                            required: true,
                                            message: 'Please Input email',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Please input valid email'
                                        }
                                    ]}
                                >
                                    <Input autoFocus={true} />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" block>Login</Button>
                                </Form.Item>
                            </Form>
                            <Divider>Or</Divider>
                            <Text> Do not have an account ?
                            <Link href="/signup">
                                    <a>Sign Up</a>
                                </Link>
                            </Text>
                        </Col>
                    </Row>

                </Col>
            </Row>

        </>
    )
}

export default Login