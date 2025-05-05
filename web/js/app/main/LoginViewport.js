/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('OpalMp3.main.LoginViewport',{
    extend: 'Ext.container.Viewport',
    xtype: 'loginViewport',
    id:'loginViewport',
    layout: 'border',
    views:['OpalMp3.view.LoginForm'],
    requires: ['OpalMp3.view.LoginForm'],
    items: [ 
        {
            xtype: 'panel',
            region: 'center',
            itemId: 'centerContainer',
            layout: 'center',
            bodyStyle: 'background-color: transparent;', // Set to transparent to see the background image
            height: '100%', // Ensure it takes full height
            width: '100%', // Ensure it takes full width
//            bodyStyle: 'background-image: url(web/WEB-INF/utilities/bgimage.jpg) !important; align-items: center; justify-content: center;',
//; background-size: cover; \n\
//background-position: center; align-items: center; justify-content: center;',

//            bodyStyle: 'background-image: url(utilities/bgimage.jpg) !important;',
            items:[{
//                bodyStyle: 'border: 2px solid black',
                xtype:'loginform',
                itemId: 'loginform'

            }
//                {
//        region: 'south',
//        xtype: 'toolbar',
//        height: 30,
//        style: 'text-align: center;',
//        items: ['->', {
//            xtype: 'tbtext',
//            text: '© 2025 OpalMP3 | All rights reserved.',
//            style: 'font-size: 12px; color: gray; background-color: white;'
//        }, '->']
//    }
        ]
        }
    ]
});
