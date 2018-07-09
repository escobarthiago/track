import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {LOGIN_DATA_PATH} from '../constants';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {"error":false, "loading": false};
		this.handleClick = this.handleClick.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}
	handleClick(){
		let loginValue = document.getElementById("login").value;
		let passwordValue = document.getElementById("password").value;
		var thisComponent = this;
		thisComponent.setState({"error":false, "loading": true});
		//fetch(LOGIN_DATA_PATH, {method: 'post', body: JSON.stringify({login: loginValue, password: passwordValue})})
		fetch(LOGIN_DATA_PATH, {method: 'post', body: "login="+loginValue+"&password="+passwordValue})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({"loading":false});
				if(data.validated){
					thisComponent.updateUser({id:data.id, name: data.name});
				}else{
					thisComponent.setState({"error":true});
				}
			}
		);
	}
	updateUser(newData){
		this.props.updateUser(newData);
	}
	render() {
		return(
			<div>
				<Preloader pageDataLoaded={!this.state.loading}/>
				<div className={this.state.loading?"formLogin hide":"formLogin"}>
					<div className="loginInput">Login: <input id="login" name="login"  type="text" /></div>
					<div className="loginInput">Senha: <input id="password" name="password" type="password" /></div>
					<div className={this.state.error?"errorWarning":"errorWarning hide"}>Dados de acesso inválidos</div>
					<input value="Enviar" type="submit" onClick={this.handleClick} />
				</div>
			</div>
		);
	}
}