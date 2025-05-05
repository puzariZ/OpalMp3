/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.define('OpalMp3.view.music.AddMusicForm', {
    extend: 'Ext.window.Window',
    xtype: 'addmusicform',
    title: 'Add New Music',
    layout: 'fit',
    modal: true,
    width: 400,
    height: 300,

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
                    itemId: 'musicErrorMsg',
                    hidden: true,
                    html: '<div style="background-color: #e22134; color: white; padding: 10px; text-align: center; border-radius: 4px;">&#9888; Please fill all required fields.</div>',
                    margin: '0 0 10 0'
                },
            {
                xtype: 'textfield',
                name: 'title',
                fieldLabel: 'Title',
                allowBlank: false,
                emptyText: 'Enter title',
            },
            {
                xtype: 'textfield',
                name: 'artist',
                fieldLabel: 'Artist',
                allowBlank: false,
                emptyText: 'Enter artist name',
            },
            {
                xtype: 'textfield',
                name: 'album',
                fieldLabel: 'Album',
                allowBlank: false,
                emptyText: 'Enter album name',
            },
            {
                xtype: 'textfield',
                name: 'genre',
                fieldLabel: 'Genre',
                allowBlank: false,
                emptyText: 'Enter genre',
            },
            {
                xtype: 'textfield',
                name: 'duration',
                fieldLabel: 'Duration (mm:ss)',
                allowBlank: false,
                regex: /^([0-5]?[0-9]):([0-5][0-9])$/,
                regexText: 'Enter duration in mm:ss format (e.g., 03:45)',
                emptyText: 'Enter duration in mm:ss format (e.g., 03:45)',
                msgTarget: 'under',
            },
            {
                xtype: 'datefield',
                name: 'releaseDate',
                fieldLabel: 'Release Date',
                format: 'y-m-d',
                allowBlank: false,
                emptyText: 'Enter or select date',
            }
        ],
        buttons: [
            {
                text: 'Cancel',
                handler: function () {
                    this.up('window').close();
                }
            },
            {
                text: 'Save',
                formBind: 'true',
                handler: function (btn) {
//                    const win = btn.up('window');
//                    const form = win.down('form');
                    var form = btn.up('form').getForm();
                    var errorMsg = btn.up('form').down('#musicErrorMsg');
                    if (form.isValid()) {
                        // Get form data
                        var formData = form.getValues();
                        
                        // Encode input fields to prevent HTML/script injection
                        function encodeHTML(str) {
                            return String(str)
                                .replace(/&/g, "&amp;")
                                .replace(/"/g, "&quot;")
                                .replace(/'/g, "&#39;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;");
                        }

                        formData.title = encodeHTML(formData.title);
                        formData.artist = encodeHTML(formData.artist);
                        formData.album = encodeHTML(formData.album);
                        formData.genre = encodeHTML(formData.genre);


                        // Send the data to the server to save the track
                        Ext.Ajax.request({
                            url: '/OpalMp3/addTrack.json',
                            method: 'POST',
//                            headers: { 'Content-Type': 'application/json' },
                            jsonData: formData,
                            success: function (response) {
                                var result = Ext.decode(response.responseText);
                                if(result.success){
                                    // ✅ GREEN TOAST FOR SUCCESS
//                                    Ext.toast({
//                                        html: '<span style="color: white;">' + result.message + '</span>',
//                                        title: 'Success',
//                                        width: 300,
//                                        align: 't',
//                                        bodyStyle: 'background-color: green; padding: 10px;',
//                                        timeout: 3000
//                                    });

                                 // Toast...
                                 form.reset(); // reset form first
                                    showToast('✅ Music added successfully!', '#4CAF50', 1500); // freen for success

                                // Reset form
//                                    form.reset();
                                    
                                    
                                    // ✅ Reload the page after toast is visible
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 900); // Slightly longer than the toast duration

//                                    window.location.reload();
//                                Ext.Msg.show({
//                                title: 'Success',
//                                message: result.message,
//                                buttons: Ext.Msg.OK,
//                                icon: Ext.Msg.INFO,
//                                fn: function (btn) {
//                                    if (btn === 'ok') {
//                                        form.reset();               // ✅ Reset form
//                                        window.location.reload();   // ✅ Reload page
//                                    }
//                                }
//                            });
//                                Ext.Msg.alert('Success', function() {
//                                // ✅ Reset form
//                                form.reset();
//                                // ✅ Reload page or grid
//                                window.location.reload(); // or reload grid/store if exists
////                                    win.close();
////                                    Ext.getCmp('musicGridId').getStore().reload();
//////                                    Ext.getStore('musicstore').load(); // reload store to show updated list
//                                });
////                                form.reset();
////                                win.close();
//                                // Close the window
////                                this.up('window').close();
                                } else {
                                        if(errorMsg){
                                            errorMsg.show();
                                            Ext.defer(function (){
                                                errorMsg.hide();
                                            }, 1000); // auto-hide error msg in 1 sec
                                        }
                                }
                            },
                            failure: function (response) {
                                var result = Ext.decode(response.responseText);
//                                var errorMsgCmp = Ext.getCmp('loginform').down('#loginErrorMsg');
                                  // ✅ RED TOAST FOR FAILURE
                                  
                                  showToast('❌ Failed to add music.', '#f44336', 2000); // red for failure 
//                                    Ext.toast({
//                                        html: '<span style="color: white;">Error adding music.</span>',
//                                        title: 'Failure',
//                                        width: 300,
//                                        align: 't',
//                                        bodyStyle: 'background-color: red; padding: 10px;',
//                                        timeout: 3000
//                                    });
//                                Ext.Msg.alert('Failure', 'Error adding music.');
                            }
                        });
                    } else {
                            if(errorMsg){
                             errorMsg.show();
                            }
//                        Ext.Msg.alert('Validation', 'Please fill all required fields.'); // new change
                    }
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