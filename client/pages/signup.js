import Head from 'next/head';
import Link from 'next/link'
const { Row, Col, Card, Form, Input, Button, Checkbox, Typography, message, Divider } = require('antd');
const { Text } = Typography;
const { ArrowLeftOutlined } = require('@ant-design/icons')
import { useRouter } from 'next/router'
import { host } from '../config/server'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};
const tailLayoutBtn = {
    wrapperCol: { offset: 0, span: 24 },
};

const divStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const SignUp = () => {
    const router = useRouter()
    const onFinish = (values) => {
        fetch(host+'/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(data => {
            if (data.success){
                message.success(data.success)
                router.push('/login')
            }
            else
                message.error(data.error)
        }).catch(err => {
            console.log(err);
            message.error("Server Timeout");
        })


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("Sign Up Failure")
    };

    return (
        <>
            <Head>
                <title>Sign Up | Slide Share</title>
            </Head>
            <Row>
                <Col xs={24} sm={24} md={24} lg={14} xl={12} style={{ padding: '10vh' }}>
                    <Divider>Sign Up</Divider>
                    <Row>
                        <Col span={24}>
                            <Form
                                {...layout}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
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
                                            message : 'Please input valid email'
                                        }
                                    ]}
                                >
                                    <Input placeholder="email" />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="password" />
                                </Form.Item>

                                <Form.Item
                                    label="RE Password"
                                    name="repassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your re-password',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="re-password" />
                                </Form.Item>

                                {/* <Form.Item {...tailLayout} name="term" >
                                    <Checkbox>I agree to the terms of service and privacy policy.</Checkbox>
                                </Form.Item> */}

                                <Form.Item {...tailLayout} >
                                    <Button type="default" style={{ color: 'white', backgroundColor: 'orange' }} htmlType="submit" block >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Divider>Or</Divider>
                            <center>
                                <Text> Have an account ?
                                    <Link href="/login" >
                                        <a style={{ color: 'orange' }}>Login</a>
                                    </Link>
                                </Text>
                            </center>

                        </Col>
                    </Row>

                </Col>
                <Col xs={0} sm={0} md={0} lg={10} xl={12} style={{ ...divStyle, backgroundImage: "url('/img/sign-up.png'" }}>

                </Col>
            </Row>
        </>

    )
}

export default SignUp