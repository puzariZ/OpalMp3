/////* 
//// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
//// * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
//// */
////
////
//

Ext.define('OpalMp3.view.user.UserGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usergrid',
    id: 'userGridId',
    title: 'User List',
    cls: 'custom-user-grid',
    style: 'color: rgb(255 246 233/var(--tw-text-opacity,1));',
    store: {
        type: 'userstore',
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        bind: {
            store: this.store
        }
    },

    initComponent: function () {
        var isAdmin = localStorage.getItem('role') === 'admin';
        
        // CHANGED: Track buttons to control them later
        var editBtn = Ext.create('Ext.button.Button', {
            text: 'Edit User',
            iconCls: 'x-fa fa-edit',
            hidden: !isAdmin,
            disabled: true, // CHANGED: initially disabled
            handler: this.onEditUser
        });

        var deleteBtn = Ext.create('Ext.button.Button', {
            text: 'Delete User',
            iconCls: 'x-fa fa-trash',
            hidden: !isAdmin,
            disabled: true, // CHANGED: initially disabled
            handler: this.onDeleteUser
        });

        var addBtn = Ext.create('Ext.button.Button', {
            text: 'Add User',
            iconCls: 'x-fa fa-plus',
            hidden: !isAdmin,
            handler: function () {
                Ext.create('OpalMp3.view.user.AddUserForm').show();
            }
        });

        if (isAdmin) {
            this.selModel = {
                selType: 'checkboxmodel',
                mode: 'MULTI',
                listeners: {
                    selectionchange: function (sm, selected) {
                        var grid = Ext.getCmp('userGridId');  // new change 
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
                }
            };
        } else {
            // Ensure that selModel is either not set or set to a valid model
            this.selModel = null;
        }

        this.columns = [
            {
                xtype: 'rownumberer',
                text: 'S/N',
                width: 55,
            },
            { text: 'ID', dataIndex: 'id', width: 50, sortable: true, hidden: true},
            { text: 'Username', dataIndex: 'username', flex: 1, sortable: true },
            { text: 'Email', dataIndex: 'email', flex: 1, sortable: true },
            { text: 'Role', dataIndex: 'role', flex: 1, sortable: true },
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

    onEditUser: function () {
        var grid = Ext.getCmp('userGridId');
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length !== 1) {
            Ext.Msg.alert('Error', 'Please select a single user to edit.');
            return;
        }

        var user = selection[0];

        Ext.create('Ext.window.Window', {
            title: 'Edit User',
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                padding: 10,
                items: [
                    { xtype: 'textfield', fieldLabel: 'Username', name: 'username', value: user.get('username'), readOnly: true },
                    { xtype: 'textfield', fieldLabel: 'Email', name: 'email', value: user.get('email') },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Role',
                                        name: 'role',
                                        store: ['admin', 'user'],
                                        value: user.get('role')
                                    }
                ],
                buttons: [
                    {
                        text: 'Save',
                        handler: function () {
                            var form = this.up('form').getForm();
                            if (!form.isValid()) return;

                            var values = form.getValues();

                            Ext.Ajax.request({
                                url: '/OpalMp3/updateUser.json',
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                jsonData: {
                                    id: user.get('id'),
                                    username: values.username,
                                    email: values.email,
                                    role: values.role
                                },
                                success: function () {
                                    showToast('✅ User updated successfully!', '#4CAF50', 1500); // green for success
                                    grid.getSelectionModel().deselectAll();  // deselect the grid after edit save 
                                    grid.getStore().reload();
                                },
                                failure: function () {
                                    showToast('❌ Failed to update user.', '#f44336', 2000); // red for failure     
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

    onDeleteUser: function () {
        var grid = Ext.getCmp('userGridId');
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Warning', 'Please select at least one user to delete.');
            return;
        }

        Ext.Msg.confirm('Confirm Deletion', 'Are you sure you want to delete <br>the selected users?', function (btn) {
            if (btn === 'yes') {
                var ids = selection.map(function (record) {
                    return record.get('id');
                });

                Ext.Ajax.request({
                    url: '/OpalMp3/deleteUsers.json',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    jsonData: { ids: ids },
                    success: function () {
                        showToast('✅ Users deleted successfully!', '#4CAF50', 1500); // green for success
                        grid.getStore().reload();
                    },
                    failure: function () {
                        showToast('❌ Failed to delete users.', '#f44336', 2000); // red for failure    
                    }
                });
            }
        });
    }
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
