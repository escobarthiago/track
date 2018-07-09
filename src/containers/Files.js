import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import {FILES_DATA_PATH} from '../constants';

export default class Files extends Component {
	constructor(props) {
		super(props);
		this.state= {
			'pageDataLoaded': false,
			'filesData':[]
		};
	}
	componentDidMount() {
		var thisComponent = this;
		fetch(FILES_DATA_PATH)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				thisComponent.setState({
					'pageDataLoaded': true,
					'filesData':data,
				});
			}
		);
	}
	render() {
		const filesData = this.state.filesData;
		const listFiles = filesData.map((file,index) => <tr bgcolor={index%2===0?"#FFFFFF":"#DEEFA8"}><td align="center"><img src={file.thumbnail} alt="thumbnail" /></td><td>{file.description}</td><td align="center"><a href={file.link} target="_blank"><img src="./img/bt_download.png" alt="download nota fiscal" /></a></td></tr>);
		return(
			<div>
				<Preloader pageDataLoaded={this.state.pageDataLoaded}/>
				<div className={this.state.pageDataLoaded?'':'hide'}>
					<table className="financial-table aligned-inside-container" width="700px" cellPadding="10" border="0">
						<tbody>
							<tr bgcolor="#A5CE37">
								<td width="200px" align="center"><b>PEÇA</b></td>
								<td width="400px" align="center"><b>DESCRIÇÃO</b></td>
								<td width="100px" align="center"><b>LINK</b></td>
							</tr>
							{listFiles}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
	
}