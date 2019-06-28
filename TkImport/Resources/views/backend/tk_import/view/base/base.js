Ext.define('Shopware.apps.TkImport.view.base.Base', {
    extend: 'Enlight.app.Window',
    height: 400,
    width: 300,
    eventAlias: 'base-file',

    onAfterRenderComponent: function () {
        const me = this;
        me.callParent(arguments);
        me.minimize();
        me.show();
    }

});