import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {HOURSCONTROL_DATA_PATH} from '../constants';

export default class HoursControl extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': false,
			'hoursData':[],
			'totalData':[]
		};
	}
	componentDidMount() {
		var thisComponent = this;
		fetch(HOURSCONTROL_DATA_PATH)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({
					'pageDataLoaded': true,
					'hoursData':data.hours,
					'totalData':data.total
				});
			}
		);
	}
	render() {
		const daysData = this.state.hoursData;
		const listDays = daysData.map((day,index) => <tr bgcolor={index%2===0?"#FFFFFF":"#DEEFA8"}><td align="center">{day[0]}</td><td align="center">{day[1]}</td><td align="center">{day[2]}</td><td align="center">{day[3]}</td></tr>);
		return(
			<div>
				<Preloader pageDataLoaded={this.state.pageDataLoaded}/>
				<div className={this.state.pageDataLoaded?'':'hide'}>
					<table className="hourTable aligned-inside-container" width="700px" cellPadding="10" border="0">
						<tbody>
							<tr bgcolor="#A5CE37">
								<td width="125px" align="center">
									<b>DIA</b>
								</td>
								<td width="125px" align="center">
									<b>HORAS USADAS</b>
								</td>
								<td width="125px" align="center">
									<b>HORAS EXTRAS USADAS</b>
								</td>
								<td width="325px" align="center">
									<b>OBSERVAÇÕES</b>
								</td>
							</tr>
							{listDays}
							<tr bgcolor="#FFFFFF">
								<td align="center"><b>TOTAL</b></td>
								<td align="center"><b>{this.state.totalData[0]}</b></td>
								<td align="center"><b>{this.state.totalData[1]}</b></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
	
}