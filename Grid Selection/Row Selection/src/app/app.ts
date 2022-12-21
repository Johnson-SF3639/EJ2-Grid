import { Grid, Page, Selection, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { Button } from '@syncfusion/ej2-buttons';

Grid.Inject(Page)

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
height: 180,
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
    height: 180,
});
iMGrid.appendTo('#IMGrid');


//Get selected row indexes
let iGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple'},
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180,
    rowSelected: rowSelected
});
iGrid.appendTo('#IGrid');

function rowSelected(args: RowSelectEventArgs) {
    let selectedrowindex: number[] = iGrid.getSelectedRowIndexes();  // get the selected row indexes.
    alert(selectedrowindex); // to alert the selected row indexes.
    console.log(selectedrowindex);
    let selectedrecords: Object[] = iGrid.getSelectedRecords();  // get the selected records.
    console.log(selectedrecords);
}


//Simple multiple row selection
let smGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple', enableSimpleMultiRowSelection: true},
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180,
});
smGrid.appendTo('#SMGrid');


//Toggle selection
let tsGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple', enableToggle: true},
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180,
});
tsGrid.appendTo('#TSGrid');


//Clear selection programmatically
let csGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple'},
    selectedRowIndex: 2,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180,
});
csGrid.appendTo('#CSGrid');

let show: Button = new Button({ cssClass: 'e-flat' }, '#show');
document.getElementById('show').onclick = () => {
    let showGrid = document.getElementById('CSGrid')['ej2_instances'][0];
    console.log(showGrid);    
    showGrid.clearSelection();
}


//Get selected records on various pages
let sGrid: Grid = new Grid({
    dataSource: data,
    selectionSettings: {type: 'Multiple', persistSelection: true },
    allowPaging: true,
    pageSettings: { pageSizes: true, pageSize: 5 },
    columns: [
        { type: 'checkbox', width: 50 },
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', isPrimaryKey: true, width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 180,
});
sGrid.appendTo('#SGrid');

let pageShow: Button = new Button({ cssClass: 'e-flat' }, '#PageShow');
document.getElementById('PageShow').onclick = () => {
    let Sgrid = document.getElementById('SGrid')['ej2_instances'][0];
    let selectedrecords: Object[] = Sgrid.getSelectedRecords();
    let selectedRecordsCount: number = selectedrecords.length;
    alert(selectedRecordsCount);
}