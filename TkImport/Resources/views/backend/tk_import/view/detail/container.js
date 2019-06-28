Ext.define('Shopware.apps.TkImport.view.detail.Container', {
    extend: 'Shopware.model.Container',
    padding: 20,
    alias: 'widget.tk-import-container',


    configure: function () {
        return {
            controller: 'TkImport',
            fieldSets: [
                {
                    title: 'Product data',
                    fields: {
                        name: 'Product name',
                    }
                }
            ],
            eventAlias: 'product-container'
        };
    }
});