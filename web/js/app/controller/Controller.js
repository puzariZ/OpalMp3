////Ext.application({
////    name: 'OpalMP3',
////    launch: function () {
////        Ext.create("Ext.form.Panel", {
////            renderTo: 'mainDiv',
////            title: 'Login to OpalMP3',
////            width: 800,
////            height: 400,
////            bodyPadding: 10,
////            frame: true,
////            defaultType: 'textfield',
////            items: [
////                {
////                    fieldLabel: 'Username',
////                    name: 'username',
////                    allowBlank: false,
////                    width: 500,
////                    height: 40
////                },
////                {
////                    fieldLabel: 'Password',
////                    name: 'password',
////                    inputType: 'password',
////                    allowBlank: false,
////                    width: 500,
////                    height: 40
////                },
////                {
////                    xtype: 'displayfield',
////                    value: '<a href="#" id="register-link">Not a user? Let’s register</a>',
////                    fieldStyle: {
////                        'margin-bottom': '10px'
////                    },
////                    listeners: {
////                        afterrender: function () {
////                            Ext.get('register-link').on('click', function () {
////                                Ext.create('Ext.window.Window', {
////                                    title: 'Register New User',
////                                    modal: true,
////                                    layout: 'fit',
////                                    width: 400,
////                                    items: [
////                                        {
////                                            xtype: 'form',
////                                            padding: 10,
////                                            defaultType: 'textfield',
////                                            url: '/register.htm',
////                                            method: 'POST',
////                                            items: [
////                                                {
////                                                    fieldLabel: 'Username',
////                                                    name: 'username',
////                                                    allowBlank: false
////                                                },
////                                                {
////                                                    fieldLabel: 'Password',
////                                                    name: 'password',
////                                                    inputType: 'password',
////                                                    allowBlank: false,
////                                                    minLength: 8,
////                                                    minLengthText: 'Password must be at least 8 characters long'
////                                                },
////                                                {
////                                                    fieldLabel: 'Verify Password',
////                                                    name: 'verifyPassword',
////                                                    inputType: 'password',
////                                                    allowBlank: false,
////                                                    validator: function (value) {
////                                                        const password = this.up('form').getForm().findField('password').getValue();
////                                                        return value === password ? true : 'Passwords do not match';
////                                                    }
////                                                },
////                                                {
////                                                    fieldLabel: 'Email',
////                                                    name: 'email',
////                                                    vtype: 'email',
////                                                    allowBlank: false
////                                                },
////                                                {
////                                                    fieldLabel: 'Phone No',
////                                                    name: 'phoneNo',
////                                                    allowBlank: false,
////                                                    regex: /^[0-9]{10}$/,
////                                                    regexText: 'Please enter a valid 10-digit phone number'
////                                                },
////                                                {
////                                                    fieldLabel: 'Date of Birth',
////                                                    name: 'dob',
////                                                    xtype: 'datefield',
////                                                    format: 'Y-m-d',
////                                                    allowBlank: false
////                                                },
////                                                {
////                                                    fieldLabel: 'Profile Picture URL',
////                                                    name: 'profilePic',
////                                                    allowBlank: true
////                                                },
////                                                {
////                                                    fieldLabel: 'Role',
////                                                    name: 'role',
////                                                    allowBlank: false
////                                                }
////                                            ],
////                                            buttons: [
////                                                {
////                                                    text: 'Register',
////                                                    formBind: true,
////                                                    handler: function (btn) {
////                                                        let form = btn.up('form').getForm();
////                                                        if (form.isValid()) {
////                                                            form.submit({
////                                                                success: function () {
////                                                                    Ext.Msg.alert('Success', 'User registered successfully!');
////                                                                    btn.up('window').close();
////                                                                },
////                                                                failure: function (form, action) {
////                                                                    console.log('Request failed response:', action);
////                                                                    var message = 'Registration failed';
////                                                                    if (action.result && action.result.message) {
////                                                                        message = action.result.message;
////                                                                    }
////                                                                    Ext.Msg.alert('Error', message);
////                                                                }
////                                                            });
////                                                        }
////                                                    }
////                                                }
////                                            ]
////                                        }
////                                    ]
////                                }).show();
////                            });
////                        }
////                    }
////                }
////            ],
////            buttons: [
////                {
////                    text: 'Login',
////                    handler: function () {
////                        const form = this.up('form').getForm();
////                        if (form.isValid()) {
////                            form.submit({
////                                url: '/login',
////                                method: 'POST',
////                                success: function (form, action) {
////                                    console.log("Login Success", action.result);
////                                    window.location.href = action.result.redirect;
////                                },
////                                failure: function (form, action) {
////                                    console.log('Login failed response:', action);
////                                    var message = 'Invalid credentials';
////                                    if (action.result && action.result.message) {
////                                        message = action.result.message;
////                                    }
////                                    Ext.Msg.alert('Login Failed', message);
////                                }
////                            });
////                        }
////                    }
////                },
////                {
////                    text: 'Cancel',
////                    handler: function () {
////                        this.up('form').getForm().reset();
////                    }
////                }
////            ]
////        });
////    }
////});
//
//
//var loginWindow, registerWindow;
//
//function showLoginWindow() {
//    loginWindow = Ext.create('Ext.window.Window', {
//        title: '<span style="color:gray;">Login to OpalMP3</span>',
//        width: 400,
//        height: 250,
//        modal: true,
//        closable: false,
//        layout: 'fit',
//        items: [{
//            xtype: 'form',
//            bodyPadding: 10,
//            defaults: {
//                anchor: '100%',
//                labelAlign: 'top',
//                style: 'color: blue; font-weight: bold;',
//                fieldStyle: 'color: blue;'
//            },
//            items: [
//                {
//                    xtype: 'textfield',
//                    name: 'username',
//                    fieldLabel: 'Username',
//                    allowBlank: false
//                },
//                {
//                    xtype: 'textfield',
//                    name: 'password',
//                    fieldLabel: 'Password',
//                    inputType: 'password',
//                    allowBlank: false
//                }
//            ],
//            buttons: [{
//                text: 'Login',
//                handler: function () {
//                    var form = this.up('form').getForm();
//                    if (form.isValid()) {
//                        Ext.Ajax.request({
//                            url: 'http://localhost:8080/OpalMp3/login.json',
//                            method: 'POST',
////                            headers: {
////                            'Content-Type': 'application/json',
////                            'Accept': 'application/json'
////                            },
//                            jsonData: form.getValues(),
//                            success: function(response){
//                                var result = Ext.decode(response.responseText);
//                                console.log(result);
//                            },
//                            failure: function(response){
//                                console.log("Login failed", response);
//                            }
//                        });
////                            jsonData: form.getValues(),
////                            success: function (response) {
////                                var result = Ext.decode(response.responseText);
////                                if (result.success) {
////                                    Ext.Msg.alert('Success', 'Login successful!');
////                                    loginWindow.close();
////                                } else {
////                                    Ext.Msg.alert('Error', 'Invalid credentials');
////                                }
////                            },
////                            failure: function () {
////                                Ext.Msg.alert('Error', 'Server error');
////                            }
////                        });
//                    }
//                }
//            }, {
//                text: 'Not a user? Register here',
//                handler: function () {
//                    loginWindow.close();
//                    showRegisterWindow();
//                }
//            }]
//        }]
//    });
//
//    loginWindow.show();
//}
//
//function showRegisterWindow() {
//    registerWindow = Ext.create('Ext.window.Window', {
//        title: '<span style="color:gray;">Register to OpalMP3</span>',
//        width: 500,
//        height: 480,
//        modal: true,
//        closable: false,
//        layout: 'fit',
//        items: [{
//            xtype: 'form',
//            bodyPadding: 10,
//            defaults: {
//                anchor: '100%',
//                labelAlign: 'top',
//                style: 'color: blue; font-weight: bold;',
//                fieldStyle: 'color: blue;'
//            },
//            items: [
//                { xtype: 'textfield', name: 'username', fieldLabel: 'Username', allowBlank: false },
//                { xtype: 'textfield', name: 'password', fieldLabel: 'Password', inputType: 'password', allowBlank: false },
//                { xtype: 'textfield', name: 'verifyPassword', fieldLabel: 'Verify Password', inputType: 'password', allowBlank: false },
//                { xtype: 'textfield', name: 'email', fieldLabel: 'Email', allowBlank: false },
//                { xtype: 'textfield', name: 'phoneNo', fieldLabel: 'Phone Number', allowBlank: false },
//                { xtype: 'datefield', name: 'dob', fieldLabel: 'Date of Birth', allowBlank: false },
//                { xtype: 'textfield', name: 'role', fieldLabel: 'Role', allowBlank: false },
//                {xtype: 'textfield', name: 'profilePic', fieldLabel: 'Profile Pic', allowBlank: true}
//            ],
//            buttons: [{
//                text: 'Register',
//                handler: function () {
//                    var form = this.up('form').getForm();
//                    if (form.isValid()) {
//                        Ext.Ajax.request({
//                            url: 'http://localhost:8080/OpalMp3/register.htm',
//                            method: 'POST',
//                            jsonData: form.getValues(),
//                            success: function (response) {
//                                var result = Ext.decode(response.responseText);
//                                if (result.success) {
//                                    Ext.Msg.alert('Success', 'Registration successful!');
//                                    registerWindow.close();
//                                    showLoginWindow();
//                                } else {
//                                    Ext.Msg.alert('Error', 'Registration failed!');
//                                }
//                            },
//                            failure: function () {
//                                Ext.Msg.alert('Error', 'Server error');
//                            }
//                        });
//                    }
//                }
//            }, {
//                text: 'Back to Login',
//                handler: function () {
//                    registerWindow.close();
//                    showLoginWindow();
//                }
//            }]
//        }]
//    });
//
//    registerWindow.show();
//}
//
//// Show login window when script loads (no Ext.onReady)
//setTimeout(showLoginWindow, 100);
