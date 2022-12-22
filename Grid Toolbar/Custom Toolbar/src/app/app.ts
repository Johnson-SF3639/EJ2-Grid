import { Grid, Toolbar, Group } from '@syncfusion/ej2-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { data } from './datasource';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Toolbar, Group);


let clickHandler: EmitType<ClickEventArgs> = (args: ClickEventArgs) => {
    var target: Element = (<HTMLElement>args.originalEvent.target).closest('.e-toolbar-item');
    if (target.id === 'collapse') {
        grid.groupModule.collapseAll();
    }
};
let grid: Grid = new Grid({
    dataSource: data,
    toolbarTemplate: '#toolbar-template',
    toolbarClick: clickHandler,
    allowGrouping: true,
    groupSettings: { columns: ['CustomerID'] },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C2' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180
});
grid.appendTo('#Grid');


//Render drop-down list in custom toolbar
let rowIndex: any = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

let dropGrid: Grid = new Grid({
dataSource: data,
toolbarTemplate: '#dropdown-toolbar-template',
dataBound: dataBound,
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
    { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
    { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C2' },
    { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
],
height: 180
});
dropGrid.appendTo('#DropGrid');

function dataBound(): void {
    let dropDownListObject: DropDownList = new DropDownList({
    // set the data to dataSource property
    dataSource: rowIndex,
    change: change,
    popupHeight :200
    });
    dropDownListObject.appendTo('#ddlelement');
}

function change(args: ChangeEventArgs): void {    
    dropGrid.selectRow(<number>args.value);
}

