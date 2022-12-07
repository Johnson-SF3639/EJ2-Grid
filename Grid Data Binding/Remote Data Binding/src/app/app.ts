import { Grid } from '@syncfusion/ej2-grids';
import { DataManager, ODataAdaptor, ODataV4Adaptor, WebApiAdaptor } from '@syncfusion/ej2-data';

//OData adaptor - Binding OData service
let oData: DataManager = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/?$top=7',
    adaptor: new ODataAdaptor,
    crossDomain: true,
});
let oDataGrid: Grid = new Grid({
    dataSource: oData,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
    ]
});
oDataGrid.appendTo('#ODataGrid');


//OData v4 adaptor - Binding OData v4 service
let v4Data: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/?$top=7',
    adaptor: new ODataV4Adaptor
});

let v4DataGrid: Grid = new Grid({
    dataSource: v4Data,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
    ]
});
v4DataGrid.appendTo('#v4DataGrid');


//Custom adaptor
class SerialNoAdaptor extends ODataAdaptor {
    processResponse(): Object {
        let i: number = 0;
        // calling base class processResponse function
        let original: {result: Object[], count: number} = super.processResponse.apply(this, arguments);
        // adding serial number
        original.result.forEach((item: Object) => item['Sno'] = ++i);
        return { result: original.result, count: original.count };
    }
}
let customData: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/?$top=7',
    adaptor: new ODataV4Adaptor
});
let customAdaptorGrid: Grid = new Grid({
    dataSource: customData,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
    ]
});
customAdaptorGrid.appendTo('#CustomAdaptorGrid');
