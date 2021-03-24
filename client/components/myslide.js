import { message, Col, Row, Empty, Button, Divider } from "antd"
import { useEffect, useState } from "react"
import SlideComponent from './slide'
import { host } from '../config/server'
import Link from "next/link"
import Cookies from 'js-cookie';

const MySlideComponent = () => {
    const [allSlide, setAllSlide] = useState([])
    useEffect(async () => {
        await fetch(host + "/api/slide/getmyslide", {
            method: 'GET',
            headers : {
                'Authorization' : 'Bearer '+ Cookies.get('token')
            }
        }).then(res => res.json())
            .then(res => {
                if(res.success)
                    setAllSlide(res.data)
                else
                    message.error(res.error)
            }).catch(err => {
                console.log(err);
                message.error("Server Down | Cannot Fetch all slide");
            })
    }, [])
    return (
        <>
            <Divider>My Slide</Divider>
            <Row>

                {
                    (allSlide && allSlide.length > 0) ? allSlide.map(s => (
                        <Col style={{ padding: '2em' }}>
                            <SlideComponent {...s} />
                        </Col>
                    ))
                        :
                        <Col span={24} >
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                description={
                                    <span>
                                        There is no avaliable slide
                                    </span>
                                }
                            >
                                <Link href="/upload">
                                    <a>
                                        <Button type="primary">Upload Now!</Button>
                                    </a>
                                </Link>
                            </Empty>
                        </Col>
                }
            </Row>

        </>
    )
}

export default MySlideComponent;