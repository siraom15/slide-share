import { Layout, Menu } from 'antd';
import {
    CloudUploadOutlined,
    GlobalOutlined,
    LockOutlined,
    TagOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const { SubMenu } = Menu;
const { Sider } = Layout;
const SideBar = ({ isLoggedIn = true, page = '1' }) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <Sider collapsible={true} width={200} collapsed={collapsed} onCollapse={()=>{setCollapsed(!collapsed)}}
            style={{
                backgroundColor: "white"
            }}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={page}
                defaultOpenKeys={['sub1']}
            >

                <Menu.Item key="1" icon={<GlobalOutlined />}>
                    <Link href="/">
                        <a>
                            Public Slide
                        </a>
                    </Link>
                </Menu.Item>
                {
                    isLoggedIn ?
                        <>
                            <Menu.Item key="2" icon={<CloudUploadOutlined />}>
                                <Link href="/upload">
                                    <a>
                                        Upload Slide
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<PushpinOutlined />}>
                                <Link href="/">
                                    <a>
                                        Saved Slide
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<LockOutlined />}>
                                <Link href="/myslide">
                                    <a>
                                        My Slide
                                    </a>
                                </Link>
                            </Menu.Item>
                        </>
                        :
                        null
                }
            </Menu>
        </Sider>
    )
}
export default SideBar;