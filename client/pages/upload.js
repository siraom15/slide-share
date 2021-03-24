import Head from 'next/head'
import { Layout, BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
import UploadPage from '../components/upload';
const { Content, Footer } = Layout;
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { host } from '../config/server';
import { useRouter } from 'next/router';
import {CloudUploadOutlined} from '@ant-design/icons'

const Upload = () => {
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
              setIsLoggedIn(false);
              router.push('/login')
            }
          })
          .catch(err => {
            console.log(err);
            setIsLoggedIn(false);
            router.push('/login')
          })
      } else {
        router.push('/login')
        setIsLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, []);
  return (
    <>
      <Head>
        <title>Upload | Slide Share</title>
      </Head>
      <Layout>
        <Navbar isLoggedIn={isLoggedIn} />
        <Content>
          <Layout>
            <SideBar page="2" isLoggedIn={isLoggedIn} />
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

export default Upload
