/**
 * @returns The correctly formed Geotab API URL
 */
    var getUrl = function () {
    return window.location.protocol + '//' + window.location.hostname + '/apiv1';
};

module.exports = {
    getUrl
}