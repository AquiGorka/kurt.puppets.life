import React from 'react';

var styles = {
	wrapper: {
		fontFamily: 'Love Ya Like A Sister',
		padding: '20px 10px 10px 20px',
		fontSize: 35,
		borderBottom: '3px solid orange',
		background: 'rgba(255,255,255,0.99)',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		display: 'flex'
	}
};

export default () => {
	return (
		<div style={styles.wrapper}>
			<div>Puppets.life</div>
		</div>
	);
};

