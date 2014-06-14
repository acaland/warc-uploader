Ext.define('Uploader.controller.TypesTree', {
    extend: 'Ext.app.Controller',
    stores: ['FileList'],


    init: function() {
        this.control({
             'typestree': {
                 itemclick: function(self, record, element, index, event) {
                     console.log(record.data.text);
                     console.log(record);
                     //console.log(element);
                     console.log(index);
                     //console.log(event);
                     //console.log(self);


                 }
             },
            '#addFiles' : {
                  click: function() {
                      var fileListStore = this.getStore('FileList');
                      fileListStore.add({
                          'filename': 'Gino' ,
                          'status': 'Added',
                          'size': '13134'
                      });
                  }
            },
            '#startUpload' : {
                click: function() {
                    var fileListStore = this.getStore('FileList');
                    for (var i=0; i < fileListStore.data.items.length; i++) {
                        console.log(fileListStore.data.items[i].data);

                    }
                }
            }

        });
    }





});