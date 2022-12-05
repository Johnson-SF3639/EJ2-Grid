import { Grid, Page, Aggregate, ExcelExport, Toolbar, Filter, Group, Sort, PdfExport, Reorder, Resize, RowDD, Selection } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page, Aggregate, Toolbar, ExcelExport, Filter, Group, Sort, PdfExport, Reorder, Resize, RowDD, Selection );

let grid: Grid = new Grid({
    //Data Source
    dataSource: data,
    
    toolbar: ['ExcelExport', 'PdfExport'],

    //Allow ExcelExport
    allowExcelExport: true,
    
    //Allow PDF Export
    allowPdfExport: true,

    //Allow Page
    allowPaging: true,
    pageSettings:{ pageSize:7 },

    //Allow Filter
    allowFiltering: true,

    //Allow Grouping
    allowGrouping: true,

    //Allow Sorting
    allowSorting: true,
    allowMultiSorting: true,

    //Allow Reorder
    allowReordering: true,

    //Allow Resize
    allowResizing: true,

    //Allow Row Dragon Drop
    allowRowDragAndDrop: true,

    //allowSelection  (Default value = true)
    allowSelection: true,   

    //Allow Keyboard  (Default value = true)
    allowKeyboard: true,  
    
    //Allow TextWrap
    allowTextWrap: true,

    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 100, headerText: 'Customer ID', type: 'string'},
        { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' }
    ],

    // aggregates property
    aggregates: [{
        columns:[
            {type:'Sum', field: 'Freight', format: 'C2', footerTemplate: 'Sum: ${Sum}'  }
        ]
    }],
});

// excelExport
grid.toolbarClick = (args: Object) => {
    if (args['item'].id === 'Grid_excelexport') {
        grid.excelExport();
    }
}

// PDF Export
grid.toolbarClick = (args: Object) => {
    if (args['item'].id === 'Grid_pdfexport') {
        grid.pdfExport();
    }
}

grid.appendTo('#Grid');