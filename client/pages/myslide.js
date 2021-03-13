// import Link from 'next/link';
import Head from 'next/head'
import { Layout, BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
const { Content, Footer } = Layout;
import MySlideComponent from '../components/myslide'


const mySlide = () => {
    return (
        <>
            <Head>
                <title>My Slide | Slide Share</title>
            </Head>
            <Layout >
                <Navbar isLoggedIn={true} />
                <Content>
                    <Layout >
                        <SideBar page="4" />
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
