import Link from 'next/link'

import { Layout, Menu } from 'antd';
import {
    CloudUploadOutlined,
    UserAddOutlined,
    LoginOutlined,
    FileFilled,
    LogoutOutlined
} from '@ant-design/icons';
const { Header } = Layout;
const Navbar = ({ isLoggedIn = false }) => {
    return (
        <Header className="header" style={{ padding:0 }}>
            <Menu theme="white" mode="horizontal" >
                <Menu.Item icon={<FileFilled />}>
                    <Link href="/">
                        <a>Slide Share</a>
                    </Link>
                </Menu.Item>
                {/* <>
                        <Menu.Item key="1" icon={<LoginOutlined />}>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserAddOutlined />}>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </Menu.Item>
                    </> */}
                {isLoggedIn ?
                    <>
                        <Menu.Item key="3" icon={<CloudUploadOutlined />}>
                            <Link href="/upload">
                                <a>Upload</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<LogoutOutlined />}>
                            <Link href="/logout">
                                <a>Logout</a>
                            </Link>
                        </Menu.Item>
                    </> :
                    <>
                        <Menu.Item key="1" icon={<LoginOutlined />}>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserAddOutlined />}>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </Menu.Item>
                    </>}


            </Menu>
        </Header>
    )
}
export default Navbar