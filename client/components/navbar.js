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
        <Header className="header"
            style={{ 
                padding: 0,
            }}
        >
            <Menu theme="white" mode="horizontal" style={{
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                color:"white",
                backgroundColor:'black',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' 

            }} >
                <Menu.Item icon={<FileFilled />} >
                    <Link href="/">
                        <a style={{color:'white'}}>Slide Share</a>
                    </Link>
                </Menu.Item>
                {isLoggedIn ?
                    <>
                        <Menu.Item key="3" icon={<CloudUploadOutlined />}>
                            <Link href="/upload">
                                <a style={{color:'white'}}>Upload</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<LogoutOutlined />}>
                            <Link href="/logout">
                                <a style={{color:'white'}}>Logout</a>
                            </Link>
                        </Menu.Item>
                    </> :
                    <>
                        <Menu.Item key="1" icon={<LoginOutlined />}>
                            <Link href="/login">
                                <a style={{color:'white'}}>Login</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserAddOutlined />}>
                            <Link href="/signup">
                                <a style={{color:'white'}}>Sign Up</a>
                            </Link>
                        </Menu.Item>
                    </>}


            </Menu>
        </Header>
    )
}
export default Navbar