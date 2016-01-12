import React from 'react';
import Header from './header.js';
import Controls from './controls.js';

var styles = {
	app: {
		wrapper: {
			background: 'rgba(255,255,255,0.8)',
			boxShadow: '0 0 10px 1px #CCC',
			flexGrow: 1,
			display: 'flex',
			width: '100%',
			flexWrap: 'wrap',
			flexFlow: 'column',
			borderRadius: 5
		}
	}
};

export default () => {
	return (
		<div style={styles.app.wrapper}>
			<Header />
			<Controls />
		</div>
	);
};