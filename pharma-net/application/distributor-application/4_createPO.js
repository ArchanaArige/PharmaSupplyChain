'use strict';

/**
 * This is a Node.JS application to Create PurchaseOrder on the Network
 */

const helper = require('./contractHelper');

async function main(buyerCRN, sellerCRN, drugName, quantity) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for createPO on the Network');
		const poBuffer = await pharmanetContract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity);
		// process response
		console.log('.....Processing PurchaseOrder Transaction Response \n\n');
		let purchaseOrder = JSON.parse(poBuffer.toString());
		console.log(purchaseOrder);
		console.log('\n\n.....PurchaseOrder Transaction Complete!');
		return purchaseOrder;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		helper.disconnect();
	}
}

module.exports.execute = main;
