/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.define('OpalMp3.view.user.AddUserForm', {
    extend: 'Ext.window.Window',
    xtype: 'adduserform',
    title: 'Add New User',
    modal: true,
    width: 400,
    layout: 'fit',

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            allowBlank: false
        },
        items: [
            {
                    xtype: 'component',
                    itemId: 'userErrorMsg',
                    hidden: true,
                    html: '<div style="background-color: #e22134; color: white; padding: 10px; text-align: center; border-radius: 4px;">&#9888; Please fill all required fields.</div>',
                    margin: '0 0 10 0'
                },
            { xtype: 'textfield',
                name: 'username',
                fieldLabel: 'Username' ,
            emptyText: 'Enter Username',
            allowBlank: false,
//            labelAlign: 'top',
            regex: /^[a-zA-Z0-9_]+$/,
            regexText: 'Username can only contain A-Z, a-z, 0-9, and underscore (_)',
            maskRe: /[a-zA-Z0-9_]/,
            msgTarget: 'under',
            },
            { xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email',
                vtype: 'email' ,
                emptyText: 'name@domain.com',
                msgTarget: 'under',
            },
            { xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            emptyText: 'At least 8 characters',
            minLength: 8,
            allowBlank: false,
            msgTarget: 'under',
//            labelAlign: 'top',
            validator: function (value) {
                if (!value) return 'Password is required';
//                if (value.length < 8) return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
                if (!/[a-z]/.test(value)) return 'Include at least one lowercase letter';
                if (!/[0-9]/.test(value)) return 'Include at least one number';
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) return 'Include at least one special character';
                return true;
            }
            },
            {
            xtype: 'textfield',
            name: 'confirmPassword',
            inputType: 'password',
            fieldLabel: 'Confirm Password',
            emptyText: 'Retype Password',
            allowBlank: false,
            msgTarget: 'under',
//            labelAlign: 'top',
            validator: function (value) {
                var password = this.up('form').down('[name=password]').getValue();
                return (value === password) ? true : 'Passwords do not match';
            }
        },
            {
                xtype: 'combo',
                name: 'role',
                fieldLabel: 'Role',
                store: ['admin', 'user'],
                forceSelection: true,
                editable: false
            }
        ],
        buttons: [
            {
                text: 'Save',
                formBind: true,
                handler: function (btn) {
                    var form = btn.up('form').getForm();
                    var grid = Ext.ComponentQuery.query('usergrid')[0];
                    var errorMsg = btn.up('form').down('#userErrorMsg');
                    if (form.isValid()) {
                        Ext.Ajax.request({
                            url: '/OpalMp3/addUser.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            jsonData: encodeHtmlFormData(form.getValues()),
//                            jsonData: form.getValues(),
                            success: function (response) {
//                                Ext.Msg.alert('Success', 'User added successfully!');
                                showToast('✅ User added successfully!', '#4CAF50', 400); // freen for success
                                    // ✅ Reload store first before closing
                                if (grid) {
                                    grid.getStore().reload();
                                }

                                    // Reset form
                                    btn.up('window').close();
                                    form.reset();
                                    
                                    // ✅ Reload the page after toast is visible
//                                    setTimeout(function () {
//                                     
//                                     if (grid) {
//                                    grid.getStore().reload();
//                                       }
////                                        window.location.reload();
//                                    }, 1600); // Slightly longer than the toast duration
                                    
//                                btn.up('window').close();
//                                var grid = Ext.ComponentQuery.query('usergrid')[0];
//                                if (grid) {
//                                    grid.getStore().reload();
//                                }
//                                Ext.getStore('userstore').load(); // reload user grid
                            },
                            failure: function (response) {
//                                Ext.Msg.alert('Error', 'Failed to add user.');
                            showToast('❌ Failed to add user.', '#f44336', 2000); // red for failure 
                            }
                        });
                    }
                }
            },
            {
                text: 'Cancel',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }
        ]
    }]
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

//encoding function
function encodeHtmlFormData(formData) {
    const encode = function (str) {
        if (typeof str !== 'string') return str;
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    };

    const encodedData = {};
    for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
            encodedData[key] = encode(formData[key]);
        }
    }
    return encodedData;
}