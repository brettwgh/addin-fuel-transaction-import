const transactionHelper = require('../../src/app/scripts/TransactionHelper');
const assert = require('chai').assert;
const transactionsExcelMock = require('./mocks/transactionsExcelMock.json');
const configurationMock = require('./mocks/configurationMock.json');
const { expect } = require('chai');

describe('Transaction parsing tests', () => {
    let entity;
    it('test transaction parsing - all should pass - 1', () => {
        entity = transactionHelper.parseTransaction(transactionsExcelMock[1], configurationMock.providers[0], transactionsExcelMock[0], 'europe/berlin');
        assert.isTrue(entity.cardNumber === 'ABC1');
        assert.isTrue(entity.comments === 'comments');
        assert.isTrue(entity.description === 'description');
        assert.isTrue(entity.driverName === 'driverName');
        assert.isTrue(entity.externalReference === 'externalReference');
        assert.isTrue(entity.licencePlate === 'LICPLATE');
        assert.isTrue(entity.providerProductDescription === 'providerProductDescription');
        assert.isTrue(entity.serialNumber === 'G7D020FC5C50');
        assert.isTrue(entity.siteName === 'siteName');
        assert.isTrue(entity.vehicleIdentificationNumber === 'vehicleIdentificationNumber'.toUpperCase());
        assert.isTrue(entity.sourceData === 'sourceData');
        assert.isTrue(entity.cost === 124.56);
        assert.isTrue(entity.currencyCode === 'CHF');
        assert.isTrue(entity.dateTime === '2020-01-17T23:00:00.000Z');
        assert.isTrue(entity.odometer === 100000);
        assert.isTrue(entity.productType === 'Regular');
        assert.isUndefined(entity.provider);
        assert.isTrue(entity.volume === 50);
        
    });
    it('test transaction parsing - all should pass - 2', () => {
        entity = transactionHelper.parseTransaction(transactionsExcelMock[2], configurationMock.providers[0], transactionsExcelMock[0], 'europe/berlin');
        assert.isTrue(entity.cardNumber === 'CDE1');
        assert.isTrue(entity.comments.length === 1024);
        assert.isTrue(entity.description.length === 255);
        assert.isTrue(entity.driverName === 'Sam');
        assert.isTrue(entity.vehicleIdentificationNumber === 'SHSRE5780CU007020');
        assert.isTrue(entity.externalReference === 'external reference');
        assert.isTrue(entity.serialNumber === 'GANZUEZB8UF0');
        assert.isTrue(entity.cost === 25.3656);
        assert.isTrue(entity.currencyCode === 'USD');
        assert.isTrue(entity.dateTime === '2020-03-23T23:00:00.000Z');
        assert.isTrue(entity.odometer === 10542.2356);
        assert.isTrue(entity.productType === 'Unknown');
        assert.isTrue(entity.provider === 'Allstar');
        assert.isTrue(entity.volume === 10.236);
    });
    it('test transaction parsing - all should pass - 3', () => {
        entity = transactionHelper.parseTransaction(transactionsExcelMock[4], configurationMock.providers[0], transactionsExcelMock[0], 'europe/berlin');
        assert.isTrue(entity.dateTime === null);
    });
    it('test multiple transactions', () => {
        return transactionHelper.ParseAndBuildTransactions(transactionsExcelMock, configurationMock.providers[0], 'europe/berlin')
            .then(results => {
                assert.isTrue(results[0].cardNumber === 'ABC1');
                assert.isTrue(results[1].provider === 'Allstar');
                assert.isTrue(results[2].serialNumber === 'G7D020FC5C50');
                assert.isTrue(results[3].vehicleIdentificationNumber === 'SHSRE5780CU007020');
                assert.isTrue(results[4].dateTime === '2020-03-26T23:00:00.000Z');
            });
    });
    it('test location and dateTime', () => {
        entity = transactionHelper.parseTransaction(transactionsExcelMock[6], configurationMock.providers[5], transactionsExcelMock[0], 'europe/berlin');
        assert.isTrue(entity.location[0].x === 46.1454582);
        assert.isTrue(entity.location[0].y === 6.08279037);
        assert.isTrue(entity.cardNumber === 'CARDNO');
        assert.isTrue(entity.comments === 'comments');
        assert.isTrue(entity.description === 'description');
        assert.isTrue(entity.driverName === 'driverName');
        assert.isTrue(entity.externalReference === 'external reference');
        assert.isTrue(entity.providerProductDescription === 'providerProductDescription');
        assert.isTrue(entity.sourceData === 'sourceData');
    });
});