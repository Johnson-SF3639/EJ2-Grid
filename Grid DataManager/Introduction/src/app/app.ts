import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { Grid, Page} from '@syncfusion/ej2-grids';
import { compile } from '@syncfusion/ej2-base';
import {data} from './datasource';
import { PageSettings } from '@syncfusion/ej2/treegrid';

Grid.Inject(Grid, Page)

//Binding to JSON data (or) Passing to Constructor
let template: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
let compiledFunction: Function = compile(template);

let result: Object[] = new DataManager(data).executeLocal(new Query().take(8));

let table: HTMLElement = (<HTMLElement>document.getElementById('datatable'));

result.forEach((data: Object) => {
table.appendChild(compiledFunction(data)[0]);
});

//Binding to OData 
let oDatatemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>'

let oDatacompiledFunction: Function = compile(oDatatemplate);

const SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

let oDatatable: HTMLElement = (<HTMLElement>document.getElementById('oDatadatatable'));

new DataManager({ url: SERVICE_URI }).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        oDatatable.appendChild(oDatacompiledFunction(data)[0]);
    });
});

//Binding to Data with Filter 
let filterTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
let filterCompiledFunction: Function = compile(filterTemplate);

let filterResult: Object[] = new DataManager(data).executeLocal(new Query().where('EmployeeID', 'equal', 4))

let filterTable: HTMLElement = (<HTMLElement>document.getElementById('Filterdatatable'));

filterResult.forEach((data: Object) => {
    filterTable.appendChild(filterCompiledFunction(data)[0]);
});

//Binding to Data with Sort 
let sortTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
let sortCompiledFunction: Function = compile(sortTemplate);

let sortResult: Object[] = new DataManager(data).executeLocal(new Query().sortBy('CustomerID').take(8));    

let sortTable: HTMLElement = (<HTMLElement>document.getElementById('Sortdatatable'));

sortResult.forEach((data: Object) => {
    sortTable.appendChild(sortCompiledFunction(data)[0]);
});


//Binding to Data with Page 
let pageTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
let pageCompiledFunction: Function = compile(pageTemplate);

let pageResult: Object[] = new DataManager(data).executeLocal(new Query().page(1, 8));

let pageTable: HTMLElement = (<HTMLElement>document.getElementById('Pagedatatable'));

pageResult.forEach((data: Object) => {
    pageTable.appendChild(pageCompiledFunction(data)[0]);
});


//Local data binding 
let localDataBinding : Grid = new Grid({
dataSource: new DataManager(data),
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 90, type: 'number' },
    { field: 'CustomerID', width: 120, headerText: 'Customer ID', type: 'string' },
    { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 90, format: 'C' },
    { field: 'OrderDate', headerText: 'Order Date', width: 120, format: 'yMd' },
],
height: 315
});
localDataBinding.appendTo('#LocalDataBinding');


//Remote data binding 
const REMOTE_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/?$top=20';

let remoteDataBinding : Grid = new Grid({
    dataSource: new DataManager({ url: SERVICE_URI }),
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 90, type: 'number' },
        { field: 'CustomerID', width: 120, headerText: 'Customer ID', type: 'string' },
        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 90 }
    ],
    allowPaging:true,
    pageSettings: {pageSize : 6 }
});
remoteDataBinding.appendTo('#RemoteDataBinding');
