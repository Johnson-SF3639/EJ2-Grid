
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, Query, ODataAdaptor } from '@syncfusion/ej2-data';
import { Ajax } from '@syncfusion/ej2-base';

let data: DataManager = new DataManager({
url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/?$top=7',
adaptor: new ODataAdaptor
});


Grid.Inject(Page);

let grid: Grid = new Grid({
dataSource: data,
query: new Query().addParams('ej2grid', 'true'),
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
    { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
    { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
    { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
],
actionFailure: (e) => {
    let span: HTMLElement = document.createElement('span');
    grid.element.parentNode.insertBefore(span, grid.element);
    span.style.color = '#FF0000'
    span.innerHTML = 'Server exception: 404 Not found';
 }
 
});
grid.appendTo('#Grid');


let ajaxGrid: Grid = new Grid({
    allowPaging: true,
    pageSettings:{ pageSize: 7 },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 120 },
        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 120 },
        { field: 'ShipCountry', headerText: 'Ship Country', textAlign: 'Right', width: 120 }
    ],
    actionFailure: (e) => {
        let span: HTMLElement = document.createElement('span');
        ajaxGrid.element.parentNode.insertBefore(span, ajaxGrid.element);
        span.style.color = '#FF0000'
        span.innerHTML = 'Server exception: 404 Not found';
    }
});

ajaxGrid.appendTo('#AjaxGrid');

let button = document.getElementById('btn');
button.addEventListener("click", function(e){
let ajax = new Ajax("https://ej2services.syncfusion.com/production/web-services/api/Orders", "GET");
ajax.send();
ajax.onSuccess = function (data: string) {
    ajaxGrid.dataSource = JSON.parse(data);
};
});