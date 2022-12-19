import { Grid, Selection, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';


//Multiple Selection
let grid: Grid = new Grid({
dataSource: data,
selectionSettings: { type: 'Multiple' },
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
],
height: 315
});
grid.appendTo('#Grid');


//Selection Modes and Select row at initial rendering
let iMGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: { type: 'Multiple', mode: 'Both' },
    selectedRowIndex: 1,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 315
});
iMGrid.appendTo('#IMGrid');

let iGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple'},
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 315,
    rowSelected: rowSelected
});
iGrid.appendTo('#IGrid');

function rowSelected(args: RowSelectEventArgs) {
    let selectedrowindex: number[] = iGrid.getSelectedRowIndexes();  // get the selected row indexes.
    alert(selectedrowindex); // to alert the selected row indexes.
    let selectedrecords: Object[] = iGrid.getSelectedRecords();  // get the selected records.
}