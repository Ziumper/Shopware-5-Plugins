Ext.define('Shopware.apps.TkBundle', {
    extend: 'Enlight.app.SubApplication',

    name: 'Shopware.apps.TkBundle',

    loadPath: '{url action=load}',
    bulkLoad: true,

    controllers: [ 'Main' ],

    views: [
        'list.Window',
        'list.Bundle',

        'detail.Bundle',
        'detail.Product',
        'detail.Window'
    ],

    models: [ 'Bundle','Product' ],
    stores: [ 'Bundle' ],

    launch: function () {
        return this.getController('Main').mainWindow;
    }
});
