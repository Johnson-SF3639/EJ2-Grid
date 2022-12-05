import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

Grid.Inject(Edit, Toolbar);

var priceElem: HTMLElement;;
var priceObj: NumericTextBox;
var stockElem: HTMLElement;;
var stockObj: NumericTextBox;

let isAddable: boolean = true;

let grid: Grid = new Grid({
    dataSource: data,
    recordDoubleClick: recordDoubleClick,
    actionComplete: actionComplete,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: {showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120},
        { field: 'CustomerID', headerText: 'Customer ID', width: 120, defaultValue: 'HANAR' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit', width: 120, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150 },
        { field: 'UnitPrice', headerText: 'UnitPrice', textAlign: 'Right', width: 140, format: 'C2', validationRules: { required: true },
        edit: {
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
            write: function(args : any) {
                priceObj = new NumericTextBox({
                    value: args.rowData[args.column.field],
                    change: function(args) {
                    var formEle = grid.element.querySelector('form').ej2_instances[0];
                    var totalCostFieldEle = formEle.getInputElement('TotalCost');
                    totalCostFieldEle.value = priceObj.value * stockObj.value;
                    }
                });
                priceObj.appendTo(priceElem);
            }
        }},
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
            write: function(args : any) {
                stockObj = new NumericTextBox({
                value: args.rowData[args.column.field],
                change: function(args) {
                    var formEle = grid.element.querySelector('form').ej2_instances[0];
                    var totalCostFieldEle = formEle.getInputElement('TotalCost');
                    totalCostFieldEle.value = priceObj.value * stockObj.value;
                }
                });
                stockObj.appendTo(stockElem);
            }
            }
          },
          { field: 'TotalCost', headerText: 'Total Unit Cost', textAlign: 'Right', allowEditing: false, width: 140, format: 'C2' }
    ],
    
    actionBegin: actionBegin,
    height: 265
});
grid.appendTo('#Grid');

//Perform CRUD action programmatically
document.getElementById('add').onclick = () => {
    grid.addRecord({
        OrderID: 10548, CustomerID: 'Siva', EmployeeID: 7, OrderDate: new Date(8364186e5),
        UnitPrice: 20.0, UnitsInStock: 10, TotalCost: 200,
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Ambatthur', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'India', Freight: 100.38, Verified: !0});
    };
    
    document.getElementById('edit').onclick = () => {
    grid.startEdit();
    };
    
    document.getElementById('delete').onclick = () => {
    grid.deleteRecord();
    };
    
    document.getElementById('updaterow').onclick = () => {
    grid.updateRow(0, {
        OrderID: 10548, CustomerID: 'Tamil', EmployeeID: 7, OrderDate: new Date(8364186e5),
        UnitPrice: 20.0, UnitsInStock: 10, TotalCost: 200,
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Ambatthur', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'USA', Freight: 120.38, Verified: !0 });
    };
    
    document.getElementById('updatecell').onclick = () => {
    grid.setCellValue((grid.currentViewData[0] as any).OrderID,'CustomerID','John');
};


//Cancel edit based on condition
function actionBegin(args : any) {
if (args.requestType == 'beginEdit') {
    if (args.rowData['CustomerID'].toLowerCase() == "vinet") {
    args.cancel = true;
    }
}
if (args.requestType == 'delete') {
    if (args.data[0]['CustomerID'].toLowerCase() == "vinet") {
    args.cancel = true;
    }
}
if (args.requestType == 'add') {
    if (!isAddable) {
    args.cancel = true;
    }
}
}

var button = document.createElement('button');
button.innerText = 'Grid is Addable';
document.body.insertBefore(button, document.body.children[0])
button.addEventListener('click', btnClick.bind(this));

function btnClick(args : any) {
args.target.innerText == 'Grid is Addable' ? (args.target.innerText = 'Grid is Not Addable') : (args.target.innerText = 'Grid is Addable');
isAddable = !isAddable;
}

//Move the focus to a particular cell instead of first cell while editing a row
var fieldName: any;
function recordDoubleClick(e: any) {
  var clickedColumnIndex = e.cell.getAttribute("data-colindex");
  fieldName = this.columnModel[parseInt(clickedColumnIndex)].field;
}

function actionComplete(e: any) {
  if (e.requestType === "beginEdit") {
    // focus the column
    e.form.elements[grid.element.getAttribute("id") + fieldName].focus();
  }
}