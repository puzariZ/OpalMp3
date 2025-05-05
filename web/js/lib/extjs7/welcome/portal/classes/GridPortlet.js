Ext.define('Ext.app.GridPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',
    uses: [
        'Ext.data.ArrayStore'
    ],
    height: 300,
    myData: [
        ['Business Process 1',  '2011/04/22'],
        ['Business Process 2',  '2011/06/23'],
       ['Business Process 3',  '2011/01/12'],
       ['Business Process 4',  '2011/02/22'],
       ['Business Process 5',  '2011/03/12'],
       ['Business Process 6',  '2011/04/24'],
       ['Business Process 7',  '9/1/2014'],
       ['Business Process 8',  '9/1/2014'],
       ['Business Process 9',  '9/1/2014'],
       ['Business Process 10',  '9/1/2014'],
       ['Business Process 11',  '9/1/2014'],
       ['Business Process 12',  '9/1/2014'],
       ['Business Process 13',  '9/1/2014'],
       ['Business Process 14',  '9/1/2014'],
       ['Business Process 15',  '9/1/2014'],
       ['Business Process 16',  '9/1/2014'],
       ['Business Process 17',  '9/1/2014']
       
        
    ],

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    change: function(val) {
        return Ext.util.Format.dateRenderer('m/d/y')
         
    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    pctChange: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },

    initComponent: function(){

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'company'},
               {name: 'change',     type: 'date' },
               
            ],
            data: this.myData
        });

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'company',
                text   : 'Business Process',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'company'
            },{
                text   : 'Date Started',
                xtype   : 'datecolumn',
                width    : 75,
                format:'Y-m-d',
//                sortable : true,
//                renderer : Ext.util.Format.dateRenderer('m-d-y'),
                dataIndex: 'change'
            }]
        });

        this.callParent(arguments);
    }
});
