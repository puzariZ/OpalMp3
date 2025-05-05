Ext.define('OpalMp3.view.PasswordResetForm', {
    extend: 'Ext.form.Panel',
    xtype: 'resetpasswordform',
    id:'resetpasswordform',
    minHeight: 243,
    width: 490,
    shadow: true,
    bodyStyle: 'background-color: rgba(0, 0, 0, 0.5);',
    cls: ['login-form'],
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
            html: '<h1 style="color:linen;text-align:center;margin-bottom:44px;">Reset your password</h1>'
        },
        {
            xtype: 'component',
            itemId: 'loginErrorMsg',
            hidden: true,
            html: '<div style="background-color: #e22134; color: white; padding: 10px; text-align: center; border-radius: 4px;">&#9888; User not found!</div>',
            margin: '0 15 10 15'
        },
        {
            xtype: 'textfield',
//            name: 'email',
            name: 'identifier',
            fieldLabel: 'Email or username',
            margin: '15 15 15 15',
            minWidth: 450,
            height: 60,
            emptyText: 'Enter your registered email or username',
//            vtype: 'email',
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
                    text: 'Verify User',
                    style: 'background-color:rgb(176 69 56);color:#9B2335;margin-top:20px; font-size: 25px; font-weight: bold; padding: 16px 16px;',
                    handler: function () {
                        var formPanel = this.up('form');
                        var form = formPanel.getForm();
//                        var email = form.findField('email').getValue();
                        var identifier = form.findField('identifier').getValue();
                        var errorMsgCmp = Ext.getCmp('resetpasswordform').down('#loginErrorMsg');

                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url: '/OpalMp3/verifyuser.json',
                                method: 'POST',
                                jsonData: {identifier: identifier},
//                                jsonData: { email: email },
                                success: function (response) {
                                    var result = Ext.decode(Ext.decode(response.responseText));
                                    if (result.success) {
                                                var toast = Ext.DomHelper.append(document.body, {
                                                tag: 'div',
                                                html: '✅ User verified successfully!',
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

//                                        Ext.Msg.alert('Success', 'User verified successfully.', function(){
//                                            window.location.href = 'index.htm';
//                                        });
                                    } else {
                                        if(errorMsgCmp){
                                           errorMsgCmp.show();
                                        }
//                                        form.reset();
                                    }
                                },
                                failure: function () {
                                    form.reset();
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
//                                    if(errorMsgCmp){
//                                      errorMsgCmp.show();
//                                    }
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'component',
                    html: `
                        <div style="margin-top:10px; text-align: center;">
                            <a href="index.htm" 
                               style="color: #f5d791; text-decoration: underline; transition: color 0.3s;" 
                               onmouseover="this.style.color='#ff8c00'" 
                               onmouseout="this.style.color='#f5d791'">
                               Back to Login
                            </a>
                        </div>
                    `
                }
            ]
        }
        
    ]
});
