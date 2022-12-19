import { DataManager, Query, ODataAdaptor, Predicate} from '@syncfusion/ej2-data';
import { Grid, Page, Group, Aggregate} from '@syncfusion/ej2-grids';

Grid.Inject(Page, Aggregate, Group);


//Query form
let data : DataManager = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc',
    adaptor: new ODataAdaptor
});
let formGrid : Grid = new Grid ({
    allowPaging: true,
    pageSettings: {pageSize: 5},
    dataSource: data,
    query: new Query().from('Orders'),
    columns:[
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number' },
        {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number' }
    ]
});
formGrid.appendTo('#FormGrid');


//Qurey select
let selectData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
});
let selectGrid : Grid = new Grid ({
    dataSource: selectData,
    query: new Query().select(['OrderID','CustomerID','EmployeeID','ShipCountry']),
    allowPaging: true,
    pageSettings: {pageSize: 5},
    columns:[
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number' },
        {field : 'ShipCountry', headerText: 'Ship Country', width: 120 }
    ]
});
selectGrid.appendTo('#SelectGrid');


// Qurey Expand
let expandData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 
let expandGrid : Grid = new Grid ({
    dataSource: expandData,
    query: new Query().expand('Customer').select(['OrderID', 'CustomerID','Customer.CompanyName']),
    allowPaging: true,
    pageSettings: {pageSize: 5},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number' },
        {field : 'Customer.CompanyName', headerText: 'Company Name', width: 120 }
    ]
});
expandGrid.appendTo('#ExpandGrid');


//Query Ascending Sorting
let sortData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 
let sortGrid : Grid = new Grid ({
    dataSource: sortData,
    query: new Query().sortBy('CustomerID', 'ascending'),
    allowPaging: true,    
    pageSettings: {pageSize: 5, pageCount:2},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number' }
    ]
});
sortGrid.appendTo('#SortGrid');

//Query Decending Sorting
let deSortData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 
let deSortGrid : Grid = new Grid ({
    dataSource: deSortData,
    query: new Query().sortByDesc('CustomerID'),
    allowPaging: true,
    pageSettings: {pageSize: 5, pageCount:2},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number' }
    ]
});
deSortGrid.appendTo('#DeSortGrid');


//Query Flitering
let filterData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 

let filterGrid : Grid = new Grid ({
    dataSource: filterData,
    query: new Query().where('EmployeeID', 'equal', 3),
    allowPaging: true,
    pageSettings: {pageSize: 5, pageCount:2},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
        {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number'}
    ]
});
filterGrid.appendTo('#FilterGrid');


//Query Predicate Flitering
let predicate: Predicate = new Predicate('EmployeeID', 'equal', 3);
predicate = predicate.or('EmployeeID', 'equal', 2);

let predicateData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 

let predicateGrid : Grid = new Grid ({
    dataSource: predicateData,
    query: new Query().where(predicate),
    allowPaging: true,
    pageSettings: {pageSize: 5, pageCount:2},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
        {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number'}
    ]
});
predicateGrid.appendTo('#PredicateGrid');


//Query Searching
let searchData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 

let searchGrid : Grid = new Grid ({
    dataSource: searchData,
    query: new Query().search('VI','CustomerID'),
    allowPaging: true,
    pageSettings: {pageSize: 5, pageCount:2},
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
        {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number'}
    ]
});
searchGrid.appendTo('#SearchGrid');


//Query Paging
let pageData : DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    adaptor: new ODataAdaptor
}); 

let pageGrid : Grid = new Grid ({
    dataSource: pageData,
    query: new Query().page(1,5),
    columns:[   
        {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
        {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
        {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number'}
    ]
});
pageGrid.appendTo('#PageGrid');


//Query Grouping
// let groupData : DataManager = new DataManager({
//     url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
//     adaptor: new ODataAdaptor
// }); 

// let groupGrid : Grid = new Grid ({
//     dataSource: groupData,
//     query: new Query().group('CustomerID'),
//     allowGrouping: true,
//     groupSettings:{ showDropArea:false},
//     allowPaging: true,
//     pageSettings: {pageSize: 5, pageCount:3},
//     columns:[   
//         {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
//         {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
//         {field : 'EmployeeID', headerText: 'Employee ID', width: 120, type: 'number'}
//     ]
// });
// groupGrid.appendTo('#GroupGrid');


//Query Aggregation
// let aggData : DataManager = new DataManager({
//     url:'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
//     adaptor: new ODataAdaptor
// }); 

// let aggGrid : Grid = new Grid ({
//     dataSource: aggData,
//     query: new Query().requiresCount().aggregate('min', 'EmployeeID'),
//     allowPaging: true,
//     pageSettings: {pageSize: 5, pageCount:2},
//     columns:[   
//         {field : 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
//         {field : 'CustomerID', headerText: 'Customer ID', width: 120, type: 'number'},
//         {field : 'Freight', headerText: 'Freight ', width: 120, type: 'number'}
//     ],
//     aggregates: [
//         { columns: [ ]}
//     ]
// });
// aggGrid.appendTo('#AggGrid');
