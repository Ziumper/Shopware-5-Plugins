
Ext.define('Shopware.apps.TkImport', {
    extend: 'Enlight.app.SubApplication',

    name:'Shopware.apps.TkImport',

    loadPath: '{url action=load}',
    bulkLoad: true,

    controllers: [ 'Main' ],

    views: [
        'Window',
        'base.Base',

        'list.Window',
        'list.List',

        'detail.Container',
        'detail.Window',

        'import.Container',
        'import.window.Import'
    ],

    models: [ 'ImportedData' ],
    stores: [ 'ImportedData' ],

    launch: function() {
        return this.getController('Main').mainWindow;
    }
});