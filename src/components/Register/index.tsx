import { Form, Input, Button, Checkbox,  Row, Col } from 'antd';
import UserApi from './../../functions/api/user'
import { useDispatch } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
	const dispatch = useDispatch();
	const onFinish = (values: any) => {
	    UserApi.register(values).then(res=>{
	    	let data: any;
			data = {
				currentUser : res.user
			}
	    	var action = { type : 'SET_CURRENT_USER' , data};
  			dispatch(action)
	     	localStorage.setItem('usertoken', res.token)
	    })
	};

  	return (
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

			      <Form.Item {...tailLayout}>
			        <Button type="primary" htmlType="submit">
			          Register
			        </Button>
			      </Form.Item>
			    </Form>
	      	</Col>
	    </Row>
  	);
};
export default Login;