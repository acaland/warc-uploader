Ext.define('Uploader.view.FilesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fileslist',
    store: 'FileList',
    title: 'Uploader',
    //html : 'Please select one or more file to upload'
    columns: [
        {
            text: 'FileName',
            width: '40%',
            sortable: true,
            hideable: false,
            dataIndex: 'filename'
        },
        {
            text: 'Status',
            width: '40%',
            dataIndex: 'status'

        },
        {
            text: 'Size',
            width: '20%',
            dataIndex: 'size'
        },
    ],
    tbar: [
        {
            text: 'Add Files...',
            itemId: 'addFiles'

        },
        '-',
        {
            text: 'Start Upload',
            itemId: 'startUpload'
        }
    ]
    
});