/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Helper function for greetig message

function getGreetingMessage() {
    var hours = new Date().getHours();
    var username = localStorage.getItem("username") || "User"; // You should save username during login
    var greeting = "";

    if (hours >= 6 && hours < 12) {
        greeting = "Good Morning, " + username;
    } else if (hours >= 12 && hours < 16) {
        greeting = "Good Afternoon, " + username;
    } else {
        greeting = "Good Evening, " + username;
    }

    return greeting;
}




Ext.application({
    name: 'OpalMp3',
    appFolder: 'js/app',

    requires: [
        'OpalMp3.main.DashboardViewport',
        'OpalMp3.view.music.MusicGrid',
        'OpalMp3.view.user.UserGrid',
        'OpalMp3.store.MusicStore',
        'OpalMp3.store.UserStore'
    ],

    launch: function () {
        Ext.create('OpalMp3.main.DashboardViewport');
    }
});

