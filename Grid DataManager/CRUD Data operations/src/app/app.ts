
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';
import { compile } from '@syncfusion/ej2-base';
import { data } from './datasource';

let template: string = '<tr><td>${OrderID}</td><td>${CustomerID}</td><td>${EmployeeID}</td></tr>';

let compiledFunction: Function = compile(template);

let table: HTMLTableElement = (<HTMLTableElement>document.getElementById('datatable'));

let dm: DataManager = new DataManager(data.slice(0, 4));

dm.executeQuery(new Query())
    .then((e: ReturnOption) => {
        (<Object[]>e.result).forEach((data: Object) => {
            table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });

interface IUpdate {
    OrderID: number;
    CustomerID: string;
    EmployeeID: number;
}

interface IInsert {
    OrderID: string;
    CustomerID: string;
    EmployeeID: string;
}

let button: HTMLInputElement = <HTMLInputElement>document.getElementById('manipulate');
let updateButton: HTMLInputElement = <HTMLInputElement>document.getElementById('updatebtn');
let removeButton: HTMLInputElement = <HTMLInputElement>document.getElementById('removebtn');
let orderid: HTMLInputElement = <HTMLInputElement>document.getElementById('OrderID');
let cusid: HTMLInputElement = <HTMLInputElement>document.getElementById('CustomerID');
let empid: HTMLInputElement = <HTMLInputElement>document.getElementById('EmployeeID');


button.onclick = () => {
    let data: IInsert = {
        OrderID: orderid.value,
        CustomerID: cusid.value,
        EmployeeID: empid.value
    };
    if (!data.OrderID) { return; }
    dm.insert(data);
    dm.executeQuery(new Query())
    .then((e: ReturnOption) => {
        table.tBodies[0].innerHTML = '';
        (<Object[]>e.result).forEach((data: Object) => {
            table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });
};

updateButton.onclick = () => {
    let data: IUpdate = {
        OrderID: +orderid.value,
        CustomerID: cusid.value,
        EmployeeID: +empid.value
    };
    if (!data.OrderID) { return; }
    dm.update('OrderID', data);
    dm.executeQuery(new Query())
    .then((e: ReturnOption) => {
        table.tBodies[0].innerHTML = '';
        (<Object[]>e.result).forEach((data: Object) => {
            table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });
};

removeButton.onclick = () => {
    if (!orderid.value) { return; }
    dm.remove('OrderID', { OrderID: +orderid.value });
    dm.executeQuery(new Query())
    .then((e: ReturnOption) => {
        table.tBodies[0].innerHTML = '';
        (<Object[]>e.result).forEach((data: Object) => {
            table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });
};


//Batch Edit Operation
let btable: HTMLTableElement = (<HTMLTableElement>document.getElementById('bdatatable'));
let bdm: DataManager = new DataManager({ json: (<Object[]>data).slice(0, 4) });

bdm.executeQuery(new Query())
    .then((e: ReturnOption) => {
        (<Object[]>e.result).forEach((data: Object) => {
            btable.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });
let changes: { changedRecords: Object[], addedRecords: Object[], deletedRecords: Object[] } = {
    changedRecords: [], addedRecords: [], deletedRecords: []
};
let batchOrderid: HTMLInputElement = <HTMLInputElement>document.getElementById('BOrderID');
let batchCusid: HTMLInputElement = <HTMLInputElement>document.getElementById('BCustomerID');
let batchEmpid: HTMLInputElement = <HTMLInputElement>document.getElementById('BEmployeeID');

document.getElementById('added').onclick = () => {
    changes.addedRecords.push({
        OrderID: +batchOrderid.value,
        CustomerID: batchCusid.value,
        EmployeeID: +batchEmpid.value
    });
    batchOrderid.value = batchCusid.value = batchEmpid.value = null;
};
document.getElementById('changed').onclick = () => {
    changes.changedRecords.push({
        OrderID: +batchOrderid.value,
        CustomerID: batchCusid.value,
        EmployeeID: +batchEmpid.value
    });
    batchOrderid.value = batchCusid.value = batchEmpid.value = null;
};
document.getElementById('deleted').onclick = () => {
    changes.deletedRecords.push({
        OrderID: +batchOrderid.value,
        CustomerID: batchCusid.value,
        EmployeeID: +batchEmpid.value
    });
    batchOrderid.value = batchCusid.value = batchEmpid.value = null;
};

document.getElementById('save').onclick = () => {
    bdm.saveChanges(changes, 'OrderID');
    changes = { changedRecords: [], addedRecords: [], deletedRecords: [] };
    bdm.executeQuery(new Query())
        .then((e: ReturnOption) => {
            btable.tBodies[0].innerHTML = '';
            (<Object[]>e.result).forEach((data: Object) => {
                btable.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
            });
        });
};