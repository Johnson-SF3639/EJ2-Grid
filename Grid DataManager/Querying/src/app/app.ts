import { DataManager, Query, ODataAdaptor, ReturnOption, Predicate} from '@syncfusion/ej2-data';
import { compile } from '@syncfusion/ej2-base';


let template: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let compiledFunction: Function = compile(template);

const ORDERS_SERVICE_URI: string =  'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

//Specifying resource name using from
const SERVICE_URI: string =  'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc';

let table: HTMLElement = (<HTMLElement>document.getElementById('FormDatatable'));

new DataManager({ url: SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().from('Orders').take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        table.appendChild(compiledFunction(data)[0]);
    });
});


//Projection using select
let projectionTable: HTMLElement = (<HTMLElement>document.getElementById('ProjectionDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().select(['OrderID', 'CustomerID', 'EmployeeID']).take(8))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
       projectionTable.appendChild(compiledFunction(data)[0]);
    });
});


//Eager loading navigation properties
let expandTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${Employee.FirstName}</td></tr>';

let expandCompiledFunction: Function = compile(expandTemplate);

let expandTable: HTMLElement = (<HTMLElement>document.getElementById('expandDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().expand('Employee').select(['OrderID', 'CustomerID', 'Employee.FirstName']).take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        expandTable.appendChild(expandCompiledFunction(data)[0]);
    });
})


//Sorting
let sortTable: HTMLElement = (<HTMLElement>document.getElementById('sortDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().sortByDesc('CustomerID').take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        sortTable.appendChild(compiledFunction(data)[0]);
    });
})

//Flitering
let fliteringTable: HTMLElement = (<HTMLElement>document.getElementById('FliteringDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().where('EmployeeID', 'equal', 3).take(8))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        fliteringTable.appendChild(compiledFunction(data)[0]);
    });
});


//Build complex filter criteria using Predicate
let ComplaxTable: HTMLElement = (<HTMLElement>document.getElementById('ComplaxDatatable'));

let predicate: Predicate = new Predicate('EmployeeID', 'equal', 3);
predicate = predicate.or('EmployeeID', 'equal', 2);
predicate = predicate.or('EmployeeID', 'equal', 1);

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().where(predicate).take(8))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        ComplaxTable.appendChild(compiledFunction(data)[0]);
    });
});


//searching
let searchTable: HTMLElement = (<HTMLElement>document.getElementById('searchdatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().search('WHITC', ['CustomerID']))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        searchTable.appendChild(compiledFunction(data)[0]);
    });
});


//Grouping
let groupingTemplate: string = '<tr><td id="group_cols">${field} - ${key}</td><td id="group_cols"></td><td id="group_cols"></td></tr>${for(item of items)}<tr><td>${item.OrderID}</td><td>${item.CustomerID}</td><td>${item.EmployeeID}</td></tr>${/for}';

let groupingCompiledFunction: Function = compile(groupingTemplate);

let groupTable: HTMLElement = (<HTMLElement>document.getElementById('GroupDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().group('CustomerID').take(8))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        groupTable.appendChild(groupingCompiledFunction(data)[0]);
    });
});


//Paging
let pageTable: HTMLElement = (<HTMLElement>document.getElementById('PagingDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().page(2, 8))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        pageTable.appendChild(compiledFunction(data)[0]);
    });
});


//Aggregation
let footerFn: Function = compile('<tr><td></td><td></td><td>Minimum: ${min}</td><td>Maximum: ${max}</td></tr>');

let aggTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td><td>${EmployeeID}</td></tr>';

let aggCompiledFunction: Function = compile(aggTemplate);

let aggregationTable: HTMLElement = (<HTMLElement>document.getElementById('AggregationDatatable'));

new DataManager({ url: ORDERS_SERVICE_URI, adaptor: new ODataAdaptor })
.executeQuery(new Query().take(5).requiresCount().aggregate('min', 'EmployeeID').aggregate('max', 'EmployeeID'))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        aggregationTable.appendChild(aggCompiledFunction(data)[0]);
    });
    aggregationTable.appendChild(footerFn({ min: e.aggregates['EmployeeID - min'], max: e.aggregates['EmployeeID - max'] })[0]);
});