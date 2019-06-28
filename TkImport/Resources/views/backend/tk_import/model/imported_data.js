
Ext.define('Shopware.apps.TkImport.model.ImportedData', {
    extend: 'Shopware.data.Model',

    configure: function() {
        return {
            controller: 'TkImport',
            detail: 'Shopware.apps.TkImport.view.detail.Container'
        };
    },


    fields: [
        { name : 'id', type: 'int', useNull: true },
        { name : 'name', type: 'string', useNull: false }
    ]
});
