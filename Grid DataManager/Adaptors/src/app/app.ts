import { DataManager, Query, JsonAdaptor, UrlAdaptor, ODataAdaptor, ODataV4Adaptor, WebMethodAdaptor, AjaxOption, ReturnOption} from '@syncfusion/ej2-data';
import { compile } from '@syncfusion/ej2-base';
import {data} from './datasource';

//Json adaptor
let jsonTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
let jsonCompiledFunction: Function = compile(jsonTemplate);

let jsonResult: Object[] = new DataManager({ json: data, adaptor: new JsonAdaptor }).executeLocal(new Query().take(8));

let jsonTable: HTMLElement = (<HTMLElement>document.getElementById('JsonDatatable'));

jsonResult.forEach((data: Object) => {
    jsonTable.appendChild(jsonCompiledFunction(data)[0]);
});


//Url adaptor
// let urlTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';
// let urlCompiledFunction: Function = compile(urlTemplate);

// const SERVICE_URI: string = 'http://controller.com/actions';

// let urlResult: Object[] = new DataManager({ url: SERVICE_URI, adaptor: new UrlAdaptor  }).executeLocal(new Query().take(8));

// let urlTable: HTMLElement = (<HTMLElement>document.getElementById('UrlDatatable'));

// urlResult.forEach((data: Object) => {
//     urlTable.appendChild(urlCompiledFunction(data)[0]);
// });


//OData adaptor
let oDataTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let oDataCompiledFunction: Function = compile(oDataTemplate);

const ODATA_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

let oDataTable: HTMLElement = (<HTMLElement>document.getElementById('ODataDatatable'));

new DataManager({ url: ODATA_SERVICE_URI, adaptor: new ODataAdaptor, offline: true}).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        oDataTable.appendChild(oDataCompiledFunction(data)[0]);
    });
});


//OData adaptor with addParams
let oDataAddParamsTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let oDataAddParamsCompiledFunction: Function = compile(oDataAddParamsTemplate);

const ODATA_Params_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

let oDataAddParamsTable: HTMLElement = (<HTMLElement>document.getElementById('ODataAddParamsDatatable'));

new DataManager({ url: ODATA_Params_SERVICE_URI, adaptor: new ODataAdaptor }).executeQuery(new Query().addParams('$top', '3'))
.then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        oDataAddParamsTable.appendChild(oDataAddParamsCompiledFunction(data)[0]);
    });
});


//OData V4 adaptor
let oDataV4Template: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let oDataV4CompiledFunction: Function = compile(oDataV4Template);

const ODATAV4_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

let oDataV4Table: HTMLElement = (<HTMLElement>document.getElementById('ODataV4Datatable'));

new DataManager({ url: ODATAV4_SERVICE_URI, adaptor: new ODataV4Adaptor }).executeQuery(new Query().take(8)).then((event: ReturnOption) => {
    (<Object[]>event.result['d']).forEach((data: Object) => {
        oDataV4Table.appendChild(oDataV4CompiledFunction(data)[0]);
    });
});


//Web API adaptor
// let webApiMethodTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

// let webApiMethodCompiledFunction: Function = compile(webApiMethodTemplate);

// const WEB_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

// let webApiMethodTable: HTMLElement = (<HTMLElement>document.getElementById('webApiMethodDatatable'));

// new DataManager({ url: WEB_SERVICE_URI, adaptor: new WebMethodAdaptor }).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
//     (<Object[]>e.result).forEach((data: Object) => {
//         webApiMethodTable.appendChild(webApiMethodCompiledFunction(data)[0]);
//     });
// });


// Writing custom adaptor
class SerialNoAdaptor extends ODataAdaptor {
    public processResponse(): Object {
        let i: number = 0;
        //calling base class processResponse function
        let original: Object[] = super.processResponse.apply(this, arguments);
        //Adding serial number
        original.forEach((item: Object) => item['Sno'] = ++i);
        return original;
    }
}
let CustomTemplate: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let CustomCompiledFunction: Function = compile(CustomTemplate);

const CUSTOM_SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';

let CustomTable: HTMLElement = (<HTMLElement>document.getElementById('CustomDatatable'));

new DataManager({ url: CUSTOM_SERVICE_URI, adaptor: new SerialNoAdaptor }).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
    (<Object[]>e.result).forEach((data: Object) => {
        CustomTable.appendChild(CustomCompiledFunction(data)[0]);
    });
});