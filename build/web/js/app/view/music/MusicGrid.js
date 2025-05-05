Ext.define('OpalMp3.view.music.MusicGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'musicgrid',
    id: 'musicGridId',
    title: 'Music Library',
    cls: 'custom-music-grid',
    style: 'color: rgb(255 246 233/var(--tw-text-opacity,1));',
    store: {
        type: 'musicstore',
//        pageSize: 25, // Set the number of records per page
//        proxy: {
//            type: 'memory', // For now, we're using memory proxy instead of server-side data
//            reader: {
//                type: 'json',
//                rootProperty: 'musicList'
//            }
//        }
    },
       
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        bind: {
//            store: '{musicstore}' // or if no ViewModel, directly set store: this.store
              store: this.store
        }
    },

    initComponent: function () {
        var isAdmin = localStorage.getItem('role') === 'admin';
        
  // CHANGED: Track buttons to control them later
        var editBtn = Ext.create('Ext.button.Button', {
            text: 'Edit Music',
            iconCls: 'x-fa fa-edit',
            hidden: !isAdmin,
            disabled: true, // CHANGED: initially disabled
            handler: this.onEditMusic
        });

        var deleteBtn = Ext.create('Ext.button.Button', {
            text: 'Delete Music',
            iconCls: 'x-fa fa-trash',
            hidden: !isAdmin,
            disabled: true, // CHANGED: initially disabled
            handler: this.onDeleteMusic
        });

        var addBtn = Ext.create('Ext.button.Button', {
            text: 'Add Music',
            iconCls: 'x-fa fa-plus',
            hidden: !isAdmin,
            handler: function () {
                Ext.create('OpalMp3.view.music.AddMusicForm').show();
            }
        });

        if (isAdmin) {
        this.selModel = {
            selType: 'checkboxmodel',
            mode: 'MULTI',
            listeners: {              
                        selectionchange: function (sm, selected) {
                        var grid = Ext.getCmp('musicGridId');  // new change 
                        var totalRecords = grid.getStore().getCount(); // new change
                        
                        if (selected.length === 0) {
                            editBtn.setDisabled(true);
                            deleteBtn.setDisabled(true);
                        } else if (selected.length === 1) {
                            editBtn.setDisabled(false);
                            deleteBtn.setDisabled(false);
                        } else {
                            editBtn.setDisabled(true);
                            deleteBtn.setDisabled(false);
                        }
                        
                        // CHANGED: If all rows selected, only show Delete button
                        if (selected.length === totalRecords) {
                            editBtn.setDisabled(true);
                        }
                    }
                // Hide or show the checkbox model when deleting or adding
//                select: function (sm, record) {
//                    console.log('Track selected:', record);
//                },
//                deselect: function (sm, record) {
//                    console.log('Track deselected:', record);
//                }
            }
        };
    }else {
    // Ensure that selModel is either not set or set to a valid model
    this.selModel = null;
}




        this.columns = [
            {
                xtype: 'rownumberer',
                text: 'S/N',
                width: 55,
            //    align: 'center'
                },
            { text: 'ID', dataIndex: 'id', width: 50, sortable: true , hidden: true},
            { text: 'Title', dataIndex: 'title', flex: 1, sortable: true },
            { text: 'Artist', dataIndex: 'artist', flex: 1 , sortable: true},
            { text: 'Album', dataIndex: 'album', flex: 1, sortable: true },
            { text: 'Genre', dataIndex: 'genre', flex: 1, sortable: true },
            {
                text: 'Time',
                dataIndex: 'duration',
                flex: 1,
                renderer: function (value) {
                    if (!value) return '';
                    const parts = value.split(':'); // [HH, MM, SS]
                    const minutes = parseInt(parts[1], 10);
                    const seconds = parseInt(parts[2], 10);
                    return `${minutes}:${('0' + seconds).slice(-2)}`; // e.g., 5:07
                }
            },
            {
                text: 'Release Date',
                dataIndex: 'releaseDate',
                flex: 1,
                renderer: function (value) {
                    if (!value) return '';
                    const date = new Date(value);
                    const day = ('0' + date.getDate()).slice(-2);
                    const month = ('0' + (date.getMonth() + 1)).slice(-2);
                    const year = date.getFullYear();
                    return `${year}-${month}-${day}`; // yyyy-MM-dd
                }
            },
                    // Add sorting functionality
//        this.viewConfig = {
//            enableTextSelection: true,
//            listeners: {
//                itemclick: function(view, record, item, index, e) {
//                    const store = view.getStore();
//                    const column = e.getTarget().getAttribute('dataIndex');
//                    const currentSort = store.getSorters();
//                    const sortOrder = currentSort[0] && currentSort[0].direction === 'ASC' ? 'DESC' : 'ASC';
//                    store.sort(column, sortOrder);
//                }
//            }
//        }
//            {
//                xtype: 'actioncolumn',
//                width: 100,
//                hidden: !isAdmin,
//                items: [
//                    {
//                        iconCls: 'x-fa fa-edit',
//                        tooltip: 'Edit',
//                        handler: function (grid, rowIndex) {
//                            const rec = grid.getStore().getAt(rowIndex);
//                            Ext.Msg.alert('Edit', 'Edit music: ' + rec.get('title'));
//                        }
//                    }
//                ]
//            }
        ];
                // Add sorting functionality
        this.viewConfig = {
            enableTextSelection: true,
            listeners: {
                itemclick: function(view, record, item, index, e) {
                    const store = view.getStore();
                    const column = e.getTarget().getAttribute('dataIndex');
                    const currentSort = store.getSorters();
                    const sortOrder = currentSort[0] && currentSort[0].direction === 'ASC' ? 'DESC' : 'ASC';
                    store.sort(column, sortOrder);
                }
            }
        };
        
              // CHANGED: Use button references in the toolbar for dynamic enable/disable
        this.tbar = [
            addBtn,
            editBtn,
            deleteBtn
        ];
           this.callParent(arguments);
           
    },
    
     onEditMusic: function () {
        var grid = Ext.getCmp('musicGridId');
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length !== 1) {
            Ext.Msg.alert('Error', 'Please select a single music track to edit.');
            return;
        }

        var track = selection[0];

        Ext.create('Ext.window.Window', {
            title: 'Edit Track',
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                padding: 10,
                items: [
                    { xtype: 'textfield', fieldLabel: 'Title', name: 'title', value: track.get('title') },
                    { xtype: 'textfield', fieldLabel: 'Artist', name: 'artist', value: track.get('artist') },
                    { xtype: 'textfield', fieldLabel: 'Album', name: 'album', value: track.get('album') },
                    { xtype: 'textfield', fieldLabel: 'Genre', name: 'genre', value: track.get('genre') },
                    { xtype: 'textfield', fieldLabel: 'Duration (mm:ss)', name: 'duration', value: track.get('duration') },
                    { xtype: 'datefield', fieldLabel: 'Release Date', name: 'releaseDate', format: 'Y-m-d', value: new Date(track.get('releaseDate')) }
                ],
                buttons: [
                    {
                        text: 'Save',
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (!form.isValid()) return;

                            var values = form.getValues();

                            Ext.Ajax.request({
                                url: '/OpalMp3/updateTrack.json',
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                jsonData: {
                                    id: track.get('id'),
                                    title: values.title,
                                    artist: values.artist,
                                    album: values.album,
                                    genre: values.genre,
                                    duration: values.duration,
                                    releaseDate: values.releaseDate
                                },
                                success: function () {
                                      showToast('✅ Music updated successfully!', '#4CAF50', 1500); // green for success
                                      grid.getSelectionModel().deselectAll();  // deselect the grid after edit save 
                                      grid.getStore().reload();
//                                    Ext.Msg.alert('Success', 'Music updated successfully!');
//                                    grid.getStore().reload();
                                },
                                failure: function () {
//                                    Ext.Msg.alert('Error', 'Failed to update music.');
                                      showToast('❌ Failed to update music.', '#f44336', 2000); // red for failure     
                                }
                            });

                            this.up('window').close();
                        }
                    },
                    {
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }]
        }).show();
    },

    onDeleteMusic: function () {
        var grid = Ext.getCmp('musicGridId');
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Warning', 'Please select at least one music to delete.');
            return;
        }

        Ext.Msg.confirm('Confirm Deletion', 'Are you sure you want to delete<br>the selected music?', function (btn) {
            if (btn === 'yes') {
                var ids = selection.map(function (record) {
                    return record.get('id');
                });

                Ext.Ajax.request({
                    url: '/OpalMp3/deleteTrack.json',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    jsonData: { ids: ids },
                    success: function () {
                    showToast('✅ Music deleted successfully!', '#4CAF50', 1500); // green for success
//                        Ext.Msg.alert('Success', 'Selected tracks deleted.');
          
                        grid.getStore().reload();
                    },
                    failure: function () {
                        showToast('❌ Failed to update music.', '#f44336', 2000); // red for failure    
//                        Ext.Msg.alert('Error', 'Failed to delete music.');
                    }
                });
            }
        });
    }


// Add track and Delete Track button
//        this.tbar = [
//            {
//                text: 'Add Music',
//                hidden: !isAdmin,
//                handler: function () {
//                     Ext.create('OpalMp3.view.music.AddMusicForm').show();
////                    Ext.Msg.alert('Add', 'Add music clicked');
//                }
//            },
//            {
//                text: 'Edit Music',
//                iconCls: 'x-fa fa-edit',
//                hidden: !isAdmin,
//                handler: function () {
//                    const grid = this.up('grid');
//                    const selection = grid.getSelectionModel().getSelection();
//
//                    if (selection.length === 0) {
//                        Ext.Msg.alert('Error', 'Please select a music to edit.');
//                        return;
//                    }
//
//                    // Show checkboxes and handle form display
////                    grid.getSelectionModel().setHidden(false);
//
//                    const track = selection[0];
//                    
//                    // Show checkboxes when editing
////                    grid.selModel.setVisible(true);
//
//
//                    Ext.create('Ext.window.Window', {
//                        title: 'Edit Track',
//                        modal: true,
//                        layout: 'fit',
//                        items: [{
//                            xtype: 'form',
//                            padding: 10,
//                            items: [
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Title',
//                                    name: 'title',
//                                    value: track.get('title')
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Artist',
//                                    name: 'artist',
//                                    value: track.get('artist')
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Album',
//                                    name: 'album',
//                                    value: track.get('album')
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Genre',
//                                    name: 'genre',
//                                    value: track.get('genre')
//                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Duration (mm:ss)',
//                                    name: 'duration',
//                                    value: track.get('duration')
//                                },
//                                {
//                                    xtype: 'datefield',
//                                    fieldLabel: 'Release Date',
//                                    name: 'releaseDate',
//                                    format: 'Y-m-d',
//                                    value: new Date(track.get('releaseDate'))
//                                }
//                            ],
//                            buttons: [
//                                {
//                                    text: 'Save',
//                                    handler: function () {
//                                        var form = this.up('form').getForm();
//                                        if (!form.isValid()) return;
//
//                                        var values = form.getValues();
//
//                                        Ext.Ajax.request({
//                                            url: '/OpalMp3/updateTrack.json',
//                                            method: 'POST',
//                                            headers: {
//                                                'Content-Type': 'application/json'
//                                            },
//                                            jsonData: {
//                                                id: track.get('id'),
//                                                title: values.title,
//                                                artist: values.artist,
//                                                album: values.album,
//                                                genre: values.genre,
//                                                duration: values.duration,
//                                                releaseDate: values.releaseDate
//                                            },
//                                            success: function () {
//                                                Ext.Msg.alert('Success', 'Music updated successfully!');
////                                                grid.getSelectionModel().deselectAll(); // Deselect the checkbox
//                                                grid.getStore().reload();
//                                            },
//                                            failure: function () {
//                                                Ext.Msg.alert('Error', 'Failed to update music.');
//                                            }
//                                        });
//                                        
//                                        
//                                         // Hide checkboxes after saving
////                                        grid.selModel.setVisible(false);
//                                        
//                                        // Hide checkboxes after save
////                                        grid.getSelectionModel().hidden = true;
//                                        this.up('window').close();
//                                    }
//                                },
//                                {
//                                    text: 'Cancel',
//                                    handler: function () {                      
//                                         // Hide checkboxes after canceling
////                                        grid.selModel.setVisible(false);
//                                        this.up('window').close();
//                                    }
//                                }
//                            ]
//                        }]
//                    }).show();
//                }
//            },
//
//            {
//                text: 'Delete Music',
//                hidden: !isAdmin,
//                handler: function () {
//                    var grid = Ext.getCmp('musicGridId');
//                    var selection = grid.getSelectionModel().getSelection();
//
//                    if (selection.length === 0) {
//                        Ext.Msg.alert('Warning', 'Please select a music to delete.');
//                        return;
//                    }
//                    
//                    // Show checkboxes when deleting
////                    grid.selModel.setVisible(true);
//
//                    Ext.Msg.confirm('Confirm Deletion', 'Are you sure you want to delete selected music?', function (btn) {
//                        if (btn === 'yes') {
//                            var idsToDelete = [];
//                            selection.forEach(function (track) {
//                                idsToDelete.push(track.get('id'));
//                            });
//
//                            // Send a request to delete the selected tracks
//                            Ext.Ajax.request({
//                                url: '/OpalMp3/deleteTrack.json',
//                                method: 'POST',
//                                headers: {
//                                'Content-Type': 'application/json'  // 👈 Required for JSON
//                                },
//                                jsonData: {
//                                    ids: idsToDelete  // 👈 if server expects this
//                                },
////                                params: { ids: idsToDelete },
//                                success: function (response) {
//                                    debugger;
//                                    var result = Ext.decode(response.responseText);
//                                    if (result.success) {
//                                    Ext.Msg.alert('Success', result.message);
//                                    Ext.getCmp('musicGridId').getStore().reload(); // reload the grid // recent change
////                                        grid.getStore().reload();  // Reload the store after deletion
//                                    } else {
//                                        Ext.Msg.alert('Error', result.message || 'Failed to delete music.');
//                                    }
//                                },
//                                failure: function () {
//                                    Ext.Msg.alert('Error', 'Something went wrong.');
//                                }
//                            });
//                        }
//                            // Hide checkboxes after deletion
////                            grid.getSelectionModel().hidden = true;
//
////                        // Hide checkboxes after deletion
////                        grid.selModel.setHidden(true);
//                    });
//                }
//            }
//        ];
//        
//        
//        // Pagination toolbar
////        this.bbar = {
////            xtype: 'pagingtoolbar',
//////            store: 'OpalMp3.store.MusicStore',
////            store: this.getStore(), // Get the store
////            displayInfo: true,
////            displayMsg: 'Displaying {0} - {1} of {2}',
////            emptyMsg: 'No music to display',
////            items: ['-', {
////                    text: 'Previous',
////                    handler: function () {
////                        var store = this.up('pagingtoolbar').getStore();
////                        store.previousPage();
////                    }
////                }, {
////                    text: 'Next',
////                    handler: function () {
////                        var store = this.up('pagingtoolbar').getStore();
////                        store.nextPage();
////                    }
////                }
////            ]
////        };
//
//
//
//        this.callParent(arguments);
//    }
});

function showToast(message, bgColor, duration) {
    var toast = Ext.DomHelper.append(document.body, {
        tag: 'div',
        html: message,
        style: `
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: ${bgColor};
            color: white;
            padding: 16px 24px;
            font-size: 16px;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        `
    }, true);

    setTimeout(function () {
        toast.setStyle('opacity', '1');
    }, 100);

    setTimeout(function () {
        toast.setStyle('opacity', '0');
        setTimeout(function () {
            toast.destroy();
        }, 500);
    }, duration);
}
