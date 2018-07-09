import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Menu from './components/Menu';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { user: {"id":null, name: null}, currentPage: this.props.location.pathname };
		this.changeMenuButtonActive = this.changeMenuButtonActive.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}
	componentWillMount() {
		browserHistory.push('/login');
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.changeMenuButtonActive(this.props.location.pathname);
		}
		if(this.state.user.id === null && this.state.currentPage !== "/login"){
			browserHistory.push('/login');
		}
	}
	updateUser(newData){
		this.setState({user: newData});
		browserHistory.push('/');
	}
	changeMenuButtonActive(newPath){
		this.setState({currentPage: newPath});
	}
	render() {
		//const { pathname } = this.props.location;
		return (
			<div className="frame">
				<Link to="/" ><img src="img/agenciagerminar.jpg" alt="Agência Germinar" className="logo" /></Link>
				<Menu currentPage={this.state.currentPage}/>
				<div className="content" >
					<h2 className={this.state.currentPage==="/login"?"hide":""}>Julho » 2018</h2>
					{React.cloneElement(this.props.children, { ...this.props, updateUser: this.updateUser})}
				</div>
				<div className="finalLine" />
			</div>
		);
	}
}

export default App;
