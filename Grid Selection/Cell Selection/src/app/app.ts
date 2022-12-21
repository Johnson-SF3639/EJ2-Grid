import { Grid, Edit, Page, Filter, Toolbar } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Edit, Page, Filter, Toolbar);

//Cell Selection in JavaScript Grid control
let cellGrid: Grid = new Grid({
dataSource: data,
enableHover: false,
selectionSettings: { cellSelectionMode: 'Box', type: 'Multiple', mode: 'Cell' },
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
],
height: 180
});
cellGrid.appendTo('#CellGrid');


//Column Selection
let ColumnGrid: Grid = new Grid({
    dataSource: data,
    enableHover: false,
    selectionSettings: { allowColumnSelection: true, type: 'Multiple' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180
});
ColumnGrid.appendTo('#ColumnGrid');


//Checkbox Selection 
let CheckGrid: Grid = new Grid({
    dataSource: data,
    enableHover: false,
    selectionSettings: { allowColumnSelection: true, checkboxOnly: true, type: 'Multiple' },
    columns: [
        { type: 'checkbox', width: 100 },
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180
});
CheckGrid.appendTo('#CheckGrid');


//ResetOnRowClick
let grid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {checkboxMode: 'ResetOnRowClick'},
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180
});
grid.appendTo('#RGrid');


//Prevent specific rows from being selected in checkbox selection
let pGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: { persistSelection: true },
    allowFiltering: true,
    filterSettings: { type: 'CheckBox' },
    pageSettings: { pageSize: 20 },
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'},
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
    rowDataBound: rowDataBound,
    columns: [
        { type: 'checkbox', width: 120 },
        { field: 'List', headerText: 'List',  width: 120 },
        { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID',  width: 150 },
        { field: 'CustomerID', headerText: 'CustomerID',  width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 }
    ]
    });
    pGrid.appendTo('#PGrid');
    
    for (let i = 0; i < data.length; i++) {
        data[i]['List'] = i + 1;
    
    }
    function rowDataBound(args: any): void {
        args.isSelectable = (args.data.List % 5 === 0);
    }

