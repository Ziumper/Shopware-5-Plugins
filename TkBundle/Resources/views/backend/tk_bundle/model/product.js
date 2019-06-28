Ext.define('Shopware.apps.TkBundle.model.Product', {
    extend: 'Shopware.apps.Base.model.Article',

    configure: function () {
        return {
            related: 'Shopware.apps.TkBundle.view.detail.Product'
        };
    }
});