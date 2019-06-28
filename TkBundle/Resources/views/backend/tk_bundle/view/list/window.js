//{namespace name="bundle/translation"}

Ext.define('Shopware.apps.TkBundle.view.list.Window', {
    extend: 'Shopware.window.Listing',

    alias: 'widget.bundle-list-window',
    height: 450,
    title: '{s name=window_title}{/s}',

    configure: function () {
        return {
            listingGrid: 'Shopware.apps.TkBundle.view.list.Bundle',
            listingStore: 'Shopware.apps.TkBundle.store.Bundle'
        };
    }
});
