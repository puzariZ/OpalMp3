///* 
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
// */
//
//
//Ext.define('OpalMp3.store.MusicStore', {
//    extend: 'Ext.data.Store',
//    alias: 'store.musicstore',
//    fields: ['id', 'title', 'artist', 'album', 'genre', 'releaseDate', 'duration'],
//    pageSize: 15,
////    remoteSort: true,
////    simpleSortMode: true, 
//    sorters: [{ property: 'id', direction: 'ASC' }],
//    proxy: {
//        type: 'ajax',
//        url: '/OpalMp3/getAllTracks.json',
//        method:'GET',
//        reader: {
//            type: 'json',
//            rootProperty: 'musicList',
//            totalProperty: 'totalCount'
//        },
//        simpleSortMode: true,
////        startParam: 'start', // Start param 
////        limitParam: 'limit', // limit param
//        extraParams: {
//////            start: 0,   // Default starting point 
//////            limit: 15,   // Default page size
//            sortColumn: 'id', // Default sorting column
//            sortOrder: 'DESC' // Default sorting order
//        },
//        remoteSort: true,  // to use server-side sorting
////    listeners: {
////        sort: function(store, sorters) {
////        
////            var sorter = sorters[0];
////            var sortColumn = sorter.getProperty();  // Get the field to sort by
////            var sortOrder = sorter.getDirection();  // ASC or DESC
////
////            store.getProxy().setExtraParam('sortColumn', sortColumn); // Set the column
////            store.getProxy().setExtraParam('sortOrder', sortOrder); // Set the order
//////            store.loadPage(1); // Reload the first page of results
////        }
////    }
////                sortParam: 'sortColumn',
////        directionParam: 'sortOrder',
//
////                sortParam: undefined, // Disable default 'sort' param
////        encodeSorters: function(sorters) {
////            const sorter = sorters[0]; // Only single column sort supported
////            this.extraParams.sortColumn = sorter.property;
////            this.extraParams.sortOrder = sorter.direction;
////            return ''; // No default encoding
////        }
//
//
//    },
////        sorters: [{
////        property: 'id',
////        direction: 'DESC'
////    }],
//    autoLoad: true, // automatic load
//    
////    listeners: {
////        beforeload: function(store, operation) {
////            // Dynamically set default sortColumn and sortOrder for every request
////            if (!operation.getParams()) {
////                operation.setParams({});
////            }
////            operation.setParams(Ext.apply(operation.getParams(), {
//////                sortColumn: 'title',
//////                sortOrder: 'ASC'
//////                sortColumn: operation.getParams().sortColumn || 'id', // Default to 'title' if not set
//////                sortOrder: operation.getParams().sortOrder || 'DESC' // Default to 'ASC' if not set
////
////            }));
////        }
////    }
//    
//    
//});


Ext.define('OpalMp3.store.MusicStore', {
    extend: 'Ext.data.Store',
    alias: 'store.musicstore',
    fields: ['id', 'title', 'artist', 'album', 'genre', 'releaseDate', 'duration'],
    pageSize: 25,
    remoteSort: true,
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }],
    proxy: {
        type: 'ajax',
        url: '/OpalMp3/getAllTracks.json',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'musicList',
            totalProperty: 'totalCount'
        },
        simpleSortMode: true,
        startParam: 'start', // Start param 
        limitParam: 'limit', // limit param
    },
    autoLoad: true
});
