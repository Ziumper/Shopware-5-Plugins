//{namespace name="bundle/translation"}

Ext.define('Shopware.apps.TkBundle.view.list.Bundle', {
    extend: 'Shopware.grid.Panel',

    //todo Implement the missing parts of this component
    // https://developers.shopware.com/developers-guide/backend-components/listing/#shopware.grid.panel-basics
    alias: 'widget.bundle-listing-grid',
    region: 'center',

    configure: function () {
        return {
            detailWindow: 'Shopware.apps.TkBundle.view.detail.Window'
        };
    }
});
