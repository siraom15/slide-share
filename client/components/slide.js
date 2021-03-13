import { Card, Divider, Image, Empty, Modal, Carousel } from 'antd';
const { confirm } = Modal
import {
    EyeOutlined,
    DownloadOutlined,
    UserOutlined,
    ExclamationCircleOutlined,
    PushpinOutlined 
} from '@ant-design/icons';
import Link from 'next/link'
import React, { useState } from 'react';
const { Meta } = Card;
import { useRouter } from 'next/router'
import { host } from '../config/server'


const SlideComponent = ({ _id, photos, linkUrl, describe, userId, view_count, name, createTime }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    
    const getUserName = async (userId) => {
        const payload = {
            userId: userId
        }
        await fetch(host + '/api/user/userdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json()).then(data => {
            setUsername(data.user_data.username)
        })
            .catch(err => {
                console.log(err);
                setUsername("");
            });
    }
    getUserName(userId)
    const showConfirm = () => {
        confirm({
            title: `Do you want to go to external site`,
            icon: <ExclamationCircleOutlined />,
            content: `Full Link \n${linkUrl}`,
            onOk() {
                console.log('OK');
                router.push(linkUrl)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        <>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    photos && photos[0]?.url ?
                        <div style={{ padding: '2vh' }}>
                            <Image src={photos[0].url} />
                        </div>
                        :
                        <div style={{ padding: '2vh' }}>
                            <Empty description="No Image" />
                        </div>

                }
                actions={[
                    <a onClick={showConfirm}>
                        <DownloadOutlined />
                    </a>,
                    <Link href={_id ? ("/slide/" + _id) : "#"}>
                        <a>
                            <EyeOutlined />
                        </a>
                    </Link>,
                    <Link href={_id ? ("/slide/" + _id) : "#"}>
                        <a>
                            <PushpinOutlined />
                        </a>
                    </Link>,
                ]}
            >
                <Meta title={name ? name : "No Name"} description={describe ? describe : "No Describe"} />
                <Divider>Info</Divider>
                <div>
                    <UserOutlined /> : {userId ? username : "No Author"} <br />
                    <EyeOutlined /> : {view_count ? view_count : 0} View<br />
                    {/* <CalendarOutlined /> Create : {createTime ? Date(createTime) : "No Data"}<br /> */}
                </div>
            </Card>

        </>
    )
}


export default SlideComponent;