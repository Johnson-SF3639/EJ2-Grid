import { Grid, Page, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { data } from './datasource';

Grid.Inject(Page);

let grid: Grid = new Grid({
dataSource: data,
allowPaging: true,

//Set width and height
// height: 315,
// width: 400,

//Responsive with parent container
height: '100%',

//Sticky Header
enableStickyHeader: true,

columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
],
rowSelected: rowSelected,

// Hide the scrollbar when the content is not overflown
dataBound:() => {
    grid.hideScroll();
}

});

grid.appendTo('#Grid');

//  Scroll to selected row
let numeric: NumericTextBox = new NumericTextBox({
    width: 200,
    min: 0,
    showSpinButton: false,
    format: 'N',
    placeholder: 'Enter index to select a row',
    change: onchange
}, '#numeric');
    
function onchange(): void {
grid.selectionModule.selectRow(parseInt(numeric.getText(), 10));
}

function rowSelected(args: RowSelectEventArgs) {
let rowHeight: number = grid.getRows()[grid.getSelectedRowIndexes()[0]].scrollHeight;
grid.getContent().children[0].scrollTop = rowHeight * grid.getSelectedRowIndexes()[0];
}