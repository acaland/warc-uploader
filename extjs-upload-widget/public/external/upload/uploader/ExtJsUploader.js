/**
 * Uploader implementation - with the Connection object in ExtJS 4
 * 
 */
Ext.define('Ext.ux.upload.uploader.ExtJsUploader', {
    extend : 'Ext.ux.upload.uploader.AbstractXhrUploader',

    requires : [
        'Ext.ux.upload.data.Connection'
    ],

    config : {
        /**
         * @cfg {String} [method='PUT']
         * 
         * The HTTP method to be used.
         */
        method : 'PUT',

        /**
         * @cfg {Ext.data.Connection}
         * 
         * If set, this connection object will be used when uploading files.
         */
        connection : null
    },

    /**
     * @property
     * @private
     * 
     * The connection object.
     */
    conn : null,

    /**
     * @private
     * 
     * Initializes and returns the connection object.
     * 
     * @return {Ext.ux.upload.data.Connection}
     */
    initConnection : function() {
        var conn,
            url = this.url;

        if (this.connection instanceof Ext.data.Connection) {
            conn = this.connection;
        } else {

            if (this.params) {
                url = Ext.urlAppend(url, Ext.urlEncode(this.params));
            }

            conn = Ext.create('Ext.ux.upload.data.Connection', {
                disableCaching : true,
                method : this.method,
                url : url,
                timeout : this.timeout,
                defaultHeaders : {
                    'Content-Type' : this.contentType,
                    'X-Requested-With' : 'XMLHttpRequest'
                }
            });
        }

        return conn;
    },

    /**
     * @protected
     */
    initHeaders : function(item) {
        var headers = this.callParent(arguments);

        headers['Content-Type'] = item.getType();

        return headers;
    },


    generateURL: function(item, _callback) {

        var vo = 'vo.indicate-project.eu';
        //console.log("sono in generateURL");
        //console.log(item.getFileApiObject().name);
        console.log(item.name);
        var filename = item.getFileApiObject().name.replace(/ /g, "_");
        console.log(filename);
        var se = 'infn-se-03.ct.pi2s2.it';
        var se_path = '/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary'; 

        var url = '/dm/put/' + vo +'/' + filename + '/' + se + se_path;

        Ext.Ajax.request({
            url: url,
            scope : this,
            success: function(response){
                
                // process server response here
                var info = {
                    success : false,
                    message : 'Error white generating Storage TURL',
                    response : response
                };

                if (response.responseText) {
                    var responseJson = Ext.decode(response.responseText);
                    if (responseJson && responseJson.redirect) {
                        
                        var url = responseJson.redirect;
                        console.log(url);
                        this.url = url;

                        this.uploadItem(item);
                    } else {

                        Ext.apply(info, {
                            message : 'Error white generating Storage TURL'
                            //message : responseJson.message
                        });
                        console.log(this);
                        this.fireEvent('uploadfailure', item, info);
                    }
                
                }
            }
        });

    },



    /**
     * Implements {@link Ext.ux.upload.uploader.AbstractUploader#uploadItem}
     * 
     * @param {Ext.ux.upload.Item} item
     */
    uploadItem : function(item) {
        var file = item.getFileApiObject();
        console.log(file);
        if (!file) {
            return;
        }

        item.setUploading();

        this.conn = this.initConnection();

        /*
         * Passing the File object directly as the "rawFata" option.
         * Specs:
         *   https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#the-send()-method
         *   http://dev.w3.org/2006/webapi/FileAPI/#blob
         */
        this.conn.request({
            scope : this,
            headers : this.initHeaders(item),
            rawData : file,

            success : Ext.Function.bind(this.onUploadSuccess, this, [
                    item
                ], true),
            failure : Ext.Function.bind(this.onUploadFailure, this, [
                    item
                ], true),
            progress : Ext.Function.bind(this.onUploadProgress, this, [
                    item
                ], true)
        });

    },

    /**
     * Implements {@link Ext.ux.upload.uploader.AbstractUploader#abortUpload}
     */
    abortUpload : function() {
        if (this.conn) {
        	/*
        	 * If we don't suspend the events, the connection abortion will cause a failure event. 
        	 */
        	this.suspendEvents();
            this.conn.abort();
            this.resumeEvents();
        }
    }
});