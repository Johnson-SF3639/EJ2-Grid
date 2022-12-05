import { Grid, DetailRow, Toolbar, ColumnChooser, ColumnMenu, Resize, Sort, Group, Filter, Page} from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { employeeData } from './employeeData';
import { Button } from '@syncfusion/ej2-buttons';
import { ContextMenuModel , MenuItemModel, ContextMenu } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
// To Initialize ContextMenu component.

let menuItems: MenuItemModel[] = [
{
    text: 'New',
    items: [
        {
        text: 'Sub 1',
        },
        {
        text: 'Sub 2',
        }
    ]
},
{
    text: 'Refresh'
},
{
    text: 'Display Settings'
},
{
    text: 'Personalize'
}];

let menuOptions: ContextMenuModel = {
    target: '#target',
    items: menuItems
};

let menuObj: ContextMenu = new ContextMenu(menuOptions, '#contextmenu');

Grid.Inject(DetailRow, ColumnChooser, Toolbar, ColumnMenu, Resize, Sort, Group, Filter, Page);

let grid: Grid = new Grid({
    dataSource: employeeData,

    allowGrouping: true,
    allowSorting: true,
    allowFiltering: true,
    filterSettings: { type: 'CheckBox' },
    allowPaging: true,
    groupSettings: { showGroupedColumn: true },
    showColumnMenu: true,

    //Selection
    allowSelection: true,
    selectionSettings: { type: 'Multiple' },

    //Column Chooser Setting
    showColumnChooser: true,
    toolbar: ['ColumnChooser'],

    // clipMode: 'Ellipsis',     ***Default value***
    // clipMode: 'Clip',
    clipMode: 'EllipsisWithTooltip',

    columns: [
        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 120,  hideAtMedia: '(min-width: 700px)'},
        { field: 'FirstName', headerText: 'First Name', width: 150 },
        { field: 'City', headerText: 'City', width: 150,  hideAtMedia: '(min-width: 700px)'},
        { field: 'Country', headerText: 'Country', width: 150 }
    ],
    childGrid: {
        dataSource: data,
        queryString: 'EmployeeID',
        columns: [
            { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
            { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
            { field: 'ShipCity', headerText: 'Ship City', width: 150 },
            { field: 'ShipName', headerText: 'Ship Name', width: 150 }
        ],
    },
});
grid.appendTo('#Grid');

let copyBtn: Button = new Button( {cssClass:'e-primary'} );
copyBtn.appendTo('#copy');

document.getElementById('copy').addEventListener('click', () => {
    grid.copy();
});

let copyHeaderBtn: Button = new Button();
copyHeaderBtn.appendTo('#copyHeader');

document.getElementById('copyHeader').addEventListener('click', () => {
    grid.copy(true);
});