
import { Grid, Aggregate, Page, Group, Edit, Toolbar} from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';

Grid.Inject(Aggregate, Page, Group, Toolbar, Edit);

//Footer Aggregate and how to format aggregate value
let grid: Grid = new Grid({
    dataSource: data,
    columns: [ { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID',  textAlign: 'Center', width: 150 },
        { field: 'Freight', headerText: 'Freight', width: 150 } ],
    height: 210,
    aggregates: [
        { columns: [{ type: 'Max', field: 'OrderID', footerTemplate: 'Max: ${Max}'}, { type: 'Sum', field: 'Freight', footerTemplate: 'Sum: ${Sum}' }] },
    ]
});
grid.appendTo('#Grid');


//How to place aggregates on top of the Grid
let topGrid: Grid = new Grid({
    dataSource: data,
    dataBound:dataBound,
    allowPaging: true,
    columns: [ { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID',  textAlign: 'Center', width: 150 },
        { field: 'Freight', headerText: 'Freight', width: 150 } ],
    height: 210,
    aggregates: [
        { columns: [{ type: 'Max', field: 'OrderID', footerTemplate: 'Max: ${Max}'}, { type: 'Sum', field: 'Freight', footerTemplate: 'Sum: ${Sum}' }] },
        { columns: [{ type: 'Max', field: 'Freight', format: 'C2',  footerTemplate: 'Max: ${Max}' }] },
    ]
});
topGrid.appendTo('#TopGrid');

function dataBound() {
    topGrid.getHeaderContent().append(topGrid.getFooterContent());
}


//Group and Caption Aggregate
let groupCapGrid: Grid = new Grid({
    dataSource: data,
    allowGrouping: true,
    groupSettings: { showDropArea: false, columns: ['ShipCountry'] },
    columns: [ 
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'OrderDate', headerText: 'Order Date', width: 120, format: 'yMd' },
        { field: 'Freight', headerText: 'Freight', width: 150, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
    ],
    height: 310,
    aggregates: [
        { columns: [{ type: 'Sum', field: 'Freight', format: 'C2', groupFooterTemplate: 'Sum: ${Sum}' }] },
        { columns: [{ type: 'Max', field: 'Freight', format: 'C2', groupCaptionTemplate: 'Max: ${Max}' }] }
    ]
});
groupCapGrid.appendTo('#GroupCapGrid');


//Custom Aggregate in JavaScript Grid control
let customAggregateFn = (data: Object, aggColumn: Object) => data['result'].filter((item: Object) => item[aggColumn['columnName']] === 'Brazil').length;

let cGrid: Grid = new Grid({
dataSource: data,
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 150, format: 'C2' },
    { field: 'ShipCountry', headerText: 'Ship Name', width: 150 }
],
height: 268,
aggregates: [{
    columns: [{
        type: 'Custom',
        customAggregate: customAggregateFn,
        columnName: 'ShipCountry',
        footerTemplate: 'Brazil Count: ${Custom}'
    }]
}]
});
cGrid.appendTo('#CustomGrid');



//Show the count of distinct values in aggregate row
let customAggregateFunction = function() {
    let results = new DataManager(this.currentViewData).executeLocal(new Query().select(['ShipCountry']));    
    let distinct = DataUtil.distinct(results, 'ShipCountry', true);
    return distinct.length;
}    
let uGrid: Grid = new Grid({
dataSource: data,
allowPaging: true,
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
    { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
    { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C2' },
    { field: "ShipCountry", headerText: "Ship Country", width: 150 }
],
height: 220,
    aggregates: [{
    columns: [{
        type: 'Custom',
        customAggregate: customAggregateFunction,
        columnName: 'ShipCountry',
        footerTemplate: 'Distinct Count: ${Custom}'
    }]
}]
});
uGrid.appendTo('#UniqueDataGrid');


//Auto update aggregate value in batch editing
let bGrid: Grid = new Grid({
    dataSource: data,
    allowPaging:true,
    pageSettings:{pageSize:6},
    toolbar: ['Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowDeleting: true, mode: 'Batch' },
    allowGrouping: true,
    groupSettings: { showDropArea: false, columns: ['ShipCountry'] },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', isPrimaryKey:true, textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'Freight', headerText: 'Freight', width: 150, format: 'C2' },
        { field: 'ShipCountry', headerText: 'Ship Name', width: 150 }
    ],
    height: 268,
    aggregates: [
    { columns: [{ type:'Sum', field:'Freight', format:'C2', footerTemplate:'Sum : ${Sum}'}] },
    { columns:[{ type:'Average', field:'Freight', format:'C2', groupCaptionTemplate:'Average : ${Average}'}] },
    { columns:[{ type:'Sum', field:'Freight', format:'C2', groupFooterTemplate:'Sum : ${Sum}'}] }
    ]
});
bGrid.appendTo('#BatchGrid');


//Refresh aggregate values in inline editing
let selectedRecord : Object = {};
let iGrid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowDeleting: true, mode: 'Normal' },
    actionBegin:(args:any)=>{
        if(args.requestType === 'beginEdit'){
           selectedRecord ={};
           selectedRecord = args.rowData;
        };
    },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', isPrimaryKey:true, textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'Freight', headerText: 'Freight', editType: 'numericedit', format: 'C2', width: 150, edit: { params: { change: (args :any) => {
            let gridObj = document.getElementById('Grid')['ej2_instances'][0];
            selectedRecord['Freight'] = args.value; // Set the edited value to aggregate column
            gridObj.aggregateModule.refresh(selectedRecord) // Refresh aggregates using edited data
            }
        }}},
        { field: 'ShipCountry', headerText: 'Ship Name', width: 150 }
    ],
    height: 268,
    aggregates: [ 
        { columns:[{ type:'Sum', field:'Freight', format:'C2', footerTemplate:'Sum : ${Sum}' }] }
    ]
});
iGrid.appendTo('#InlineGrid');