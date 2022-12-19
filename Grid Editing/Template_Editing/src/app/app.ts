import { Grid, Edit, Toolbar, DialogEditEventArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { DataUtil } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

Grid.Inject(Edit, Toolbar);

let countryData: {}[] = DataUtil.distinct(data, 'ShipCountry', true);

// let grid: Grid = new Grid({
//     dataSource: data,
//     toolbar: ['Add', 'Edit', 'Delete'],
//     editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: '#dialogtemplate' },
//     columns: [
//         { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true },
//         { field: 'CustomerID', headerText: 'Customer ID', width: 120, },
//         { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
//     ],
//     height: 265,

//     actionBegin: (args: any) => {
//         if (args.requestType === 'save') {
//             args.data['Freight'] = parseFloat(args.form.querySelector("#Freight").value);
//         }
//     },

//     actionComplete: (args: DialogEditEventArgs) => {
//         if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

//             args.form.ej2_instances[0].addRules('Freight', {max: 500});

//             new DropDownList({value: args.rowData['ShipCountry'], popupHeight: '200px', floatLabelType: 'Always',
//                 dataSource: countryData, fields: {text: 'ShipCountry', value: 'ShipCountry'}, placeholder: 'Ship Country'}, args.form.elements.namedItem('ShipCountry') as HTMLInputElement);
            
//             new CheckBox({ label: 'Verified', checked: args.rowData['Verified'] }, args.form.elements.namedItem('Verified') as HTMLInputElement);
            
//             new NumericTextBox({value: args.rowData['Freight'], format: 'C2', placeholder: 'Freight', floatLabelType: 'Always' }, args.form.elements.namedItem('Freight') as HTMLInputElement );

//             if (args.requestType === 'beginEdit') {
//                 (args.form.elements.namedItem('CustomerID')as HTMLInputElement).focus();
//             }
//         }
//     }

// });
// grid.appendTo('#Grid');



let grid: Grid = new Grid({
    dataSource: data,
    toolbar: ['Add', 'Edit', 'Delete'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: '#dialogtemplate' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true, validationRules: { required: true } },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120, validationRules: { required: true } },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
    ],
    height: 265,
    actionComplete: (args: DialogEditEventArgs) => {
        let tabObj: Tab
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {

                tabObj = new Tab({
                showCloseButton: false,
                selecting:  (e) => {if(e.isSwiped) {e.cancel = true;} if(e.selectingIndex === 1) {e.cancel = !validate(1)}},
                items: [
                    { header: { 'text': 'Details' }, content: '#tab1' },
                    { header: { 'text': 'Verify' }, content: '#tab2' },
                ]
            });
            tabObj.appendTo('#edittab');

            new DropDownList({value: args.rowData['ShipCountry'], popupHeight: '200px', floatLabelType: 'Always',
                dataSource: countryData, fields: {text: 'ShipCountry', value: 'ShipCountry'}, placeholder: 'Ship Country'}, args.form.elements.namedItem('ShipCountry') as HTMLInputElement);

            new CheckBox({ label: 'Verified', checked: args.rowData['Verified'] }, args.form.elements.namedItem('Verified') as HTMLInputElement);

            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('CustomerID')as HTMLInputElement).focus();
            }

            document.getElementById('next').onclick = () => {
                moveNext();
            }

            document.getElementById('submit').onclick = () => {
                if (validate(2)) {
                    grid.endEdit();
                }
            }
        }
        function validate(tab: any){
            let valid: boolean = true;
             [].slice.call(document.getElementById('tab' + tab).querySelectorAll('[name]')).forEach((element : any)=> {
                element.form.ej2_instances[0].validate(element.name);
                if (element.getAttribute('aria-invalid') === 'true'){
                    valid = false;
                }
            });
            if (!valid) {
            return false;
            }
            return true;
        }

        function moveNext() {
            if (validate(1)) {
                tabObj.select(1);
            }
        }
    }
});
grid.appendTo('#Grid');