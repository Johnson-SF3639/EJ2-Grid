import { Grid, Group, Toolbar, Edit, ColumnChooser, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

import { data } from './datasource';

Grid.Inject(Toolbar, Group, Edit, ColumnChooser, ExcelExport, PdfExport );

let clickHandler: EmitType<ClickEventArgs> = (args: ClickEventArgs) => {
    console.log();
    
    if (args.item.id === 'expandall') {
        ctgrid.groupModule.expandAll();
    }
    if (args.item.id === "collapseall") {
        ctgrid.groupModule.collapseAll();
    }
    if (args.item.id === 'expand_All') {
        posGrid.groupModule.expandAll();
    }
    if (args.item.id === "collapse_All") {
        posGrid.groupModule.collapseAll();
    }
    if (args.item.id === 'Click') {
        alert("Custom toolbar click...");
    }
};

//Toolbar items 'Add', 'Edit', 'Delete', 'Update', 'Cancel','ColumnChooser'
let grid: Grid = new Grid({
    dataSource: data,
    showColumnChooser:true,
    toolbar: [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel','ColumnChooser'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180
});
grid.appendTo('#Grid');


let toolGrid: Grid = new Grid({
    dataSource: data,
    allowPdfExport: true,
    allowExcelExport: true,
    toolbar: [ 'Print', 'ExcelExport', 'PdfExport', 'Search'],
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180
});
toolGrid.appendTo('#ToolGrid');

toolGrid.toolbarClick = (args: Object) => {    
    if (args['item'].id === 'ToolGrid_pdfexport') {
        toolGrid.pdfExport();
    }
    if (args['item'].id === 'ToolGrid_excelexport') {
        toolGrid.excelExport();
    }
}


//Custom toolbar items
let ctgrid: Grid = new Grid({
    dataSource: data,
    allowGrouping: true,
    toolbar: [{ text: 'Expand All', tooltipText: 'Expand All', prefixIcon: 'e-expand', id: 'expandall' }, { text: 'Collapse All', tooltipText: 'collection All', prefixIcon: 'e-collapse', id: 'collapseall', align:'Right' }],
    toolbarClick: clickHandler,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180,
});
ctgrid.appendTo('#CusToolGrid');


//Both built-in and custom items in toolbar
let bothGrid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', { text: 'Click', tooltipText: 'Click', prefixIcon: 'e-expand', id: 'Click' }],
    toolbarClick: clickHandler,
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
    ],
    height: 180
});
bothGrid.appendTo('#CusWithBuildGrid');


//Custom toolbar component in a specific position
let posGrid: Grid = new Grid({
    dataSource: data,
    allowGrouping: true,    
    groupSettings: { columns: ['OrderID'] },
    toolbar: [
        { text: 'Expand All', tooltipText: 'Expand All', prefixIcon: 'e-expand', id: 'expand_All', align: 'Left'}, 
        { text: 'Collapse All', tooltipText: 'collection All', prefixIcon: 'e-collapse', id: 'collapse_All', align: 'Right' }, 
        { text: 'Search', align: 'Center'}
    ],
    toolbarClick: clickHandler,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
    ],
    height: 180,
});
posGrid.appendTo('#CusPosGrid');

