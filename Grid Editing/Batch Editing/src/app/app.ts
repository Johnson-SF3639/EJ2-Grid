import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { productData, data } from './datasource';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

var priceElem: HTMLElement;;
var priceObj: NumericTextBox;
var stockElem: HTMLElement;;
var stockObj: NumericTextBox;

Grid.Inject(Edit, Toolbar);

let isAddable: boolean = true;

let grid: Grid = new Grid({
    dataSource: productData,
    toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', newRowPosition: 'Top' },
    columns: [
        { field: 'ProductID', isPrimaryKey: true, headerText: 'Product ID', textAlign: 'Right', validationRules: { required: true, number: true }, width: 140 },
        { field: 'ProductName', headerText: 'Product Name', validationRules: { required: true }, width: 140 },
        { field: 'UnitPrice', headerText: 'UnitPrice', textAlign: 'Right', width: 140, format: 'C2', validationRules: { required: true }, edit: {
            create: function() {
              priceElem = document.createElement('input');
              return priceElem;
            },
            read: function() {
              return priceObj.value;
            },
            destroy: function() {
              priceObj.destroy();
            },
            write: function(args: any) {
              var rowData = args.rowData;
              var rowIndex = grid.getRowInfo(args.row).rowIndex;
              priceObj = new NumericTextBox({
                value: args.rowData[args.column.field],
                change: function(args) {
                  var totalCostValue = args.value * rowData['UnitsInStock'];
                  grid.updateCell(rowIndex, 'TotalCost', totalCostValue);
                }
              });
              priceObj.appendTo(priceElem);
            }
          }
        },
        { field: 'UnitsInStock', headerText: 'Units In Stock', textAlign: 'Right', width: 140, validationRules: { required: true }, 
        edit: {
            create: function() {
              stockElem = document.createElement('input');
              return stockElem;
            },
            read: function() {
              return stockObj.value;
            },
            destroy: function() {
              stockObj.destroy();
            },
            write: function(args: any) {
              var rowData = args.rowData;
              var rowIndex = grid.getRowInfo(args.row).rowIndex;
              stockObj = new NumericTextBox({
                value: args.rowData[args.column.field],
                change: function(args) {
                  var totalCostValue = args.value * rowData['UnitPrice'];
                  grid.updateCell(rowIndex, 'TotalCost', totalCostValue);
                }
              });
              stockObj.appendTo(stockElem);
            }
          }
        },
        { field: 'TotalCost', headerText: 'Total Unit Cost', textAlign: 'Right', width: 140, format: 'C2'}
    ]
});

grid.appendTo('#Grid');


let cancelEditGrid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
    editSettings: {  showConfirmDialog: true, showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', newRowPosition: 'Top' },
    beforeBatchAdd: beforeBatchAdd,
    beforeBatchDelete: beforeBatchDelete,

    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
        { field: 'ShipName', headerText: 'ShipName', width: 120, },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit', width: 120, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150 }
    ]
});
cancelEditGrid.appendTo('#CancelEditGrid');

grid.cellEdit= function(args){
    if(args.columnName == "TotalCost"){
        args.cancel= true;
    }
}

cancelEditGrid.cellEdit= function(args){
    console.log(args.rowData['ShipName']);    
    if (args.rowData['ShipName'] == 'Toms Spezialitäten') {
        args.cancel = true;
    }
}
    
function beforeBatchAdd(args: any) {
    if (!isAddable) {
      args.cancel = true;
    }
  }
  function beforeBatchDelete(args: any) {
    if (args.rowData['ShipName'] == 'Hanari Carnes') {
      args.cancel = true;
    }
  }
  
  var button = document.createElement('button');
  button.innerText = 'Grid is Addable';
  document.body.insertBefore(button, document.body.children[0]);
  button.addEventListener('click', btnClick.bind(this));
  
  function btnClick(args: any) {
    args.target.innerText == 'Grid is Addable' ? (args.target.innerText = 'Grid is Not Addable') : (args.target.innerText = 'Grid is Addable');
    isAddable = !isAddable;
  }