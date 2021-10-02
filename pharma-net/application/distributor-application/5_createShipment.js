'use strict';

/**
 * This is a Node.JS application to create shipment on the Network
 */

const helper = require('./contractHelper');

async function main(buyerCRN, drugName, listOfAssets, transporterCRN) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('..... Requesting for createShipment on the Network');
		const shipmentBuffer = await pharmanetContract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterCRN);
		// process response
		console.log('.....Processing Shipment creation request Transaction Response \n\n');
		let shipment = JSON.parse(shipmentBuffer.toString());
		console.log(shipment);
		console.log('\n\n.....Shipment creation Transaction Complete!');
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
