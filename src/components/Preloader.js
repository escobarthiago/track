import React, { Component } from 'react';

export default class Preloader extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': this.props.pageDataLoaded
		}
	}
	componentDidUpdate() {
		if(this.state.pageDataLoaded !== this.props.pageDataLoaded){
			this.setState({
				'pageDataLoaded': this.props.pageDataLoaded
			});
		}
	}
	render() {
		return(
			<div className={this.state.pageDataLoaded?'preloader hide':'preloader'}>
				<img src="./img/preloader.gif" className="preloader-image" alt="Preloader" />
			</div>
		);
	}
	
}