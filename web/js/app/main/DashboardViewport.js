
// Redirect unauthorized users
var role = localStorage.getItem('role');
if (!role){
    window.location.href = 'index.htm'; // Redirect to login
}
//if (!role || (role !== 'admin' && role !== 'user')) {   // onlu 'admin' and 'user' can access
//    window.location.href = 'index.htm'; // Redirect to login
//}

Ext.define('OpalMp3.main.DashboardViewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'dashboardViewport',
    layout: 'border',
    bodyStyle: 'background-image: url(/OpalMp3/js/bgimage4.png);',
    
    requires: [
        'OpalMp3.view.music.MusicGrid',
        'OpalMp3.view.user.UserGrid'
    ],

    initComponent: function () {
        var userRole = localStorage.getItem('role'); // "admin" or "user"
             var isAdmin = userRole === 'admin'; // check for admin

//        this.items = [
//            {
//            region: 'north',
//            xtype: 'toolbar',
//            height: 50,
//            items: [
//                {   
//                    xtype: 'tbtext',
//                    text: '🎵 OpalMP3 Dashboard',
//                    style: 'font-size: 20px; font-weight: bold;' 
//                },
//                '->',
//                {
//                    xtype: 'tbtext',
//                    text: getGreetingMessage(), // This function is defined in dashboard.js
//                    style: 'font-weight: bold; font-size: 16px; color: #1DB954;'
//                },
//                '->',
//                {
//                    xtype: 'button',
//                    text: 'Music',
//                    handler: function () {
//                        Ext.getCmp('mainCard').getLayout().setActiveItem('musicPanel');
//                    }
//                }
//            ].concat(isAdmin ? [
//                {
//                    xtype: 'button',
//                    text: 'Users',
////                    hidden: userRole !== 'admin', // 👈 Hide if not admin
//                    handler: function () {
//                        Ext.getCmp('mainCard').getLayout().setActiveItem('userPanel');
////                        Ext.getCmp('mainCard').getLayout().setActiveItem('userPanel');
//                    }
//                }
//            ] : [])
//        }, 
//        {
//            region: 'center',
//            xtype: 'panel',
//            layout: 'card',
//            id: 'mainCard',
//            items: [
//                { xtype: 'musicgrid', itemId: 'musicPanel' },
//            ].concat(isAdmin ? [
//                { xtype: 'usergrid', itemId: 'userPanel' }
//            ] : [] )
//        }
//    ];
this.items = [
    {
        region: 'north',
        xtype: 'toolbar',
        height: 50,
        items: [
            {
                xtype: 'image',
                src: '/OpalMp3/js/music-app.png',
//                src: '/OpalMp3/web/js/app/main/logo.jpg', //  path to logo
                height: 30, //  height 
                width: 100, //  width 
                alt: 'OpalMP3 Logo' // alt text for accessibility
            },
//            {
//                xtype: 'tbtext',
//                text: '🎵 OpalMP3 Dashboard',
//                style: 'font-size: 20px; font-weight: bold;'
//            },
            '->',
            {
                xtype: 'tbtext',
                text: getGreetingMessage(), // Dynamic greeting
                style: 'font-weight: bold; font-size: 16px; color: #1DB954;',
                margin: '0 10 0 0'
            },
            '->',
            {
                xtype: 'button',
                text: 'Logout',
                iconCls: 'x-fa fa-sign-out',
                style: 'background-color: rgb(243, 134, 28); color: white; text-align: centre;',
                handler: function () {
                    Ext.Msg.confirm('Logout', 'Are you sure you want to logout?', function (choice) {
                        if (choice === 'yes') {
                            Ext.Ajax.request({
                                url: '/OpalMp3/logout.json',
                                method: 'POST',
                                success: function () {
                                    localStorage.clear();
                                    window.location.href = 'index.htm';
                                },
                                failure: function () {
                                    Ext.Msg.alert('Error', 'Logout failed. Please try again.');
                                }
                            });
                        }
                    });
                }
            }         
        ]
    },
    {
        region: 'west',
        xtype: 'panel',
        title: 'Navigation',
        width: 200,
        collapsible: true,
        split: true,
        layout: 'vbox',
        bodyPadding: 10,
        items: [
            {
            xtype: 'textfield',
            emptyText: 'Search...',
            enableKeyEvents: true,
            listeners: {
                keyup: function (field) {
                    var query = field.getValue().toLowerCase();
                    var activeItem = Ext.getCmp('mainCard').getLayout().getActiveItem();
                    if (activeItem && activeItem.xtype === 'musicgrid' || activeItem.xtype === 'usergrid') {
                        var store = activeItem.getStore();
                        store.clearFilter();
                        if (query) {
                            store.filterBy(function (record) {
                                var match = false;
                                Ext.Object.each(record.data, function (key, value) {
                                    if (String(value).toLowerCase().indexOf(query) > -1) {
                                        match = true;
                                    }
                                });
                                return match;
                            });

                            // Highlight matched text
                            var view = activeItem.getView();
                            view.refresh(); // force rerender

                            view.el.select('.x-grid-cell-inner').each(function (el) {
                                var html = el.dom.innerHTML;
                                var regex = new RegExp('(' + Ext.String.escapeRegex(query) + ')', 'gi');
                                el.dom.innerHTML = html.replace(regex, '<span style="color: red; font-weight: bold;">$1</span>');
                            });
                        } else {
                            store.clearFilter();
                            activeItem.getView().refresh(); // clear highlights
                        }
                    }
                }
            }
        },
            {
                xtype: 'button',
                text: '🎵 Music List',
                margin: '10 0',
                width: '100%',
                handler: function () {
                    Ext.getCmp('mainCard').getLayout().setActiveItem('musicPanel');
                }
            },
            {
                xtype: 'button',
                text: '👥 Users List',
                margin: '10 0',
                width: '100%',
                hidden: !isAdmin,
                handler: function () {
                    Ext.getCmp('mainCard').getLayout().setActiveItem('userPanel');
                }
            }
        ]
    },
    {
        region: 'center',
        xtype: 'panel',
        layout: 'card',
        id: 'mainCard',
        items: [
            { xtype: 'musicgrid', itemId: 'musicPanel' }
        ].concat(isAdmin ? [
            { xtype: 'usergrid', itemId: 'userPanel' }
        ] : [])
    },
    {
        region: 'south',
        xtype: 'toolbar',
        height: 30,
        style: 'text-align: center;',
        items: ['->', {
            xtype: 'tbtext',
            text: '© 2025 OpalMP3 | All rights reserved.',
            style: 'font-size: 12px; color: gray;'
        }, '->']
    }
];
        this.callParent(arguments);
    }
});

// Auto logout after 5 minutes of inactivity
(function () {
    var timeout;
    var logoutDelay = 5 * 60 * 1000; // 5 minutes

    function resetTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            Ext.Msg.alert('Session Expired', 'You have been logged out due to inactivity.', function () {
                localStorage.clear();
                window.location.href = 'index.htm';
            });
        }, logoutDelay);
    }

    // Listen for user activity
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
        document.addEventListener(evt, resetTimer, false);
    });

    resetTimer(); // Start the timer on page load
})();

