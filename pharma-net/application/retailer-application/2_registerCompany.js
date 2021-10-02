'use strict';

/**
 * This is a Node.JS application to Register a Company on the Network
 */

const helper = require('./contractHelper');

async function main(companyCRN, companyName, location, organisationRole) {

	try {
		const pharmanetContract = await helper.getContractInstance();
		console.log('.....Requesting for registerCompany on the Network');
		const registerCompanyBuffer = await pharmanetContract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);
		// process response
		console.log('.....Processing register company Transaction Response \n\n');
		let company = JSON.parse(registerCompanyBuffer.toString());
		console.log(company);
		console.log('\n\n.....Register company Transaction Complete!');
		return company;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		helper.disconnect();
	}
}


module.exports.execute = main;
