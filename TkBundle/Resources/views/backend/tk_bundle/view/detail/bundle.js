Ext.define('Shopware.apps.TkBundle.view.detail.Bundle', {
    extend: 'Shopware.model.Container',
    padding: 20,

    configure: function () {
        return {
            controller: 'TkBundle',
            associations: [ 'products' ]
        };
    }
});
