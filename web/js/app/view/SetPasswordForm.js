
Ext.define('OpalMp3.view.SetPasswordForm', {
    extend: 'Ext.form.Panel',
    xtype: 'setpasswordform',
    id: 'setpasswordform',
    minHeight: 260,
    width: 485,
    bodyStyle: 'background-color: rgba(0, 0, 0, 0.5);',
    cls: ['set-password-form'],

//    fullscreen: true,
//    bodyStyle: 'background-color: #F7CAC9; display:flex; align-items:center; justify-content:center;',
//    layout: {
//        type: 'vbox',
//        align: 'center',
//        pack: 'center'
//    },
//    defaults: {
//        width: 300,
//        labelAlign: 'top',
//        labelStyle: 'color: #1DB954; font-weight: bold;',
//        fieldStyle: 'background-color: white; color: black; border: none;',
//        margin: '20 20 10 0'
//    },

    items: [
        {
            xtype: 'component',
            html: '<h1 style="color:linen;text-align:center;margin-bottom:44px;">Set new password</h1>'
        },
        {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            minWidth: 450,
            height: 60,
            margin: '15 15 15 15',
            emptyText: 'At least 8 characters',
            minLength: 8,
            allowBlank: false,
            labelAlign: 'top',
            msgTarget: 'under',
            validator: function (value) {
//                if (!value) return 'Password is required';
//                if (value.length < 8) return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
                if (!/[a-z]/.test(value)) return 'Include at least one lowercase letter';
                if (!/[0-9]/.test(value)) return 'Include at least one number';
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) return 'Include at least one special character';
                return true;
            },

            listeners: {
                change: function(field) {
                    field.validate(); // Trigger validator on every change
                }
            }
        },
        {
            xtype: 'textfield',
            name: 'confirmPassword',
            inputType: 'password',
            fieldLabel: 'Confirm Password',
            minWidth: 450,
            height: 60,
            margin: '15 15 15 15',
            emptyText: 'Re-enter your password',
            allowBlank: false,
            labelAlign: 'top',
            msgTarget: 'under',
            validator: function (value){
                var password = this.up('form').down('[name=password]').getValue();
                return (value === password) ? true : 'Passwords do not match';
            },
            listeners: {
                change: function(field) {
                    field.validate(); // Trigger validator on every change
                }
            }
        },
        {
            xtype: 'hidden',  // Hidden field to store the token
            name: 'token',
            value: new URLSearchParams(window.location.search).get('token')
        },
        
        
    ],

    buttons: [
        {
            text: 'Submit',
            style: 'background-color: rgb(439, 134, 28);color:rgb(439, 134, 28); font-size: 25px; font-weight: bold; padding: 16px 16px;',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();

                if (!form.isValid()) {
                    Ext.Msg.alert('Error', 'Please fill in all fields correctly.');
                    return;
                }

                if (values.password !== values.confirmPassword) {
                    Ext.Msg.alert('Error', 'Passwords do not match.');
                    return;
                }

                var token = values.token;  // Get token from the hidden field
                if (!token) {
                    Ext.Msg.alert('Error', 'Invalid or expired reset link.');
                    return;
                }

                Ext.Ajax.request({
                    url: '/OpalMp3/setpassword.json',
                    method: 'PUT',
                    jsonData: {
                        token: token,
                        password: values.password
                    },
                    success: function (response) {
                        var result = Ext.decode(Ext.decode(response.responseText));
                        if (result.success) {
                            form.reset(); // resetting form
                            var toast = Ext.DomHelper.append(document.body, {
                                                tag: 'div',
                                                html: '✅ Password reset successfully!',
                                                style: `
                                                        position: fixed;
                                                        top: 30px;
                                                        left: 50%;
                                                        transform: translateX(-50%);
                                                        background-color: #4CAF50;
                                                        color: white;
                                                        padding: 16px 24px;
                                                        font-size: 18px;
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
                                                    window.location.href = 'index.htm';
                                                }, 500);
                                            }, 2000);
                            
//                            Ext.Msg.alert('Success', 'Password reset successfully.', function() {
//                                window.location.href = 'index.htm';
//                            });
                        } else {
                            var toast = Ext.DomHelper.append(document.body, {
                                    tag: 'div',
                                    html: '❌ Invalid or expired token!',
                                    style: `
                                        position: fixed;
                                        top: 30px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        background-color: #f44336;
                                        color: white;
                                        padding: 16px 24px;
                                        font-size: 18px;
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
                                }, 2000);

                            
//                            Ext.Msg.alert('Failure', 'Invalid Token.');
//                            form.reset();
//                            Ext.Msg.alert('Success', 'Password reset successfully.', function() {
//                                window.location.href = 'index.htm';
//                            });
                        }
//                            Ext.Msg.show({
//                                title: 'Success',
//                                message: 'Password reset successfully!',
//                                buttons: Ext.Msg.OK,
//                                fn: function () {
//                                    Ext.Msg.show({
//                                        title: 'What next?',
//                                        message: 'Choose an action:',
//                                        buttons: [
//                                            {
//                                                text: 'Login',
//                                                handler: function () {
//                                                    window.location.href = 'index.htm';
//                                                }
//                                            },
//                                            {
//                                                text: 'Reset Password',
//                                                handler: function () {
//                                                    window.location.href = 'resetpassword.htm';
//                                                }
//                                            }
//                                        ]
//                                    });
//                                }
//                            });
//                        } else {
//                            form.reset(); // reset form
//                            Ext.Msg.alert('Success','Password reset successfully!');
//                        }
                    },
                    failure: function () {                    
                                    var toast = Ext.DomHelper.append(document.body, {
                                    tag: 'div',
                                    html: 'Something went wrong!',
                                    style: `
                                        position: fixed;
                                        top: 30px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        background-color: #f44336;
                                        color: white;
                                        padding: 16px 24px;
                                        font-size: 18px;
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
                                }, 2000);
//                        Ext.Msg.alert('Error', 'Something went wrong.');
                    }
                });
            }
        }
    ]
});

