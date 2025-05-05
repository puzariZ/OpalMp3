Ext.define('OpalMp3.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'app-toolbar',

    initComponent: function () {
        this.items = [
            {
                xtype: 'component',
                html: '<img src="web/js/app/view/music-app.png" height="40"/>',
                margin: '0 20 0 0'
            },
            '->',
            {
                xtype: 'tbtext',
                text: 'Hi, ' + localStorage.getItem('currentUsername') // or session username
            }
        ];
        this.callParent(arguments);
    }
});
