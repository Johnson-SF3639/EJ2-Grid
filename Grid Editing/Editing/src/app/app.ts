import { Grid, Edit, Toolbar, EditEventArgs, parentsUntil, Page} from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Edit, Toolbar, Page);

let grid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    
    actionBegin: (args: EditEventArgs) => {
        if (args.requestType === 'beginEdit') {
            if (args.rowData['ShipCountry'] == "France") {
                args.cancel = true;
            }
        }
    },
    columns: [
        //PrimaryKey
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },

        //Edit Disabled
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 , allowEditing: false  },

        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },

        //Editing Template 
        { field: 'ShipAddress', headerText: 'Ship Address', template: '#template', width: 150 },

        //Always Editable
        { field: 'Freight', headerText: 'Freight Amount', template: '#template1', width: 150 }
    ],
    allowPaging: true,
    pageSettings: { pageSize: 5 },
    created: () => {
        grid.element.addEventListener('change', function (e) { // Bind the keyup event for the grid.
            if ((e.target as any).classList.contains('custemp')) { // Based on this condition, you can find whether the target is an input element or not.
                var row = parentsUntil(e.target as any, 'e-row');
                var rowIndex = (row as any).rowIndex; // Get the row index.
                var uid = row.getAttribute('data-uid');
                var rowData = grid.getRowObjectFromUID(uid).data; // Get the row data.
                (rowData as any).Freight = (e.target as any).value; // Update the new value for the corresponding column.
                grid.updateRow(rowIndex, rowData); // Update the modified value in the row data.
            }
        });
    }
});
grid.appendTo('#Grid');

let batchgrid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode:'Batch' },

    cellEdit: (args) => {
        if (args['value'] == "Germany") {
            args.cancel = true;
        }
    },

    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    ],
    allowPaging: true,
    pageSettings: { pageSize: 5 },
});
batchgrid.appendTo('#BatchGrid');