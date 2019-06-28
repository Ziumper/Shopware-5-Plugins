Ext.define('Shopware.apps.TkBundle.model.Bundle', {
    extend: 'Shopware.data.Model',

    //todo Implement
    //  - the model fields
    //  - the `configure` function in order to configure the connection to the PHP backend controller
    // https://developers.shopware.com/developers-guide/backend-components/basics/#the-data-model-swag_product_basic/model/product.js

    configure: function () {
        return {
            controller: 'TkBundle',
            detail: 'Shopware.apps.TkBundle.view.detail.Bundle'
        };
    },

    fields: [
        { name: 'id', type: 'int', useNull: true },
        { name: 'name', type: 'string' },
        { name: 'active', type: 'boolean' }
    ],

    associations: [
        {
            relation: 'ManyToMany',
            type: 'hasMany',
            model: 'Shopware.apps.TkBundle.model.Product',
            name: 'getProducts',
            associationKey: 'products'
        }
    ]
});
