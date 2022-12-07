import { Grid, Sort, SortEventArgs} from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Sort);

// The custom function
let sortComparer: (reference: string, comparer:  string) => number = (reference: string, comparer:  string) => {
    if (reference < comparer) {
        return -1;
    }
    if (reference > comparer) {
        return 1;
    }
    return 0;
};

let grid: Grid = new Grid({
    dataSource: data,
    //sort
    allowSorting: true,

    //Initial sort
    sortSettings: { columns: [{ field: 'OrderID', direction: 'Ascending' }, { field: 'ShipCity', direction: 'Descending' }] },

    //Multi-column sorting
    allowMultiSorting: true,

    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
        { field: 'CustomerID', sortComparer: sortComparer ,headerText: 'Customer ID', width: 150 },
        { field: 'ShipCity', headerText: 'Ship City', width: 150 },
        { field: 'ShipName', headerText: 'Ship Name', width: 150 }
    ],
    height: 315,
    actionBegin: actionHandler,
    actionComplete: actionHandler
});

grid.appendTo('#Grid');

//custom Action
function actionHandler(args: SortEventArgs) {
    alert(args.requestType + ' ' + args.type); 
}
