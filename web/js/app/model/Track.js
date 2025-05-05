/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.define('OpalMp3.model.Track', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', sortable: true },
        { name: 'title', type: 'string', sortable: true },
        { name: 'artist', type: 'string', sortable: true },
        { name: 'album', type: 'string', sortable: true },
        { name: 'genre', type: 'string', sortable: true },
        { name: 'releaseDate', type: 'string', sortable: true },
        { name: 'duration', type: 'string', sortable: true }
    ],
});