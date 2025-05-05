/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */



Ext.define('OpalMp3.main.RegisterViewport',{
    extend: 'Ext.container.Viewport',
    xtype: 'registerViewport',
    id:'registerViewport',
    layout: 'border',
    views:['OpalMp3.view.RegisterForm'],
    requires: ['OpalMp3.view.RegisterForm'],
    items: [ 
        {
            xtype: 'panel',
            region: 'center',
            itemId: 'centerContainer',
            layout: 'center',
            bodyStyle: 'background-color: transparent;', // Set to transparent to see the background image
            height: '100%', // Ensure it takes full height
            width: '100%', // Ensure it takes full width
        items:[{
            xtype:'registerform',
            itemId: 'registerform'
        }]
        }
    ]
});