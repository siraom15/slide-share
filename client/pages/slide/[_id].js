// import Link from 'next/link';
import Head from 'next/head'
import { Layout, Image, Row, Col, Card, message, PageHeader, Descriptions, Empty, Modal, Typography } from 'antd';
const { Paragraph } = Typography;
const { confirm } = Modal
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
const { Content } = Layout;
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { host } from '../../config/server'
import { ExclamationCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import Link from 'next/link';
import * as dayjs from 'dayjs';
import cookies from 'js-cookie'

const ViewSlide = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [slideData, setSlideData] = useState(undefined);
  const [uploader, setUploader] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const getUploader = async (userId) => {
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
      setUploader(data.user_data.username)
    })
      .catch(err => {
        console.log(err);
        setUploader("");
      });
  }
  const UpdateView = (_id) => {
    fetch(host + "/api/slide/update/view/" + _id, {
      method: "PUT"
    })
  }
  const showConfirm = (linkUrl) => {
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
  const fetchData = async () => {
    if (slideData) return;
    UpdateView(_id);
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
        setSlideData(res.data)
        getUploader(res.data?.userId ? res.data.userId : "");
      })
      .catch(err => {
        message.error("Server Down")
        return null
      })
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
              setUserId(data.user_data._id);
            } else {
              setIsLoggedIn(false);
            }
          })
          .catch(err => {
            console.log(err);
            setIsLoggedIn(false);
          })
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLoggedIn();

    UpdateView(_id);
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
        setSlideData(res.data)
        getUploader(res.data?.userId ? res.data.userId : "");
      })
      .catch(err => {
        message.error("Server Down")
        return null
      })

    console.log("slideData:");
    console.log(slideData);
  }, []);

  return (
    <>
      <Head>
        <title>ViewSlide | Slide Share</title>
      </Head>
      <Layout >
        <Navbar isLoggedIn={isLoggedIn} />
        <Content >
          <Layout>
            <SideBar page="1" isLoggedIn={isLoggedIn} />
            <Content>
              <Row>
                <Col span={24}>
                  <Card style={{ width: "100%" }}>
                    <PageHeader
                      className="site-page-header"
                      onBack={() => { router.push("/") }}
                      title="View Slide"
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
                      <Col xs={24} sm={24} md={24} lg={10} xl={14}>
                        <Descriptions title="Slide Infomation" bordered>
                          {
                            slideData?.name ?
                              <Descriptions.Item span={3} label={<Paragraph strong>Slide Name</Paragraph>}>
                                {slideData.name}
                              </Descriptions.Item>
                              :
                              null
                          }

                          {
                            slideData?.describe ?
                              <Descriptions.Item span={3} label={<Paragraph strong>Slide Describe</Paragraph>}>
                                <Paragraph ellipsis={true ? { expandable: true, symbol: 'more' } : false}>
                                  {slideData.describe}
                                </Paragraph>
                              </Descriptions.Item>
                              :
                              null
                          }

                          {
                            slideData?.createTime ?
                              <Descriptions.Item span={3} label="Create Date">
                                {dayjs(slideData.createTime).toString()}
                              </Descriptions.Item>
                              :
                              null
                          }
                          {
                            slideData?.linkUrl ?
                              <Descriptions.Item span={3} label="Dowload Link">
                                <a onClick={() => { showConfirm(slideData.linkUrl) }}>
                                  {slideData.linkUrl}
                                </a>
                              </Descriptions.Item>
                              :
                              null
                          }
                          {
                            uploader ?
                              <Descriptions.Item span={3} label="Uploader">
                                {uploader}
                              </Descriptions.Item>
                              :
                              null
                          }
                          {
                            slideData ?
                              <Descriptions.Item span={3} label="Is Public">
                                {slideData.public ? "Public" : "Private"}
                              </Descriptions.Item>
                              :
                              null
                          }
                          {
                            slideData?.view_count ?
                              <Descriptions.Item label="Views Count">
                                {slideData.view_count} Views
                          </Descriptions.Item>
                              :
                              null
                          }
                          {
                            (slideData?.userId == userId) ?
                              <Descriptions.Item label="Edit Slide">
                                <Link href={"/edit/" + _id}>
                                  <a>
                                    Edit
                                  </a>
                                </Link>
                              </Descriptions.Item>
                              :
                              null
                          }
                        </Descriptions>
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


export default ViewSlide
