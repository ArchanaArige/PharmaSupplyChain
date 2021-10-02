'use strict';

/**
 * This is a Node.JS application to Approve a New User on the Network
 */

const helper = require('./contractHelper');

async function main(drugName, serialNo, retailerCRN, customerAadhar) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for retailDrug on the Network');
		const drugBuffer = await pharmanetContract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);
		// process response
		console.log('.....Processing retail drug Transaction Response \n\n');
		let drug = JSON.parse(drugBuffer.toString());
		console.log(drug);
		console.log('\n\n.....retail drug Transaction Complete!');
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
