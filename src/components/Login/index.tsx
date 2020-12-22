import { Form, Input, Button, Checkbox,  Row, Col, notification } from 'antd';
import UserApi from './../../functions/api/user'
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  	const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
	const onFinish = (values: any) => {
	    UserApi.login(values).then(res=>{
	  		let data: any;
			data = {
				currentUser : res.user
			}
	    	var action = { type : 'SET_CURRENT_USER' , data};
  			dispatch(action)
	     	localStorage.setItem('usertoken', res.token)
	    })
	    .catch(e=>{

	    })
	};
	const openNotification = () => {
	  notification.error({
	    message: 'Notification Title',
	    description:
	      'Login Error',
	    className: 'custom-class',
	    style: {
	      width: 600,
	    },
	  });
	};
    const responseFacebook = (response: any) => {
    	if ( response.email ) {
	    	UserApi.loginWithFacebook(response.email).then(res=>{
	    		let data: any;
				data = {
					currentUser : res.user
				}
		    	var action = { type : 'SET_CURRENT_USER' , data};
	  			dispatch(action)
		     	localStorage.setItem('usertoken', res.token)
	    	})
    	}else{
    		openNotification();
    	}
    };

    const responseGoogle = (response: any) => {
    	if (response.profileObj){
		  	UserApi.loginWithFacebook(response.profileObj.email).then(res=>{
	    		let data: any;
				data = {
					currentUser : res.user
				}
		    	var action = { type : 'SET_CURRENT_USER' , data};
	  			dispatch(action)
		     	localStorage.setItem('usertoken', res.token)
	    	})
    	}else{
    		openNotification()
    	}
	}
    return (
	  	<div>
	  		<Row>
		      	<Col span={12} offset={5}>
			        <Form
					      {...layout}
					      name="basic"
					      initialValues={{ remember: true }}
					      onFinish={onFinish}
				    	>
				      	<Form.Item
					        label="Email"
					        name="email"
					        rules={[{ required: true, message: 'Please input your email!' }]}
				      	>
				        	<Input />
				      	</Form.Item>

				      	<Form.Item
				      	  label="Password"
				      	  name="password"
				      	  rules={[{ required: true, message: 'Please input your password!' }]}
				      	>
				        <Input.Password />
				        </Form.Item>
				        <Form.Item >
				      	<div className="widget">
					      	<FacebookLogin
							    appId="2874047096176507"
							    autoLoad={true}
							    fields="name,email,picture"
							    callback={responseFacebook}
							    cssClass="my-facebook-button-class"
							    icon="fa-facebook"
							/>
					      	<GoogleLogin
							  	clientId="146082862195-hvi1jucsikq6q26jt7s9qi7fmkjp5cvi.apps.googleusercontent.com"
							   	onSuccess={responseGoogle}
    							onFailure={responseGoogle}
							/>
					   </div>  
				        </Form.Item>
				        <Form.Item {...tailLayout}>
					        <Button type="primary" htmlType="submit">
					          Login
					        </Button>
				        </Form.Item>
				    </Form>
		      	</Col>
	    	</Row>
	  	</div>
    );
};
export default Login;