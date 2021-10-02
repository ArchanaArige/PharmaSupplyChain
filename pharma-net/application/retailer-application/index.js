const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

// Import all function modules

const addToWallet = require('./1_addToWallet');
const registerCompany = require('./2_registerCompany');
const retailDrug = require('./7_retailDrug');
const viewHistory = require('./8_viewHistory');
const createPO = require('./4_createPO');
const viewDrugCurrentState = require('./9_viewDrugCurrentState');


// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharma-Network App');

app.get('/', (req, res) => res.send('Hello Retailer'));

app.post('/addToWallet/retailer', (req, res) => {
    addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath).then(() => {
        console.log('User Credentials added to wallet');
        const result = {
            status: 'success',
            message: 'User credentials added to wallet'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/viewHistory', (req, res) => {
    viewHistory.execute(req.body.drugName, req.body.serialNo).then((drugHistory) => {
        console.log('viewHistory of Drug request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Drug-History fetched successfully',
            drugHistory: drugHistory
       };
       res.json(result);
   })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/viewDrugCurrentState', (req, res) => {
    viewDrugCurrentState.execute(req.body.drugName, req.body.serialNo).then((drugStatus) => {
      console.log('viewDrugCurrentState request submitted on the Network');
      const result = {
          status: 'success',
          message: 'Drug-CurrentState fetched successfully',
          drugStatus: drugStatus
      };
      res.json(result);
  })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/registerCompany', (req, res) => {
    registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.location, req.body.organisationRole).then((company) => {
        console.log('registerCompany request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Company-Registered successfully',
            company: company
        };
        res.json(result);
  })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/createPO', (req, res) => {
    createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName, req.body.quantity).then((purchaseOrder) => {
        console.log('createPO request submitted on the Network');
        const result = {
            status: 'success',
            message: 'PurchaseOrder-Created successfully',
            purchaseOrder: purchaseOrder
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/retailDrug', (req, res) => {
    retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar).then((drug) => {
        console.log('retailDrug request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Retailer-Sold successfully',
            drug: drug
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});


app.listen(port, () => console.log(`Distributed Pharma-Net App listening on port ${port}!`));