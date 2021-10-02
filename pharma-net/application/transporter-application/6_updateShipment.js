'use strict';

/**
 * This is a Node.JS application to update Shipment on the Network
 */

const helper = require('./contractHelper');

async function main(buyerCRN, drugName, transporterCRN) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for updateShipment on the Network');
		const updateShipmnentBuffer = await pharmanetContract.submitTransaction('updateShipment',buyerCRN, drugName, transporterCRN);
		// process response
		console.log('.....Processing  update shipment  Transaction Response \n\n');
		let shipment = JSON.parse(updateShipmnentBuffer.toString());
		console.log(shipment);
		console.log('\n\n..... update shipment  Transaction Complete!');
		return shipment;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		helper.disconnect();
	}
}


module.exports.execute = main;
