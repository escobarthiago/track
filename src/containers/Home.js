import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {HOME_DATA_PATH} from '../constants';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': false,
			'imgTimetableHome':'',
			'hrsIncludedToday':'',
			'hrsIncludedThisMonth': '',
			'hrsExtraToday': '',
			'hrsExtraThisMonth':  '',
			'extraCostInContract': '',
			'extraCostOutContract': ''
		};
	}	
	componentDidMount() {
		var thisComponent = this;
		fetch(HOME_DATA_PATH)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({
					'pageDataLoaded': true,
					'imgTimetableHome': data.cronogramImage,
					'hrsIncludedToday': data.availableHours[0],
					'hrsIncludedThisMonth': data.availableHours[1],
					'hrsExtraToday': data.availableHours[2],
					'hrsExtraThisMonth':  data.availableHours[3],
					'extraCostInContract': data.extraCosts[0],
					'extraCostOutContract': data.extraCosts[1]
				});
			}
		);
	}
	render() {
		return(
			<div>
				<Preloader pageDataLoaded={this.state.pageDataLoaded}/>
				<div className={this.state.pageDataLoaded?'':'hide'}>
					<img src={this.state.imgTimetableHome} alt="timetable" className="imgHome"/>
					<div className="infoTable blueTable">
						<div className="leftTable">*HORAS<br/>DISPONÍVEIS<div className="smallest-details">*Horas válidas por contrato e<br/>ainda não utilizadas</div></div>
						<div className="rightTable">
							<table>
								<tbody><tr>
									<td colSpan="2"><font className="details">hoje</font></td>
									<td colSpan="2"><font className="details">neste mês</font></td>
								</tr>
								<tr>
									<td width="190px">inclusas</td>
									<td width="100px">{this.state.hrsIncludedToday}</td>
									<td width="210px">inclusas</td>
									<td width="100px">{this.state.hrsIncludedThisMonth}</td>
								</tr>
								<tr>
									<td>extras</td>
									<td>{this.state.hrsExtraToday}</td>
									<td>extras</td>
									<td>{this.state.hrsExtraThisMonth}</td>
								</tr>
							</tbody></table>
						</div>
					</div>
					<div className="infoTable greenTable">
						<div className="leftTable">*CUSTOS<br/>EXTRAS<div className="smallest-details">*Valores que serão acrescidos em sua próxima cobrança</div></div>
						<div className="rightTable">
							<table>
								<tbody><tr>
									<td width="190px">horas<br/>extras<div className="small-details">(contrato)</div></td>
									<td width="100px">{this.state.extraCostInContract}</td>
									<td width="210px">jobs<br/>extras<div className="small-details">(fora do contrato)</div></td>
									<td width="100px">{this.state.extraCostOutContract}</td>
								</tr>
							</tbody></table>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}