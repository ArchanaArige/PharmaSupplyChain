'use strict';

/**
 * This is a Node.JS application to Add Drug on the Network
 */

const helper = require('./contractHelper');

async function main(drugName, serialNo, mfgDate, expDate, companyCRN) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for addDrug on the Network');
		const drugBuffer = await pharmanetContract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyCRN);
		// process response
		console.log('.....Processing Add drug  Transaction Response \n\n');
		let drug = JSON.parse(drugBuffer.toString());
		console.log(drug);
		console.log('\n\n.....Add drug  Transaction Complete!');
		return drug;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		helper.disconnect();
	}
}

module.exports.execute = main;
