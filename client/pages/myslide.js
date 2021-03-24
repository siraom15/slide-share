// import Link from 'next/link';
import Head from 'next/head'
import { Layout, BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
const { Content, Footer } = Layout;
import MySlideComponent from '../components/myslide'
import { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import { host } from '../config/server';
import { useRouter } from 'next/router';

const mySlide = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

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
                        router.push('/');
                        console.log(err);
                        setIsLoggedIn(false);
                    })
            } else {
                router.push('/');
                setIsLoggedIn(false);
            }
        }
        checkLoggedIn();
    })
    return (
        <>
            <Head>
                <title>My Slide | Slide Share</title>
            </Head>
            <Layout >
                <Navbar isLoggedIn={isLoggedIn} />
                <Content>
                    <Layout >
                        <SideBar page="4" isLoggedIn={isLoggedIn} />
                        <Content style={{ backgroundColor: 'white' }}>
                            <MySlideComponent />
                        </Content>
                    </Layout>
                </Content>
                <BackTop />
            </Layout>
        </>
    )
}

export default mySlide
