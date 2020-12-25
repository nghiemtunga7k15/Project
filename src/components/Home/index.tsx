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
    const [state, setState] = useState(10);

    useEffect(() => {
	    let token = localStorage.getItem('usertoken');
  	 	UserApi.demo(token).then(ok=>{
  	 		setState(ok)
  	 	})
	});
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
	   	<img src="data:image/png;base64,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" width="100" height="50" />
    		
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