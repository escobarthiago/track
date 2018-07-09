import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
	render() {
		return(
			<div className={this.props.currentPage==="/login"?"hide menu":" menu"}>
				<Link to="/timetable" className={this.props.currentPage==='/timetable'?"active":""}>
					Timetable
				</Link>
				<Link to="/controle-de-horas" className={this.props.currentPage==='/controle-de-horas'?"active hugeMenu":"hugeMenu"}>
					Controle<br/>de Horas
				</Link>
				<Link to="/controle-financeiro" className={this.props.currentPage==='/controle-financeiro'?"active hugeMenu":" hugeMenu"}>
					Controle<br/>Financeiro
				</Link>
				<Link to="/pecas" className={this.props.currentPage==='/pecas'?"active":""}>
					Peças
				</Link>
			</div>
		);
	}
	
}