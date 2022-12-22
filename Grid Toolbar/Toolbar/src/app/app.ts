
import { Grid, Toolbar, Group } from '@syncfusion/ej2-grids';
import { Button } from '@syncfusion/ej2-buttons';
import { data } from './datasource';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Toolbar, Group);


//Enable or disable toolbar items
let grid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Expand', 'Collapse'],
    allowGrouping: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180,
    toolbarClick: clickHandler
});
grid.appendTo('#Grid');

let enable: Button = new Button({}, '#enable');
let disable: Button = new Button({}, '#disable');

enable.element.onclick = () => {
    grid.toolbarModule.enableItems(['Grid_Collapse', 'Grid_Expand'], true);// enable toolbar items.
};

disable.element.onclick = () => {
    grid.toolbarModule.enableItems(['Grid_Collapse', 'Grid_Expand'], false);// disable toolbar items.
};

function clickHandler(args: ClickEventArgs): void {
    console.log("args.item.id value is : ",args.item.id);
    if (args.item.id === 'Grid_Collapse') { // grid_Collapse is component id + '_' + toolbar item name.
        grid.groupModule.collapseAll();
    }
    if (args.item.id === 'Grid_Expand') {
        grid.groupModule.expandAll();
    }
}



//Add toolbar at the bottom of Grid
let btgrid: Grid = new Grid({
    dataSource: data.slice(0,8),
    toolbar: ['Print', 'Search'],
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, format: 'yMd' }
    ],
    height: 180,
    created: () => {
    let toolbar: HTMLElement = btgrid.element.querySelector('.e-toolbar');
    btgrid.element.appendChild(toolbar);
  }
});
btgrid.appendTo('#BottomToolbarGrid');