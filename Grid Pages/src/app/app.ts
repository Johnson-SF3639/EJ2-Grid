import { Grid, Page, PageEventArgs, Toolbar} from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

Grid.Inject(Page, Toolbar);

// Paging with load
let grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 130 },
        { field: 'ShipCity', headerText: 'Ship City', width: 140 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 335,
    load: () => {
        let rowHeight: number = grid.getRowHeight();  //height of the each row
        let gridHeight: any = grid.height;  //grid height
        let pageSize: number = grid.pageSettings.pageSize;   //initial page size
        let pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; //new page size is obtained here
        grid.pageSettings.pageSize = pageSize + Math.round(pageResize);
    }
});
grid.appendTo('#Grid');


// Template Paging
let updateTemplate: Function = () => {
    let numeric: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 3,
        step: 1,
        format: '###.##',
        change: (args) => {
            let value: number = args.value;
            tGrid.goToPage(value);
        }
    });
    numeric.appendTo('#currentPage');
};
let flag: boolean = true;
let tGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    pageSettings: { template: '#template', pageSize: 7 },
    dataBound: () => {
        if (flag) {
            flag = false;
            updateTemplate();
        }
    },
    actionComplete: (args: PageEventArgs) => {
        if (args.requestType === 'paging') {
            updateTemplate();
        }
    }
});
tGrid.appendTo('#TGrid');


// Pager with Page Size Dropdown
let pGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    pageSettings: { pageSizes: true, pageSize: 8 }
});
pGrid.appendTo('#PGrid');


//How to render Pager at the Top of the Grid
// let initialGridLoad: boolean = true;
// let rGrid: Grid = new Grid({
//     dataSource: data,
//     allowPaging: true,
//     toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
//     columns: [
//         { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
//         { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
//         { field: 'ShipCity', headerText: 'Ship City', width: 150 },
//         { field: 'ShipName', headerText: 'Ship Name', width: 150 }
//     ],
//     pageSettings: { pageSizes: true, pageSize: 9 }
// });
// rGrid.appendTo('#RGrid');

// rGrid.dataBound = () =>{
//     if (initialGridLoad) {
//         initialGridLoad = false;
//         var pager = document.getElementsByClassName('e-gridpager');
//         var topElement;
//         if (rGrid.allowGrouping || rGrid.toolbar) {
//             topElement = rGrid.allowGrouping ? document.getElementsByClassName('e-groupdroparea') :
//                 document.getElementsByClassName('e-toolbar');
//         } else {
//             topElement = document.getElementsByClassName('e-gridheader');
//         }
//         rGrid.element.insertBefore(pager[0], topElement[0]);
//     }
// };