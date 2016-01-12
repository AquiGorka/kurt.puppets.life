import Peer from 'peerjs';
import config from '../config.js';

var connection,
	nsajs = {
		connect(id) {
			if (id) {
				return new Promise((resolve, reject) => {
					//
					var peer = new Peer({ key: config.peerjs.key });
					//
					connection = peer.connect(id);
					connection.on('open', () => resolve() );
				});
			} else {
				return Promise.reject('Puppet connect error: Please provide an id.');
			}
		},
		send(data) {
			if (connection) {
				connection.send(data);
			}
			return this;
		}
	};

export default nsajs;