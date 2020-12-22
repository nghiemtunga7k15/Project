import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer.js'
import UserApi from './functions/api/user'

    const store = createStore(rootReducer);
	const initialApp = (currentUser) => {
		let data: any;
		data = {
			currentUser
		}
    	var action = { type : 'SET_CURRENT_USER' , data};
    	store.dispatch(action)
		ReactDOM.render(
			<Provider store={store}>
		    	<App />
		  	</Provider>,
		  document.getElementById('root')
		);
	};
	let token = localStorage.getItem('usertoken');
	if (token){
		UserApi.getInfo(token).then(data=>{
			initialApp(data.user)
		})
		.catch(e=>{
			initialApp()
		})
	}else{
		initialApp()
	}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
