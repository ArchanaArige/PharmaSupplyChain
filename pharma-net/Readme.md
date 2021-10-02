

cd ~/workspace/pharma-net/network/
docker exec -it chaincode /bin/bash
docker rm $(docker ps -a -f status=exited -q)

~/workspace/pharma-net/application/manufacturer-application

Testcase 1: Part a
registerCompany (companyCRN, companyName, location, organisationRole)

docker exec -it peer0.manufacturer.pharma-network.com /bin/bash 
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:registerCompany","MAN001","Sun Pharma","Chennai","Manufacturer"]}' 


docker exec -it peer0.transporter.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:registerCompany","TRA001","FedEx","Delhi","Transporter"]}' 

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:registerCompany","TRA002","Blue Dart","Banglore","Transporter"]}'


docker exec -it peer0.distributor.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:registerCompany","DIST001","VG Pharma","Vizag","Distributor"]}'


docker exec -it peer0.retailer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:registerCompany","RET002","upgrad","Mumbai","Retailer"]}'


Testcase 1: Part b
addDrug (drugName, serialNo, mfgDate, expDate, companyCRN)
docker exec -it peer0.manufacturer.pharma-network.com /bin/bash 

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:addDrug","Paracetamol","001","04-20","03-23","MAN001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:addDrug","Paracetamol","002","04-20","03-23","MAN001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:addDrug","Paracetamol","003","04-20","03-23","MAN001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:addDrug","Paracetamol","004","04-20","03-23","MAN001"]}'


TestCase 2: Part a
 createPO (buyerCRN, sellerCRN, drugName, quantity)
docker exec -it peer0.distributor.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:createPO","DIST001","MAN001","Paracetamol","3"]}'

createShipment (buyerCRN, drugName, listOfAssets, transporterCRN )
docker exec -it peer0.manufacturer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:createShipment","DIST001","Paracetamol","Paracetamol-001,Paracetamol-002,Paracetamol-003","TRA001"]}'

updateShipment( buyerCRN, drugName, transporterCRN)
docker exec -it peer0.transporter.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:updateShipment","DIST001","Paracetamol","TRA001"]}'

viewDrugCurrentState (drugName, serialNo)
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","002"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","003"]}'

Testcase 2: Part b
createPO (buyerCRN, sellerCRN, drugName, quantity)
docker exec -it peer0.retailer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:createPO","RET002","DIST001","Paracetamol","2"]}'

createShipment (buyerCRN, drugName, listOfAssets, transporterCRN )
docker exec -it peer0.distributor.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:createShipment","RET002","Paracetamol","Paracetamol-001,Paracetamol-002","TRA002"]}'

viewDrugCurrentState (drugName, serialNo)
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","002"]}'

updateShipment( buyerCRN, drugName, transporterCRN)
docker exec -it peer0.transporter.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:updateShipment","RET002","Paracetamol","TRA002"]}'

viewDrugCurrentState (drugName, serialNo)
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","001"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","002"]}'


Testcase 2:Part c
retailDrug (drugName, serialNo, retailerCRN, customerAadhar)
docker exec -it peer0.retailer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:retailDrug","Paracetamol","001","RET002","AAD001"]}'

viewDrugCurrentState (drugName, serialNo)
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","001"]}'

Testcase 3:

viewHistory (drugName, serialNo)
docker exec -it peer0.consumer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewHistory","Paracetamol","001"]}'

viewDrugCurrentState (drugName, serialNo)
docker exec -it peer0.consumer.pharma-network.com /bin/bash
peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet:viewDrugCurrentState","Paracetamol","001"]}'

Consumer:
privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/f90398b37ff00f0f78afc5f70c799b60f1b3e0568052041855e0824b8bf769e5_sk
 certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem

Distributor:
privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/50ff47d986beded9373ba8243bc527df25f93679adc01c08e6981f7c9c0734b2_sk
certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem


Manufacturer:

privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/98bf897b8847c867fc1449c725e1085d69aa095da5017b2b09ae8577bdab4ecf_sk

certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/signcerts/Admin@manufacturer.pharma-network.com-cert.pem

Retailer:

privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/keystore/12d7ec534c550c40e49db92a34ff9611dbe0f0021907fe1d8aa3fa93a8dfddee_sk

certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/signcerts/Admin@retailer.pharma-network.com-cert.pem

Transporter:
privateKeyPath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/a500bb556ceaadbe975d5748f782227ed69dc643f352af99f0833f7f8ecd8457_sk

certificatePath : /home/upgrad/workspace/pharma-net/network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/Admin@transporter.pharma-network.com-cert.pem







