Ext.define('Shopware.apps.TkBundle.store.Bundle', {
    extend: 'Shopware.store.Listing',

    //todo The store needs to "know" its model, additionally the PHP controller must be defined in the `configure` function
    // https://developers.shopware.com/developers-guide/backend-components/basics/#the-data-store-swag_product/store/product.js

    configure: function () {
        return {
            controller: 'TkBundle'
        };
    },

    model: 'Shopware.apps.TkBundle.model.Bundle'
});
