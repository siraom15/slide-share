// import Link from 'next/link';
import Head from 'next/head'
import { Layout, BackTop } from 'antd';
import SideBar from '../components/sidebar'
import Navbar from '../components/navbar';
import AllPublic from '../components/publicSlide';
import { useEffect, useState } from 'react';
import cookies from 'js-cookie'
import { host } from '../config/server';
const { Content, Footer } = Layout;



const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  }, []);

  return (
    <>
      <Head>
        <title>Home | Slide Share</title>
      </Head>
      <Layout >
        <Navbar isLoggedIn={isLoggedIn} />
        <Content>
          <Layout >
            <SideBar page="1" isLoggedIn={isLoggedIn} />
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
