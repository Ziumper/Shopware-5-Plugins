Ext.define('Shopware.apps.TkImport.controller.Main', {
    extend: 'Enlight.app.Controller',

    init: function () {
        const me = this;
        me.subscribeToEvents();
        me.mainWindow = me.getView('Window').create({}).show();
    },

    subscribeToEvents: function () {
        const me = this;

        me.control({
            'tk-import-manager-import button[action=tk-import-button]': {
                click: me.onImport
            },
            'tk-import-window-import': {
                startProcess: me.onStartProcess,
                cancelProcess: me.onCancelProcess
            },
            'tk-import-detail-window': {
                'add-item-after-create-tab-items': afterCreateTabItems,
            },
            'tk-import-container': {
                'product-container-after-init-component': changeTitleTab
            },
            'tk-import-listing-grid': {
                'tk-import-grid-add-button-created': changeWordingForAddButton
            },
            'tk-import-file-container': {
                'import-container-after-init-component': changeTitleTabForImportFileTab
            }
        });

        function changeTitleTabForImportFileTab(window) {
            window.title = "Import Data From CSV";
            return window;
        }

        function afterCreateTabItems(window, items) {

            items.push(createOwnTabItem());

            return items;
        }

        function createOwnTabItem() {
            return Ext.create('Ext.container.Container', {
                items: [],
                title: 'Import Data From CSV'
            });
        }

        function changeTitleTab(window) {
            window.title = "Test title";
            return window;
        }

        function changeWordingForAddButton(window, button) {
            button.text = 'Add / Import '
            return button;
        }
    },

    onImport: function (btn) {
        var me = this;
        var localFile = btn.up('form').down('#importSelectFile').getValue();

        var validationResult = me.isImportedFileValid(localFile);

        if(validationResult.isEmpty) {
            Shopware.Msg.createStickyGrowlMessage({
                title:'Import file validation',
                text: 'No file was selected!'
            });

            return;
        }

        if(!validationResult.isProperlyFileFormatExtension) {
            Shopware.Msg.createStickyGrowlMessage({
                title:'Import file validation',
                text: 'Please select properly CSV file format'
            });

            return;
        }

        me.uploadFile(btn);
    },

    /**
     *
     * Check is file is valid and show notifications messages
     *
     */
    isImportedFileValid: function(localFile) {
        var regex = RegExp('([a-zA-Z0-9\\s_\\\\.\\-\\(\\):])+(.csv)$');

        console.log('Hello from is imported file valid');

        var isEmpty = Ext.isEmpty(localFile);

        var isProperlyFileFormatExtension = regex.test(localFile);

        var validationObject = {
            isProperlyFileFormatExtension: isProperlyFileFormatExtension,
            isEmpty: isEmpty
        }

        return validationObject;
    },

    uploadFile: function(btn) {
        var me = this;
        var form = btn.up('form').getForm();
        form.submit({
            url: '{url module=backend controller="TkImportFile" action="importOnly"}',
            waitMsg: 'Importing... please wait',
            scope: me,
            success: function (fp, response) {

                Shopware.Msg.createStickyGrowlMessage({
                    title: 'Import',
                    text: response.result.msg
                });
                me.hideMask();
            },
            failure: function (fp, response) {
                Shopware.Msg.createStickyGrowlMessage({
                    title: 'Import failed!',
                    text: response.result.msg
                });
                me.hideMask();
            }
        });
    },

    hideMask: function () {
        var mask = Ext.get(Ext.getBody().query('.x-mask'));
        mask.hide();
    },

    setFilePath: function(path) {
        var me = this;
        console.log(me.parameters);
        me.parameters.importFile = path;
        console.log(me.parameters);
    },


    /**
     * Creates batch configuration
     */
    onCreateImportWindow:

        function () {
            var me = this;

            me.getBatchConfig = me.getConfig();
        }

    ,

    /**
     * Returns the needed configuration for the next batch call
     */
    getConfig: function () {
        var me = this;

        me.batchConfig = {
            requestUrl: '{url controller="TkImportFile" action="import"}',
            action: 'close-window-import',
            params: {
                profileId: me.parameters.profile,
                sessionId: me.parameters.sessionId,
                importFile: me.parameters.importFile,
            },
            //snippets: me.snippets
        };

        Ext.Ajax.request({
            url: '{url controller="TkImportFile" action="prepareImport"}',
            method: 'POST',
            params: me.batchConfig.params,
            success: function (response) {
                var result = Ext.decode(response.responseText);

                if (result.success === false) {
                    Shopware.Msg.createStickyGrowlMessage({
                        title: 'Import Error',
                        text: result.msg
                    });
                    var mask = Ext.get(Ext.getBody().query('.x-mask'));
                    mask.hide();
                    return;
                }

                me.batchConfig.position = result.position;
                me.batchConfig.totalCount = result.count;
                me.batchConfig.snippet = /*me.snippets.process + */ me.batchConfig.position + ' / ' + me.batchConfig.totalCount;
                me.batchConfig.progress = me.batchConfig.position / me.batchConfig.totalCount;

                me.batchConfig.params.position = result.position;
                me.batchConfig.params.totalCount = result.count;

                me.window = me.getView('Shopware.apps.TkImport.view.import.window.Import').create({
                    batchConfig: me.batchConfig
                }).show();
            },
            failure: function (response) {
                Shopware.Msg.createStickyGrowlMessage({
                    title: 'An error occured',
                    text: response.responseText
                });
            }
        });
    }
    ,


    onCancelProcess: function(btn) {
        var me = this;

        btn.disable();

        me.cancelOperation = true;
    },

    onStartProcess: function(win, btn) {
        var me = this;

        me.cancelOperation = false;

        me.runRequest(win);

        btn.hide();
        win.cancelButton.show();
    },

    /**
     * This function sends a request to export data
     *
     * @param { Enlight.app.SubWindow } win
     * @param { boolean } extension
     */
    runRequest: function(win, extension) {
        var me = this,
            config = me.batchConfig,
            params = config.params;


        console.log('Hello from runRequest function');
        console.log(me.batchConfig);
        console.log(params);

        if (!Ext.isDefined(extension)) {
            extension = false;
        }

        // if cancel button was pressed
        if (me.cancelOperation) {
            win.closeButton.enable();
            return;
        }

        Ext.Ajax.request({
            url: config.requestUrl,
            method: 'POST',
            params: params,
            timeout: 4000000,
            success: function(response) {
                var result = Ext.decode(response.responseText);

                if (result.success == false) {
                    var msg = 'Import error';

                    if (extension) {
                        msg = 'Extension import error';
                    }

                    return Shopware.Msg.createStickyGrowlMessage({
                        title: msg,
                        text: result.msg
                    });
                }

                me.batchConfig.params = result.data;
                me.batchConfig.position = result.data.position;

                if (result.data.count) {
                    me.batchConfig.totalCount = result.data.count;
                }

                if (result.data.load === true) {
                    // Shopware.Notification.createStickyGrowlMessage({
                    //     title: 'Import',
                    //     text: me.snippets.finime.snippets.unprocess
                    // });

                    win.importProgress.updateProgress(
                        me.batchConfig.position / me.batchConfig.totalCount,
                        /*me.snippets.process +*/ me.batchConfig.position + ' / ' + me.batchConfig.totalCount,
                        true
                    );

                    win.setLoading(true);

                    // sets artificial delay of 2 secs
                    setTimeout(function () {
                        win.setLoading(false);
                        me.runRequest(win, true);
                    }, 2000);
                } else {
                    win.importProgress.updateProgress(
                        me.batchConfig.position / me.batchConfig.totalCount,
                        /*me.snippets.process +*/ me.batchConfig.position + ' / ' + me.batchConfig.totalCount,
                        true
                    );

                    if (me.batchConfig.position === me.batchConfig.totalCount) {
                        me.onProcessFinish(win);
                    } else {
                        me.runRequest(win);
                    }
                }
            },
            failure: function(response) {
                Shopware.Msg.createStickyGrowlMessage({
                    title: 'An error occured',
                    text: response.responseText
                });
                me.onProcessFinish(win);
            }
        });
    },


    /**
     * Will be called when export finish
     *
     * @param object Enlight.app.SubWindow win
     */
    onProcessFinish: function(win) {
        var me = this;
        win.closeButton.enable();
        win.cancelButton.disable();
        win.importProgress.updateText(me.batchConfig.position + ' / ' + me.batchConfig.totalCount);

        Shopware.Msg.createStickyGrowlMessage({
            title: 'Import success',
            text: 'Import process finished successfully!'
        });
    }

})
;