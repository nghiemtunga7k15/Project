import { Form, Input, InputNumber, Button, Row, Col, notification, Menu, Modal, Switch} from 'antd';
import UserApi from './../../functions/api/user'
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';


const Home = () => {
  	const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const [state, setState] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible_v2, setIsModalVisible_v2] = useState(false);
    const [QrCode, setQrCode] = useState('false');

    useEffect(() => {
	});
	const generateQRCode = () => {
		let token = localStorage.getItem('usertoken');
  	 	UserApi.generateTwoFa(token).then(res=>{
  	 		console.log(res)
  	 		if (res.statusCode == 200){
				setQrCode(res.data)
  	 		}
  	 	})
	};
	const showModal = () => {
	    setIsModalVisible(true);
	    generateQRCode()
	};

    const handleOk = () => {
	    setIsModalVisible(false);
	};

    const handleCancel = () => {
     	setIsModalVisible(false);
    };
    const showModal_v2 = () => {
	    setIsModalVisible_v2(true);
	};

    const handleOk_v2 = () => {
	    setIsModalVisible_v2(false);
	};

    const handleCancel_v2 = () => {
     	setIsModalVisible_v2(false);
    };
	const onFinish = (values: any) => {
		let token = localStorage.getItem('usertoken');
  	 	UserApi.updateInfo(values, token).then(res=>{
  	 		openNotification()
  	 	})
	};
	const onFinish2FA = (values: any) => {
		let token = localStorage.getItem('usertoken');
  	 	UserApi.onOffTwoFa(token, values.code).then(res=>{
  	 		console.log(res)
  	 		openNotification()
  	 	})
	};
	const openNotification = () => {
	  notification.success({
	    message: 'Notification Title',
	    description:
	      'Update Successlly',
	    className: 'custom-class',
	    style: {
	      width: 600,
	    },
	  });
	};
	const logOut = () => {
	  localStorage.removeItem("usertoken")
	};
	const onChange  = (checked) => {
		showModal_v2()
	};
  
	const layout = {
	  labelCol: { span: 8 },
	  wrapperCol: { span: 16 },
	};
	const { SubMenu } = Menu;
    return (
	   	<div>   
	   		
		   	<div>
			    <Menu  mode="horizontal">
			        <Menu.Item key="mail" icon={<MailOutlined />}>
			          Navigation One
			        </Menu.Item>
			        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
			          Navigation Two
			        </Menu.Item>
			        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
			          <Menu.ItemGroup title="Item 1">
			            <Menu.Item key="setting:1">Option 1</Menu.Item>
			            <Menu.Item key="setting:2">Option 2</Menu.Item>
			          </Menu.ItemGroup>
			          <Menu.ItemGroup title="Item 2">
			            <Menu.Item key="setting:3">Option 3</Menu.Item>
			            <Menu.Item key="setting:4">Option 4</Menu.Item>
			          </Menu.ItemGroup>
			        </SubMenu>
			        <Menu.Item key="alipay" onClick={logOut}>
			          Logout
			        </Menu.Item>
      			</Menu>
			</div>

	  		<div>
		  		<Row>
				    <Col span={12}>
					    <Form {...layout} name="nest-messages" initialValues={currentUser} onFinish={onFinish}>
					      <Form.Item name={'email'} label="Email" >
					        <Input />
					      </Form.Item>
					      <Form.Item name={'firstName'} label="First Name">
					        <Input />
					      </Form.Item> 
					       <Form.Item name={'username'} label="Username">
					        <Input />
					      </Form.Item>
					      <Form.Item name={'firstName'} label="FirstName">
					        <Input />
					      </Form.Item>
					      <Form.Item name={'lastName'} label="LastName">
					        <Input />
					      </Form.Item>
					      <Form.Item name={'phone'} label="Phone">
					        <Input />
					      </Form.Item>
					      <Form.Item  label="Enabled 2FA">
					        <Switch defaultChecked onChange={onChange} />
					      </Form.Item>
					      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					        <Button type="primary" htmlType="submit">
					          Update
					        </Button>
					         <Button type="primary" onClick={showModal}>
						        Open QrCode
						      </Button>
						      <Modal title="Two Factor Authentication " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
						        							<img src={QrCode} width="100%" height="100%" />
						      </Modal>
						     
						      <Modal title="Two Factor Authentication " visible={isModalVisible_v2} onOk={handleOk_v2} onCancel={handleCancel_v2}>
						        	 <Form
									      {...layout}
									      name="basic"
									      onFinish={onFinish2FA}
									    >
									      <Form.Item
									        label="2FA Code"
									        name="code"
									        rules={[{ required: true, message: 'Please input your 2fa!' }]}
									      >
									        <Input />
									      </Form.Item>
									      <Form.Item >
									        <Button type="primary" htmlType="submit">
									          On/
									        </Button>
									      </Form.Item>
									    </Form>
						      </Modal>
					      </Form.Item>
					    </Form>
					</Col>
			    </Row>
	  		</div>
	  	</div>
	);
};
export default Home;