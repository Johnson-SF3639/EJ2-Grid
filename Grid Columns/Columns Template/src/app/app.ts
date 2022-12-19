import { Grid, Page, Sort, Group, QueryCellInfoEventArgs, RecordClickEventArgs } from '@syncfusion/ej2-grids';
import { data, employeeData} from './datasource';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { closest } from '@syncfusion/ej2-base';

Grid.Inject(Page, Sort, Group);


//Render other components in a column
let grid: Grid = new Grid({
    dataSource: employeeData,
    columns: [
        { headerText: 'Employee Image', textAlign: 'Center', template: '#template', width: 150 }, 
        { headerText: 'Order Status', template:
            `<div>
                <select class="e-control e-dropdownlist">
                    <option value="1" selected="selected">Order Placed</option>
                    <option value="2">Processing</option>
                    <option value="3">Delivered</option>
                </select>
            </div>`, width: 140
        },
        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 125 },
        { field: 'FirstName', headerText: 'Name', width: 120 },
        { field: 'Title', headerText: 'Title', width: 170 },
        { headerText: 'Discontinued', textAlign: 'Center', template: '#Discontinued', width: 150 }, 
        { headerText: 'Employee Data', textAlign: 'Right', template: '#Details', width: 150, isPrimaryKey: true },
    ],
    allowSorting: true,
    allowPaging: true,
    allowGrouping: true,
    pageSettings:{ pageSize:5 },
    queryCellInfo: dropdown,

    recordClick: (args: RecordClickEventArgs) => {
        if (args.target.classList.contains('empData')) {
            var rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
            console.log(rowObj);
        }
    }
});
grid.appendTo('#Grid');


function dropdown(args: QueryCellInfoEventArgs): void {
    let ele: HTMLSelectElement = args.cell.querySelector('select');
    let drop: DropDownList = new DropDownList({ popupHeight: 150, popupWidth: 150 });
    drop.appendTo(ele);
}
