Ext.define('OpalMp3.store.UserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userstore',
    storeId: 'userstore',
    fields: ['id', 'username', 'email', 'role'],
    pageSize: 25,
    remoteSort: true,
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/OpalMp3/getAllUsers.json',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'userList',
            totalProperty: 'totalCount'  // Ensure the API response includes the total count of items
        },
        simpleSortMode: true,
        startParam: 'start', // Start param 
        limitParam: 'limit', // limit param
    },
    autoLoad: true,
    listeners: {
                beforeload: function(store, operation) {
            operation.setParams({
                sortColumn: 'id',  // Default sorting
                sortOrder: 'DESC'  // Default sort order
            });
        }
//        beforeload: function(store, operation) {
//            // Dynamically set default sortColumn and sortOrder for every request
//            if (!operation.getParams()) {
//                operation.setParams({});
//            }
//            operation.setParams(Ext.apply(operation.getParams(), {
////                sortColumn: 'title',
////                sortOrder: 'ASC'
////                sortColumn: operation.getParams().sortColumn || 'id', // Default to 'title' if not set
////                sortOrder: operation.getParams().sortOrder || 'DESC' // Default to 'ASC' if not set
//
//            }));
//        }
    }
});
