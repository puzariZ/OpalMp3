

Ext.define('OpalMp3.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    id: 'loginform',
    minHeight: 355,
    width: 500,
    shadow: true,
    bodyStyle: 'background-color: rgba(0, 0, 0, 0.6);',
    cls: ['login-form'],

    items: [
        {
            xtype: 'component',
            html: '<h1 style="color:linen;text-align:center;margin-bottom:44px; font-family: SpotifyMixUITitle, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, var(--fallback-fonts, sans-serif);"> Log in to OpalMP3</h1>'
        },
         {
            xtype: 'component',
            itemId: 'loginErrorMsg',
            hidden: true,
            html: '<div style="background-color: #e22134; color: white; padding: 10px; text-align: center; border-radius: 4px;">&#9888; Incorrect username or password</div>',
            margin: '0 15 10 15'
        },
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            margin: '15 15 15 15',
            minWidth: 470,
            height: 60,
            emptyText: 'Enter Username',
            allowBlank: false,
            labelAlign: 'top'
        },
        {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            height: 60,
            margin: '15 15 15 15',
            minWidth: 470,
            emptyText: 'Enter Password',
            allowBlank: false,
            labelAlign: 'top'
        },
        {
            xtype: 'container',
            layout: 'vbox',
            defaults: {
                width: '100%',
                margin: '10 0 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Login',
                   style: 'background-color: rgb(439, 134, 28);color:rgb(439, 134, 28);font-size: 25px; font-weight: bold; padding: 16px 16px; color: rgb(255 246 233/var(--tw-text-opacity,1));',
//                                       listeners: {
//                        render: function (btn) {
//                            btn.getEl().on('mouseover', function () {
//                                btn.getEl().setStyle('background-color', '#ffa733');
//                            });
//                            btn.getEl().on('mouseout', function () {
//                                btn.getEl().setStyle('background-color', '#ff8c00');
//                            });
//                        }
//                    },
//                    style: 'background-color: rgb(176 69 56);color:#9B2335;',
                    handler: function () {
                        var form = this.up('form').getForm();
                        var errorMsgCmp = Ext.getCmp('loginform').down('#loginErrorMsg');
                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url: '/OpalMp3/login.json',
                                method: 'POST',
                                jsonData: form.getValues(),
                                success: function (response) {
                                    var result = Ext.decode(Ext.decode(response.responseText));
                                    if (result.success) {
                                        localStorage.setItem("role", result.role);
                                        localStorage.setItem("username", result.username);
                                        window.location.href = 'dashboard.htm';
                                        Ext.getCmp('loginform').close();
                                    } else {
                                        if(errorMsgCmp){
                                            errorMsgCmp.show();
                                        }
                                        
                                        // If want auto-hide uncomment this code
//                                        if(errorMsgCmp){
//                                            errorMsgCmp.show();
//                                            Ext.defer(function (){
//                                                errorMsgCmp.hide();
//                                            }, 3000); // auto-hide error msg in 3 sec
//                                        }
//                                        Ext.Msg.alert('Failure', result.message || 'Invalid Username or Password');
//                                        var formPanel = Ext.getCmp('loginform');
//                                        var resetBtn = formPanel.down('#resetBtn');
//                                        if (resetBtn) resetBtn.show();
                                    }
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
                                            }, 5000);
                                    
//                                    if(errorMsgCmp){
//                                        errorMsgCmp.show();
//                                    }
//                                    Ext.Msg.alert('Error', 'Something went wrong...');
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'component',
                    html: `
                        <div style="margin-top:10px; text-align: center;">
                            <a href="verifyuser.htm" 
                               style="color: #f5d791; text-decoration: underline; transition: color 0.3s;" 
                               onmouseover="this.style.color='#ff8c00'" 
                               onmouseout="this.style.color='#f5d791'">
                               Forget password?
                            </a>
                        </div>
                    `
                },
                {
                    xtype: 'component',
                    html: `
                        <div style="margin-top:10px; text-align: center; color: #f5d791;">
                            Don’t have an account? 
                            <a href="register.htm" 
                               style="color: #f5d791; text-decoration: underline; transition: color 0.3s;" 
                               onmouseover="this.style.color='#ff8c00'" 
                               onmouseout="this.style.color='#f5d791'">
                               Sign up for OpalMp3
                            </a>
                        </div>
                    `
                }


//                {
//                    xtype: 'button',
//                    text: 'Register',
//                    style: 'background-color:rgb(176 69 56);color:#9B2335;',
//                    handler: function () {
//                        window.location.href = 'register.htm';
//                    }
//                },
//                {
//                    xtype: 'button',
//                    text: 'Reset Password',
//                    itemId: 'resetBtn',
////                    hidden: true,
//                    style: 'background-color:rgb(176 69 56);color:#9B2335;',
//                    handler: function () {
//                        window.location.href = 'verifyuser.htm';
//                    }
//                }
            ]
        }
    ]
});

