/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Register Form

var isUsernameValid = false;


// Function to validate form and enable/disable Register button
//function validateForm() {
//    var form = Ext.getCmp('registerform').getForm();
//    var usernameField = form.findField('username');
//    var emailField = form.findField('email');
//    var registerButton = Ext.getCmp('registerButton');
//
//    // Check if both fields are valid and no warnings
//    if (!usernameField.isValid() || !emailField.isValid()) {
//        registerButton.setDisabled(true);  // Disable button if form is invalid
//    } else {
//        registerButton.setDisabled(false);  // Enable button if form is valid
//    }
//}

Ext.define('OpalMp3.view.RegisterForm', {
    extend: 'Ext.form.Panel',
    xtype: 'registerform',
    id: 'registerform',
    minHeight: 360,
    width: 488,
    bodyStyle: 'background-color: rgba(0, 0, 0, 0.5);',
    cls: ['register-form'],
    items: [
        {
            xtype: 'component',
            html: '<h1 style="color:linen;text-align:center;margin-bottom:44px; font-family: SpotifyMixUITitle, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif);">Sign up to start listening</h1>'
        },
        {
            xtype: 'component',
            itemId: 'registerErrorMsg',
            hidden: true,
            html: '<div style="background-color: #e22134; color: white; padding: 10px; text-align: center; border-radius: 4px;">&#9888; Something went wrong</div>',
            margin: '0 15 10 15'
        },
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            margin: '15 15 15 15',
            minWidth: 450,
            height: 60,
            emptyText: 'Enter Username',
            allowBlank: false,
            labelAlign: 'top',
            regex: /^[a-zA-Z0-9_]+$/,
            regexText: 'Username can only contain A-Z, a-z, 0-9, and underscore (_)',
            maskRe: /[a-zA-Z0-9_]/,
            msgTarget: 'under', 
            // new changes
            listeners: {
                blur: function(field){
                    var username = field.getValue();
                    if(!username) return;
          // Check for username exists or not     
            Ext.Ajax.request({
                url: '/OpalMp3/check-username.json',
                method: 'GET',
                params: { username: username },
//                url: '/OpalMp3/check-username.json?username=' + encodeURIComponent(username),
                success: function (response) {
                    debugger;
                    var res = Ext.decode(response.responseText);
                    if (res.exists) {
                        field.markInvalid('Username already exists. Please choose another.');
                        isUsernameValid = false;
                        Ext.getCmp('registerButton').setDisabled(true);   // Dosable the button if user exists
                    } else {
                            field.clearInvalid();
                            isUsernameValid = true;
//                            validateForm();  // Enable the register button if username is valid
                    }
                    validateForm();  // validate form doesn't matter which case
                },
                failure: function () {
                    field.markInvalid('Could not verify username.');
                    isUsernameValid = false;
                    Ext.getCmp('registerButton').setDisabled(true); 
                }
            });
                },
                    change: function() {
                            isUsernameValid = false;  // Always reset, let `blur` validate again
                               validateForm();
//                        if(isUsernameValid == true){
//                            isUsernameValid = false;
//                        } else{
//                             isUsernameValid = true;
//                        }                 
//                    validateForm();
                }
            }
            
        },
        
        {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            margin: '15 15 15 15',
            minWidth: 450, 
            height: 60,
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
            margin: '15 15 15 15',
            minWidth: 450,
            height: 60,
            emptyText: 'Retype Password',
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
//            validator: function (value) {
//                var password = this.up('form').down('[name=password]').getValue();
//                return (value === password) ? true : 'Passwords do not match';
//            }
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            margin: '15 15 15 15',
            minWidth: 450,
            height: 60,
            vtype: 'email',
            emptyText: 'name@domain.com',
            labelAlign: 'top',
            msgTarget: 'under',
            // new changes to verify email exists or not
            listeners: {
            blur: function (field) {
            var email = field.getValue();
            if (!email) return;

            Ext.Ajax.request({
                url: '/OpalMp3/check-email.json',
                method: 'GET',
                params: { email: email },
                success: function (response) {
                    var res = Ext.decode(Ext.decode(response.responseText));
                    if (res.exists) {
                        field.markInvalid('Email is already registered. Please use another.');
                        Ext.getCmp('registerButton').setDisabled(true);  // Disable the register button
                    } else {
                        
                        field.clearInvalid();
                        validateForm();  // Enable the register button if email is valid
                    }
                },
                failure: function () {
                    field.markInvalid('Could not verify email.');
                }
            });
        }
    }
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: '10 5 10 5',
            defaults: {
                width: 200,
//                style: 'background-color:rgb(176 69 56);color:#9B2335;margin-top:10px;'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Register',
                    id: 'registerButton',
                    style: 'background-color: rgb(439, 134, 28);color:rgb(439, 134, 28);font-size: 25px; font-weight: bold; padding: 16px 16px;',
                    formBind: true,
                    disabled: true,
//                    listeners: {
//                        render: function (btn) {
//                            btn.getEl().on('mouseover', function () {
//                                btn.setStyle('background-color', '#ff8c00');
//                            });
//                            btn.getEl().on('mouseout', function () {
//                                btn.setStyle('background-color', 'rgb(439, 134, 28)');
//                            });
//                        }
//                    },
                    handler: function () {
                        var form = this.up('form').getForm();
                        
                            if (!form.isValid() || !isUsernameValid) {
                                    var toast = Ext.DomHelper.append(document.body, {
                                        tag: 'div',
                                        html: 'User exists! please choose other user name',
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
                                            }, 5000);
//                                Ext.Msg.alert('Error', 'Please fix form errors before submitting.');
                                return;
                            }
                            
                        if (form.isValid()) {
                            var values = form.getValues();
                            var errorMsgCmp = Ext.getCmp('registerform').down('#registerErrorMsg');

                            if (values.password !== values.confirmPassword) {
                                Ext.Msg.alert('Error', 'Passwords do not match');
                                return;
                            }

                            Ext.Ajax.request({
                                url: '/OpalMp3/register.json',
                                method: 'POST',
                                jsonData: values,
                                success: function (response) {
                                    debugger;
//                                    isUsernameValid= true;
                                    var result = Ext.decode(Ext.decode(response.responseText));
                                    if(result.success){
                                        form.reset();
                                        // Toast msg
                                        Ext.toast({
                                            html: '🎉 Registration successful!',
                                            align: 't',
                                            minWidth: 300,
                                            style: {
                                                textAlign: 'center',
                                                backgroundColor: '#4CAF50',
                                                color: '#fff',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                padding: '20px',
                                                borderRadius: '8px'
                                            }
                                        });

                                        setTimeout(function () {
                                            window.location.href = 'index.htm';
                                        }, 1500); // wait 1.5 s before redirecting

//                                        Ext.Msg.alert('Success', 'Registration successful!', function () {
//                                            window.location.href = 'index.htm';
//                                        });
                                    } else {
                                        if(errorMsgCmp){
                                            errorMsgCmp.show();
                                        }
                                    }
                                },
                                failure: function () {
                                    if(errorMsgCmp){
                                        errorMsgCmp.show();
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'component',
                    html: `
                        <div style="margin-top:11px; text-align: center; color: #f5d791;">
                            Already have an account?
                            <a href="index.htm" style="color: #f5d791; text-decoration: underline; transition: color 0.3s;" 
                               onmouseover="this.style.color='#ff8c00'" 
                               onmouseout="this.style.color='#f5d791'">Log in here</a>
                        </div>
                    `
                }
            ]
        }
    ]
});



// Function to validate form and enable/disable Register button
function validateForm() {
    var form = Ext.getCmp('registerform').getForm();
    var usernameField = form.findField('username');
    var emailField = form.findField('email');
    var registerButton = Ext.getCmp('registerButton');

    // Check if both fields are valid and no warnings
    if (!usernameField.isValid() || !emailField.isValid()) {
        registerButton.setDisabled(true);  // Disable button if form is invalid
    } else {
        registerButton.setDisabled(false);  // Enable button if form is valid
    }
}