import React from 'react';
import qmark from 'qmark';
import Puppeteer from './puppeteer.js';
import nsa from './nsajs/index.js';

var styles = {
	wrapper: {
		background: '#FFF',
		boxShadow: '0 0 10px 1px #CCC',
		flexGrow: 1,
		display: 'flex',
		borderRadius: 5
	},
	loading: {
		flexGrow: 1,
		backgroundImage: 'url(./img/spinner.gif)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '150px 150px',
		backgroundPosition: 'center center'
	}
};

var Controls = React.createClass({
	componentDidMount() {
		// check for ios
		// check for browser
		// get query param
		var id = qmark('t');
		if (id) {
			// connect to p2p network
			// then
			nsa.connect(id)
				.then(() => {
					this.setState({
						status: 'puppeteer'
					});
				})
				.catch((err) => {
					this.setState({
						status: 'error',
						msg: err
					});
				})
		} else {
			this.setState({
				status: 'no-id',
				msg: ''
			});
		}
	},
	getInitialState() {
		return {
			status: 'loading'
		};
	},
	//
	render() {
		var content = (
			<div style={styles.loading}></div>
		);
		if (this.state.status === 'puppeteer') {
			content = <Puppeteer />;
		}
		if (this.state.status === 'error') {
			content = <div>Error: {this.state.msg}</div>;
		}
		if (this.state.status === 'no-id') {
			content = <div>Error: no theater</div>;
		}
		if (this.state.status === 'no-support-for-this-browser') {
			content = <div>Error: no support for this browser</div>;
		}
		if (this.state.status === 'no-support-for-ios') {
			content = <div>Error: no support ios</div>;
		}
		return (
			<div style={styles.wrapper}>
				{content}
			</div>
		);
	}
});

export default Controls;