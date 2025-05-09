Ext.define('KitchenSink.data.SalesData', {
    requires: [
        'KitchenSink.data.Init',
        'Ext.ux.ajax.PivotSimlet'
    ]
}, function() {
    var data = [],
        items = 500,
        rand = 37,
        companies = ['Google', 'Apple', 'Dell', 'Microsoft', 'Adobe'],
        countries = ['Belgium', 'Netherlands', 'United Kingdom', 'Canada', 'United States', 'Australia'],
        persons = ['John', 'Michael', 'Mary', 'Anne', 'Robert'],
        randomItem = function(data) {
            var k = rand % data.length;

            rand = rand * 1664525 + 1013904223;
            rand &= 0x7FFFFFFF;

            return data[k];
        },
        randomDate = function(start, end) {
            return Ext.Date.clearTime(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
        },
        i;

    for (i = 0; i < items; i++) {
        data.push({
            id: i,
            company: randomItem(companies),
            country: randomItem(countries),
            person: randomItem(persons),
            date: randomDate(new Date(2012, 0, 1), new Date()),
            value: Ext.Number.toFixed(Math.random() * 1000 + 1, 2),
            quantity: Math.floor(Math.random() * 30 + 1)
        });
    }

    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/SalesData': {
            type: 'json',
            data: data
        }
    });
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/RemoteSalesData': {
            type: 'pivot',
            data: data
        }
    });
});
