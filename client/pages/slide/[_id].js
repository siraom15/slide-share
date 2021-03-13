// import Link from 'next/link';
import Head from 'next/head'
import { Layout, Image, Row, Col, Card, message, PageHeader, Descriptions, Empty, Modal, Carousel } from 'antd';
const { confirm } = Modal
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
const { Content } = Layout;
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { host } from '../../config/server'
import { ExclamationCircleOutlined, DownloadOutlined } from '@ant-design/icons'
function UpdateView(_id) {
  fetch(host + "/api/slide/update/view/" + _id, {
    method: "PUT"
  })
}

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const ViewSlide = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [slideData, setSlideData] = useState(undefined);

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
      })
      .catch(err => {
        message.error("Server Down")
        return null
      })
  }
  fetchData();
  useEffect(async () => {
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
      })
      .catch(err => {
        message.error("Server Down")
        return null
      })
    console.log("slideData:" + slideData);
  }, []);

  return (
    <>
      <Head>
        <title>ViewSlide | Slide Share</title>
      </Head>
      <Layout >
        <Navbar />
        <Content >
          <Layout>
            <SideBar />
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
                      <Col xs={24} sm={24} md={24} lg={10} xl={14}>
                        {
                          (slideData?.photos && slideData?.photos[0]?.url) ?
                            <div style={{ padding: '2vh' }}>
                              <Carousel autoplay>
                                <div>
                                  <h3 style={contentStyle}>1</h3>
                                </div>
                                <div>
                                  <h3 style={contentStyle}>2</h3>
                                </div>
                                <div>
                                  <h3 style={contentStyle}>3</h3>
                                </div>
                                <div>
                                  <h3 style={contentStyle}>4</h3>
                                </div>
                              </Carousel>
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
                      <Col>
                        <Descriptions title="Slide Infomation">
                          {
                            slideData?.name ?
                              <Descriptions.Item label="Slide Name">{slideData.name}</Descriptions.Item>
                              :
                              null
                          }

                          {
                            slideData?.describe ?
                              <Descriptions.Item label="Describe">{slideData.describe}</Descriptions.Item>
                              :
                              null
                          }

                          {
                            slideData?.createTime ?
                              <Descriptions.Item label="Create Date">{slideData.createTime}</Descriptions.Item>
                              :
                              null
                          }
                          {
                            slideData?.linkUrl ?
                              <Descriptions.Item label="Dowload Link">
                                <a onClick={() => { showConfirm(slideData.linkUrl) }}>
                                  {slideData.linkUrl}
                                </a>
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
