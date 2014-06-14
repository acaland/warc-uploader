Ext.Loader.setPath({
    'Ext.ux' : '../extjs-upload-widget/lib'
});

Ext.application({

    requires : [
        'Ext.ux.upload.Dialog'
    ],

    name : 'Example',

    appFolder : 'app',

    launch : function() {
        debug = console;

        var viewport = Ext.create('Ext.container.Viewport', {
            layout : 'fit'
        });

        var appPanel = Ext.create('Ext.panel.Panel', {
            title : 'Files',
            //width : 600,
            //height : 400,
            closable : false,
            modal : true,
            bodyPadding : 5,
	    xtype: 'mainPanel',
            dockedItems : [
                {
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [
                        {
                            xtype : 'button',
                            text : 'Carica files',
                            handler : function() {

                                var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                                    dialogTitle : 'My Upload Dialog',
                                    uploadUrl : 'upload.php',

                                    listeners : {
                                        'uploadcomplete' : {
                                            scope : this,
                                            fn : function(upDialog, manager, items, errorCount) {

                                                var output = 'Uploaded files: <br>';
                                                Ext.Array.each(items, function(item) {
                                                    output += item.getFilename() + ' (' + item.getType() + ', '
                                                    + Ext.util.Format.fileSize(item.getSize()) + ')' + '<br>';
                                                });

                                                appPanel.update(output);

                                                if (!errorCount) {
                                                    upDialog.close();
                                                }

                                            }
                                        }
                                    }
                                });

                                uploadDialog.show();
                            }
                        }
                    ]
                }
            ]
        });
	viewport.items = [
		{
			xtype: 'mainPanel'
		}
	];
        //appPanel.show();
    }
});
