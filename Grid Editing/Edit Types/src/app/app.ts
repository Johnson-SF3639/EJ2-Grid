import { Grid, Edit, Toolbar, EJ2Intance } from '@syncfusion/ej2-grids';
import { Query } from '@syncfusion/ej2-data';
import { data } from './datasource';

Grid.Inject(Edit, Toolbar);

let grid: Grid = new Grid({
dataSource: data,
toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
columns: [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    
    //Date
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 120, format: { type:'date', format:'dd.MM.yyyy' } ,editType: 'datepickeredit', edit: { params: { format:'dd.MM.yy' }  } },
    
    //numeric Edit
    { field: 'DeciFreight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit', width: 120, format: 'C2', edit: { params: { decimals: 2, value: 5 } } },
    
    //Integer edit
    { field: 'Freight', headerText: 'Without Decimal', textAlign: 'Right', editType: 'numericedit', width: 120, edit: {
        params: {
            validateDecimalOnType: true,
            decimals: 0,
            format: "N"
        }
    } },

    //Dropdown 
    { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150},

    //Dropdown Search
    { field: 'ShipCountry', headerText: 'Drop down Search', editType: 'dropdownedit', width: 150, edit: {
        params: {
            query: new Query(),
            dataSource: data as any,
            fields: { value: 'ShipCountry', text: 'ShipCountry' },
            allowFiltering: true
        }
    }},

    //Open popup while focusing the edit dropdown list
    { field: 'ShipCountry', headerText: 'Focus Dropdown',  edit: { params: { focus: ddFocus } }, editType: 'dropdownedit', width: 150 },
    
    //Check box
    { field: 'Verified', displayAsCheckBox: true,editType: "booleanedit", textAlign: 'Center',width: 100,  edit: { params: { checked: true} }}
],
height: 265
});

function ddFocus(e: {event: MouseEvent | KeyboardEvent | TouchEvent}): void {
    ((e.event.target as HTMLElement).querySelector('.e-dropdownlist') as EJ2Intance).ej2_instances[0].showPopup();
}

grid.appendTo('#Grid');