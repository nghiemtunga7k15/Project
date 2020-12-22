import { Form, Input, InputNumber, Button, Row, Col, notification, Menu} from 'antd';
import UserApi from './../../functions/api/user'
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';


const Home = () => {
  	const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
	const onFinish = (values: any) => {
		let token = localStorage.getItem('usertoken');
  	 	UserApi.updateInfo(values, token).then(ok=>{
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
					      <Form.Item name={'address'} label="Address">
					        <Input />
					      </Form.Item>
					      <Form.Item name={'phone'} label="Phone">
					        <Input.TextArea />
					      </Form.Item>
					      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					        <Button type="primary" htmlType="submit">
					          Update
					        </Button>
					      </Form.Item>
					    </Form>
					</Col>
			    </Row>
	  		</div>
	  	</div>
	);
};
export default Home;