const assert = require('chai').assert;
const parsers = require('../../src/app/scripts/Parsers')

describe('Parsers', function(){
    it('String parsing', function(){
        assert.equal(parsers.parseStringValue('test'), 'test');
    });
    it('String parsing', function(){
        assert.equal(parsers.parseStringValue(''), '');
    });
    it('String parsing', function(){
        assert.equal(parsers.parseStringValue('(null)'), '');
    });
    it('Float parsing', function(){
        assert.equal(parsers.parseFloatValue(1.234), 1.234);
    });
    it('Float parsing', function(){
        assert.equal(parsers.parseFloatValue('1.234'), 1.234);
    });
    it('Float parsing', function(){
        assert.equal(parsers.parseFloatValue('test'), 0);
    });
    // it('Date parsing', function(){
    //     assert.equal(parsers.parseDateValue('2/15/2022'), '2022-02-15T00:00:00.000Z');
    // });
    it('String length parsing', function(){
        assert.isTrue(parsers.parseStringLength('This is a long string', 4) === 'This');
    });
    it('Date parsing - should work', function(){
        assert.equal(parsers.parseDate('16/2/2022','DD/M/YYYY', 'America/Los_Angeles'), '2022-02-16T08:00:00.000Z');
    });
    it('Date parsing - not sure', function(){
        assert.equal(parsers.parseDate('16/2/2022','M/D/YYYY', 'America/Los_Angeles'), null);
    });
    it('Date parsing - checking 1', function(){
        assert.equal(parsers.parseDate('16/2/2022','garbage', 'America/Los_Angeles'), null);
    });
    it('Date parsing - checking 2', function(){
        assert.equal(parsers.parseDate('16/2/2022 10:00:00','d/m/y', 'America/Los_Angeles'), null);
    });
    it('Date parsing - checking 3', function(){
        assert.equal(parsers.parseDate('16/2/2022 10:00:00','DD/MM/YYYY HH:mm:ss', 'America/Los_Angeles'), '2022-02-16T18:00:00.000Z');
    });
    it('Date parsing - minimum character check', function(){
        assert.equal(parsers.parseDate('220225','YYMMDD', 'America/Los_Angeles'), '2022-02-25T08:00:00.000Z');
    });
    it('Date format parsing', function() {
        assert.isFalse(parsers.parseDateFormat('DMY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isFalse(parsers.parseDateFormat('YDM').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isFalse(parsers.parseDateFormat('MDY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isFalse(parsers.parseDateFormat('DDMMYY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isFalse(parsers.parseDateFormat('MMYY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isTrue(parsers.parseDateFormat('DDMMYYYY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isTrue(parsers.parseDateFormat('MMDDYYYY').ReturnValue);
    });
    it('Date format parsing', function() {
        assert.isTrue(parsers.parseDateFormat('YYYYMMDD').ReturnValue);
    });

});