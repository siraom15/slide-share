// import Link from 'next/link';
import Head from 'next/head'
import { Layout,BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
import UploadPage from '../components/upload';
const { Content, Footer } = Layout;


const Home = () => {
    return (
        <>
            <Head>
                <title>Home | Slide Share</title>
            </Head>
            <Layout>
                <Navbar isLoggedIn={true} />
                <Content>
                    <Layout>
                        <SideBar page="2" />
                        <Content style={{ backgroundColor: 'white' }}>
                            <UploadPage />
                        </Content>
                    </Layout>
                </Content>
                <BackTop />
            </Layout>
        </>
    )
}

export default Home
