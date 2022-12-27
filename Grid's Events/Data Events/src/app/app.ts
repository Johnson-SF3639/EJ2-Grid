import { Grid, Page, Sort, Edit, Toolbar, RowDD ,CellDeselectEventArgs, CellEditArgs, CellSaveArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page, Sort, Edit, Toolbar, RowDD)

//dataBound
let cellGrid: Grid = new Grid({
    dataSource: data,
    toolbar:['Add', 'Delete', 'Update', 'Cancel'],
    allowPaging: true,
    allowSorting: true,
    editSettings: { allowAdding: true, allowEditing:true, allowDeleting:true, mode: 'Batch' },
    selectionSettings: { mode: 'Cell' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true  },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
   dataBound:DataBound,
   dataSourceChanged: dataSourceChanged,
    height: 180
}); 
cellGrid.appendTo('#dataGrid');


function DataBound (args: CellEditArgs) {
    console.log("DataBound Working");    
}
function dataSourceChanged (args: CellEditArgs) {
    console.log("dataSourceChanged Working");    
}
