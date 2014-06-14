Ext.define('Uploader.model.TypesTree', {
    extend: 'Ext.data.Model',
   
    fields: [
      	{ name: 'id', type: 'int' },
        { name: 'text', type: 'string' },
        { name: 'path', type: 'string' }
    ]
});