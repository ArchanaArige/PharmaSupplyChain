'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: REGISTRAR_ADMIN
 *  User Organization: REGISTRAR
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/consumer');

async function main(certificatePath, privateKeyPath) {

	// Main try/catch block
	try {

		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = 'CONSUMER_ADMIN';
		const identity = X509WalletMixin.createIdentity('consumerMSP', certificate, privatekey);

		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

// This script is needed ONLY if the user is  executing from command line tool
/* privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/f90398b37ff00f0f78afc5f70c799b60f1b3e0568052041855e0824b8bf769e5_sk
   certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem
   main('/home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem', '/home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/f90398b37ff00f0f78afc5f70c799b60f1b3e0568052041855e0824b8bf769e5_sk').then(() => {
   console.log('User identity added to wallet.');
}); 
*/

module.exports.execute = main;
