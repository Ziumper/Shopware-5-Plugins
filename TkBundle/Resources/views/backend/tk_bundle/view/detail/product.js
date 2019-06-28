Ext.define('Shopware.apps.TkBundle.view.detail.Product', {
    extend: 'Shopware.grid.Association',
    alias: 'widget.bundle-view-detail-product',
    height: 300,
    title: '{s name="linked_products"}{/s}',

    configure: function() {
        return {
            controller: 'TkBundle',
            columns: {
                name: {}
            }
        };
    }
});
