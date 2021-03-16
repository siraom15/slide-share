// import Link from 'next/link';
import Head from 'next/head'
import { Layout, BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
import AllPublic from '../components/publicSlide';
const { Content, Footer } = Layout;


const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Slide Share</title>
      </Head>
      <Layout >
        <Navbar isLoggedIn={true} />
        <Content>
          <Layout >
            <SideBar page="1" />
            <Content style={{ backgroundColor: 'white' }}>
              <AllPublic />
            </Content>
          </Layout>
        </Content>
        <BackTop />
      </Layout>
    </>
  )
}

export default Home
