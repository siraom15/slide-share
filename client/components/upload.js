import {
    Form,
    Switch,
    Button,
    Upload,
    Input,
    Row,
    Col,
    Divider,
    Card,
    message
} from 'antd';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { host } from '../config/server'
import Cookies from 'js-cookie';

const fileList = [

];
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 14 },
};
const normFile = (e) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.file;
};

const UploadPage = () => {

    const router = useRouter();
    const [image, setImage] = useState("");
    const [loadings, setLoading] = useState(false);

    const onFinish = async (values) => {
        await uploadData(values);
    };

    const onFail = (errorInfo) => {
        console.log(errorInfo);
        message.error("Fill All The Form ");
        setLoading(false);
    }
    const enterLoading = () => {
        setLoading(() => {
            let newLoadings = loadings;
            newLoadings = true;
            return {
                loadings: newLoadings,
            };
        });
    };

    const uploadData = async (val) => {
        let picurl = null
        if (val.photos) {
            picurl = await uploadImg(val.photos);
        }
        const payload = {
            ...val,
            photos: picurl ? { url: picurl } : null
        }
        await fetch(host + '/api/slide/create',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + Cookies.get('token')
                },
                body: JSON.stringify(payload)
            },
        ).then(response => response.json())
            .then(result => {
                if (result.success) {
                    message.success(result.success);
                    router.push("/slide/" + result.data._id);

                } else {
                    message.error(result.error)
                }
            })
            .catch(error => {
                message.error("Something Wrong");
                console.log(error);
            });
    }


    const uploadImg = async () => {
        if(!image) return null;
        const loadingMessage = message.loading("Uploading Image...",0)
        const formData = new FormData();
        formData.append('upload_preset', 'slide-share');
        formData.append('file', image);

        const url = await fetch('https://api.cloudinary.com/v1_1/share-slide/image/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.url) {
                    setTimeout(loadingMessage,0);
                    message.success("Upload Image Success")
                    return result.url
                } else {
                    setTimeout(loadingMessage,0);
                    message.error("Upload Image Failure")
                    return null;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                message.error("Upload Image Failure")
                return null;
            });
        return url ? url : null;
    }


    return (
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        <Divider>Upload Slide</Divider>
                        <Form
                            name="validate_other"
                            {...formItemLayout}
                            onFinish={onFinish}
                            onFinishFailed={onFail}
                            initialValues={{
                                public: true,
                            }}>
                            <Form.Item
                                label="Slide Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your slide name!' }]}
                            >
                                <Input placeholder="Input Slide Name" />
                            </Form.Item>

                            <Form.Item
                                label="Describe ( Optional )"
                                name="describe"
                                rules={[{ required: false, message: 'Please input your slide name!' }]}
                            >
                                <TextArea maxLength="200" placeholder="Input Slide Describe ( Optional )" />
                            </Form.Item>

                            <Form.Item
                                label="Google Drive Url"
                                name="linkUrl"
                                rules={[{ required: true, message: 'Please input google drive url!' },
                                { type: 'url', message: 'Please input valid url' }]}
                            >
                                <Input placeholder="Input your Google Drive URL" />
                            </Form.Item>

                            <Form.Item name="public" label="Public" valuePropName="checked">
                                <Switch checkedChildren="Public" unCheckedChildren="Private" />
                            </Form.Item>

                            <Form.Item
                                name="photos"
                                label="Upload Image Preview"
                                valuePropName="file"
                                getValueFromEvent={normFile}
                                extra="Upload Image Slide Preview"
                                onChange={(e) => setImage(e.target.files[0])}
                            >
                                <Upload
                                    maxCount={1}
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    onRemove={(e) => setImage("")}
                                    onChange={(e)=>{console.log(e);}}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" loading={loadings} onClick={() => enterLoading()}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </Col>
            </Row>
        </>

    );
};

export default UploadPage;