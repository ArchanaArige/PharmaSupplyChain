'use strict';

/**
 * This is a Node.JS application to View Drug Current State on the Network
 */

const helper = require('./contractHelper');

async function main(drugName, serialNo) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for viewDrugCurrentState on the Network');
		const drugStateBuffer = await pharmanetContract.submitTransaction('viewDrugCurrentState', drugName, serialNo);
		// process response
		console.log('.....Processing Drug state Transaction Response \n\n');
		let drugState = JSON.parse(drugStateBuffer.toString());
		console.log(drugState);
		console.log('\n\n..... Drug state Transaction Complete!');
		return drugState;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		helper.disconnect();
	}
}

module.exports = main;
