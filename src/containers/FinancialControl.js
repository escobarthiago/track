import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {FINANCIALCONTROL_DATA_PATH} from '../constants';

export default class FinancialControl extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': false,
			'currentPayment':[],
			'nextPayment':[],
			'pastPaymentsDate':"",
			'pastPaymentsData':[]
		};
	}
	componentDidMount() {
		var thisComponent = this;
		fetch(FINANCIALCONTROL_DATA_PATH)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({
					'pageDataLoaded': true,
					'currentPayment':data.currentPayment,
					'nextPayment':data.nextPayment,
					'pastPaymentsDate':data.pastPayments.date,
					'pastPaymentsData':data.pastPayments.data
				});
			}
		);
	}
	render() {
		const pastPayments = this.state.pastPaymentsData;
		const listPayments = pastPayments.map((pay,index) => <tr bgcolor={index%2===0?"#FFFFFF":"#DEEFA8"}><td>{pay[0]}</td><td>{pay[1]}</td><td>{pay[2]}</td><td>{pay[3]}</td><td><a href={pay[4]} target="_blank"><img src="./img/bt_download.png" alt="download nota fiscal" /></a></td></tr>);	
		return(
			<div>
				<Preloader pageDataLoaded={this.state.pageDataLoaded}/>
				<div className={this.state.pageDataLoaded?'':'hide'}>
					<div className="aligned-inside-container">VENCIMENTO NESTE MÊS: {this.state.currentPayment[0]}</div>
					<table className="financial-table aligned-inside-container" width="700px" cellPadding="10" border="0">
						<tbody>
							<tr bgcolor="#A5CE37">
								<td width="250px" align="center"><b>IDENTIFICADOR</b></td>
								<td width="150px" align="center"><b>VALOR</b></td>
								<td width="150px" align="center"><b>STATUS</b></td>
								<td width="150px" align="center"><b>ÚLTIMA ATUALIZAÇÃO</b></td>
								<td width="150px" align="center"><b>NOTA FISCAL</b></td>
							</tr>
							<tr bgcolor="#FFFFFF">
								<td>{this.state.currentPayment[1]}</td>
								<td>{this.state.currentPayment[2]}</td>
								<td>{this.state.currentPayment[3]}</td>
								<td>{this.state.currentPayment[4]}</td>
								<td>
									<a href={this.state.currentPayment[5]} target="_blank">
										<img src="./img/bt_download.png" alt="download nota fiscal" />
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="space" />
					<div className="aligned-inside-container">VENCIMENTO PRÓXIMO MÊS: {this.state.nextPayment[0]}</div>
					<table className="financial-table aligned-inside-container" width="700px" cellPadding="10" border="0">
						<tbody>
							<tr bgcolor="#A5CE37">
								<td width="250px" align="center"><b>IDENTIFICADOR</b></td>
								<td width="150px" align="center"><b>VALOR</b></td>
								<td width="150px" align="center"><b>STATUS</b></td>
								<td width="150px" align="center"><b>ÚLTIMA ATUALIZAÇÃO</b></td>
								<td width="150px" align="center"><b>NOTA FISCAL</b></td>
							</tr>
							<tr bgcolor="#FFFFFF">
								<td>{this.state.nextPayment[1]}</td>
								<td>{this.state.nextPayment[2]}</td>
								<td>{this.state.nextPayment[3]}</td>
								<td>{this.state.nextPayment[4]}</td>
								<td>
									<a href={this.state.nextPayment[5]} target="_blank">
										<img src="./img/bt_download.png" alt="download nota fiscal" />
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="space" />
					<div className="aligned-inside-container">RESUMO GERAL ATÉ {this.state.pastPaymentsDate}</div>
					<table className="financial-table aligned-inside-container" width="700px" cellPadding="10" border="0">
						<tbody>
							<tr bgcolor="#A5CE37">
								<td width="250px" align="center"><b>IDENTIFICADOR</b></td>
								<td width="150px" align="center"><b>VALOR</b></td>
								<td width="150px" align="center"><b>STATUS</b></td>
								<td width="150px" align="center"><b>ÚLTIMA ATUALIZAÇÃO</b></td>
								<td width="150px" align="center"><b>NOTA FISCAL</b></td>
							</tr>
							{listPayments}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
	
}