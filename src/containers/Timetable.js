import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {TIMETABLE_DATA_PATH} from '../constants';

export default class Timetable extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': false,
			'timetableImagem1':'',
			'timetableImagem2':''
		};
	}
	componentDidMount() {
		var thisComponent = this;
		fetch(TIMETABLE_DATA_PATH)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({
					'pageDataLoaded': true,
					'timetableImagem1':data.timetableImagem1,
					'timetableImagem2':data.timetableImagem2
				});
			}
		);
	}
	render() {
		return(
			<div>
				<Preloader pageDataLoaded={this.state.pageDataLoaded}/>
				<div className={this.state.pageDataLoaded?'':'hide'}>
					<img src={this.state.timetableImagem1} alt="timetable" className="aligned-inside-container"/>
					<img src={this.state.timetableImagem2} alt="timetable" className="aligned-inside-container"/>
				</div>
			</div>
		);
	}
	
}