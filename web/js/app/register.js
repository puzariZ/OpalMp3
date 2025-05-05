/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.application({
    name: 'OpalMp3',
    appFolder: 'js/app',
    requires: 'OpalMp3.main.RegisterViewport',
    launch: function () {
        Ext.create('OpalMp3.main.RegisterViewport', {});
    }
});