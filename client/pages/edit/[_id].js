// import Link from 'next/link';
import Head from 'next/head'
import {
    Layout,
    Image,
    Row,
    Col,
    Card,
    message,
    PageHeader,
    Empty,
    Modal,
    Typography,
    Button,
    Switch,
    Divider,
    Popconfirm
} from 'antd';
const { Paragraph, Title } = Typography;
const { Meta } = Card;
const { confirm } = Modal
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
const { Content } = Layout;
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { host } from '../../config/server'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const EditSlide = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [slideData, setSlideData] = useState(undefined);
    const [slideName, setSlideName] = useState("");
    const [slideDescribe, setSlideDescribe] = useState("");
    const [slideLinkUrl, setSlideLinkUrl] = useState("");
    const [slidePhoto, setSlidePhoto] = useState("");
    const [slidePublic, setSlidePublic] = useState("");

    const UpdateData = async () => {
        const payload = {
            "name": slideName,
            "describe": slideDescribe,
            "linkUrl": slideLinkUrl,
            "public": slidePublic
        }
        await fetch(host + "/api/slide/update/" + _id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    return message.error(data.error)
                }
                message.success(data.success)

            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteSlide = async () => {
        await fetch(host + "/api/slide/delete/" + _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) return message.error(data.error)
                message.success(data.success);
                router.push('/myslide');
            })
            .catch(err => {
                console.log(err);
                return message.error("Something Wrong");
            })
    }

    const fetchData = async (force = false) => {
        if (slideData && !force) return;
        let payload = { _id: _id };
        await fetch(host + "/api/slide/getSlideById", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setSlideData(res.data);
                setSlideName(res.data.name);
                setSlideDescribe(res.data.describe);
                setSlideLinkUrl(res.data.linkUrl);
                setSlidePublic(res.data.public);
                if(force) return message.success("Reset Success");
            })
            .catch(err => {
                // message.error("Server Down")
                return null
            })
    }

    fetchData();
    useEffect(async () => {
        console.log("useEffect");
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Edit | Slide Share</title>
            </Head>
            <Layout >
                <Navbar />
                <Content >
                    <Layout>
                        <SideBar page="4" />
                        <Content>
                            <Row>
                                <Col span={24}>
                                    <Card style={{ width: "100%" }}>
                                        <PageHeader
                                            className="site-page-header"
                                            onBack={() => { router.push("/myslide") }}
                                            title="Edit Slide"
                                        />
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                                {
                                                    (slideData?.photos && slideData?.photos[0]?.url) ?
                                                        <div style={{ padding: '2vh' }}>
                                                            <Image src={slideData.photos[0].url} style={{
                                                                width: '100',
                                                                height: 'auto',
                                                                maxHeight: '50vh',
                                                                maxWidth: '50vh'
                                                            }} />
                                                        </div>
                                                        :
                                                        <div style={{ padding: '2vh' }}>
                                                            <Empty description="No Image" />
                                                        </div>

                                                }
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                                                <Card hoverable style={{ padding: '1em' }}>
                                                    <Divider>Edit Slide</Divider>

                                                    {
                                                        slideData?.name ?
                                                            <Row>
                                                                <Title level={4}>Slide Name : </Title>
                                                                <Paragraph label="Slide Name" style={{ fontSize: '20px' }} editable={{ onChange: setSlideName }}>{slideName}</Paragraph>
                                                            </Row>

                                                            :
                                                            null
                                                    }

                                                    {
                                                        slideData?.describe ?
                                                            <Row>
                                                                <Title level={4}>Slide Describe : </Title>

                                                                <Paragraph label="Slide Name" style={{ fontSize: '20px' }} editable={{
                                                                    onChange: setSlideDescribe,
                                                                    maxLength: 200,
                                                                    autoSize: { maxRows: 5, minRows: 3 }
                                                                }}>
                                                                    {slideDescribe}
                                                                </Paragraph>
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData?.linkUrl ?
                                                            <Row>
                                                                <Title level={4}>Link Url : </Title>
                                                                <Paragraph label="Slide Name" style={{ fontSize: '20px' }} editable={{ onChange: setSlideLinkUrl }}>{slideLinkUrl}</Paragraph>
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData ?
                                                            <Row>
                                                                <Title level={4}>Public : </Title>
                                                                <Switch checked={slidePublic} onChange={(val) => { setSlidePublic(val); }} />
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData ?
                                                            <Row>
                                                                <Col>
                                                                    <Button type="primary" shape="round" onClick={() => { UpdateData() }}>Save</Button>
                                                                </Col>
                                                                <Col>&nbsp;</Col>
                                                                <Col>
                                                                    <Button danger type="primary" shape="round" onClick={() => { fetchData(true) }}>Reset</Button>
                                                                </Col>
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData ?
                                                            <Row>
                                                                <Divider orientation="center">Danger Part</Divider>
                                                                <Popconfirm
                                                                    title="Are you sure to delete this slide?"
                                                                    onConfirm={deleteSlide}
                                                                    // onCancel={}
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                >
                                                                    <Button danger type="dashed" block shape="round">Delete Slide</Button>

                                                                </Popconfirm>
                                                                {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}


export default EditSlide
