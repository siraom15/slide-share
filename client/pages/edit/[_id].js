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
    Popconfirm,
    Upload,
    Form
} from 'antd';
const { Paragraph, Title } = Typography;
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
const { Content } = Layout;
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { host } from '../../config/server'
import Cookies from 'js-cookie';
import cookies from 'js-cookie';
import { UploadOutlined } from '@ant-design/icons'

const EditSlide = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [slideData, setSlideData] = useState(undefined);
    const [slideName, setSlideName] = useState("");
    const [slideDescribe, setSlideDescribe] = useState("");
    const [slideLinkUrl, setSlideLinkUrl] = useState("");
    const [slidePhoto, setSlidePhoto] = useState(null);
    const [slidePublic, setSlidePublic] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newSlideLinkUrl, setNewSlideLinkUrl] = useState(null);
    const UpdateData = async () => {
        console.log(slidePhoto);
        const payload = {
            "name": slideName,
            "describe": slideDescribe,
            "linkUrl": slideLinkUrl,
            "public": slidePublic,
            "photos": [{ url: newSlideLinkUrl ? newSlideLinkUrl : slidePhoto }]
        }
        console.log(payload);
        await fetch(host + "/api/slide/update/" + _id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    return message.error(data.error)
                }
                message.success(data.success)
            })
            .catch(err => {
                console.log(err);
            })
        fetchData(true);

    }
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };
    const deleteSlide = async () => {
        await fetch(host + "/api/slide/delete/" + _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
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
                setSlideData(res.data);
                setSlideName(res.data.name);
                setSlideDescribe(res.data.describe);
                setSlideLinkUrl(res.data.linkUrl);
                setSlidePublic(res.data.public);
                setSlidePhoto(res.data.photos[0]?.url ? res.data.photos[0].url : null );
                // if (force) return message.success("Fetch Success");
            })
            .catch(err => {
                return null
            })
    }

    const uploadImg = async (file) => {
        if (!file) return null;
        const loadingMessage = message.loading("Uploading...", 0);
        const formData = new FormData();
        formData.append('upload_preset', 'slide-share');
        formData.append('file', file);
        await fetch('https://api.cloudinary.com/v1_1/share-slide/image/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.url) {
                    setTimeout(loadingMessage, 0);
                    message.success("Upload Image Success ( Not yet save )", 5)
                    setNewSlideLinkUrl(result.url);
                } else {
                    message.error("Upload Image Failure");
                    setNewSlideLinkUrl(null);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                message.error("Upload Image Failure")
                setNewSlideLinkUrl(null);
            });
    }

    fetchData();

    useEffect(async () => {
        let checkLoggedIn = async () => {
            if (cookies.get('token')) {
                await fetch(host + '/api/user/mydata', {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${cookies.get('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setIsLoggedIn(true);
                        } else {
                            router.push('/');
                            setIsLoggedIn(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        router.push('/');

                        setIsLoggedIn(false);
                    })
            } else {
                router.push('/');
                setIsLoggedIn(false);
            }
        }
        checkLoggedIn();
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Edit | Slide Share</title>
            </Head>
            <Layout >
                <Navbar isLoggedIn={true} />
                <Content >
                    <Layout>
                        <SideBar page="4" isLoggedIn={true} />
                        <Content>
                            <Row>
                                <Col span={24}>
                                    <Card style={{ width: "100%" }}>
                                        <Divider>Edit Slide</Divider>
                                        <PageHeader
                                            className="site-page-header"
                                            onBack={() => { router.push("/slide/" + _id) }}
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
                                                        <div style={{ padding: '2vh', marginTop: '25%' }}>
                                                            <Empty description="No Image" />
                                                        </div>
                                                }
                                                <Form>
                                                    <Form.Item
                                                        name="photos"
                                                        valuePropName="file"
                                                        getValueFromEvent={normFile}
                                                        extra="Upload Image Slide Preview"
                                                        onChange={async (e) => { await uploadImg(e.target.files[0]) }}
                                                    >
                                                        <Upload
                                                            maxCount={1}
                                                            listType="picture"
                                                            className="upload-list-inline"
                                                            onRemove={(e) => { message.success("Removed Image"); setNewSlideLinkUrl(null); }}
                                                        >
                                                            <Button icon={<UploadOutlined />}>Change Image</Button>
                                                        </Upload>
                                                    </Form.Item>
                                                </Form>

                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                                                <Card hoverable style={{ padding: '1em' }}>
                                                    <Divider>Edit Slide</Divider>

                                                    {
                                                        slideData?.name ?
                                                            <Row>
                                                                <Col span={24}>
                                                                    <Title level={4}>Slide Name : </Title>
                                                                    <Paragraph label="Slide Name" style={{ fontSize: '20px' }} editable={{ onChange: setSlideName }}>{slideName}</Paragraph>
                                                                </Col>
                                                            </Row>

                                                            :
                                                            null
                                                    }

                                                    {
                                                        slideData?.describe ?
                                                            <Row>
                                                                <Col span={24}>
                                                                    <Title level={4}>Slide Describe : </Title>

                                                                    <Paragraph ellipsis={true ? { rows: 1, expandable: true, symbol: 'more' } : false} label="Slide Name" style={{ fontSize: '20px' }} editable={{
                                                                        onChange: setSlideDescribe,
                                                                        maxLength: 200,
                                                                        autoSize: { maxRows: 5, minRows: 3 }
                                                                    }}>
                                                                        {slideDescribe}
                                                                    </Paragraph>
                                                                </Col>

                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData?.linkUrl ?
                                                            <Row>
                                                                <Col span={24}>
                                                                    <Title level={4}>Link Url : </Title>
                                                                    <Paragraph label="Slide Name" style={{ fontSize: '20px' }} editable={{ onChange: setSlideLinkUrl }}>{slideLinkUrl}</Paragraph>
                                                                </Col>
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData ?
                                                            <Row>
                                                                <Col>
                                                                    <Title level={4}>Public :  </Title>
                                                                </Col>
                                                                <Col>
                                                                    <Switch checked={slidePublic} onChange={(val) => { setSlidePublic(val); }} />
                                                                </Col>
                                                            </Row>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        slideData ?
                                                            <Row style={{ marginTop: '1em' }}>
                                                                <Col>
                                                                    <Button type="success" shape="round" onClick={() => { UpdateData() }}>Save</Button>
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
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                >
                                                                    <Button danger type="dashed" block shape="round">Delete Slide</Button>

                                                                </Popconfirm>
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
