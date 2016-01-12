import React from 'react';
import nsa from './nsajs/index.js';
import gyro from './gyro.js/gyro.min.js';

var styles = {
	wrapper: {
		flexGrow: 1,
		position: 'relative'
	},
	inner: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '80%',
		boxSizing: 'border-box',
		padding: 20
	},
	image: {
		borderRadius: 300,
		width: '100%',
		height: '100%',
		backgroundImage: 'url(./img/head.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'center center'
	},
	greeting: {
		position: 'absolute',
		top: '80%',
		left: 0,
		right: 0,
		fontSize: 20,
		fontFamily: 'Rock Salt',
		textAlign: 'center'
	}
};

var Puppeteer = React.createClass({
	componentDidMount() {
		gyro.frequency = 50;
		gyro.startTracking(function (o) {
			nsa.send({
				orientation: {
					alpha: o.alpha,
					beta: o.beta,
					gamma: o.gamma
				}
			});
		});
	},
	componentWillUnmount() {
		gyro.stopTracking();
	},
	//
	render() {
		return (
			<div style={styles.wrapper}>
				<div style={styles.inner}>
					<div style={styles.image}></div>	
				</div>
				<div style={styles.greeting}>Hello, my name is Kurt!</div>	
			</div>
		);
	}	
});

export default Puppeteer;