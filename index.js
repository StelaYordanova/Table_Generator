import TableMaker from "./tableMaker.js";
import Edit from "./editWindow.js";

const tableContainer = document.querySelector('#table-content');
const editContainer = document.querySelector('.edit-window');
let edit = new Edit(editContainer);

fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
  .then(response => response.json())
  .then(json => new TableMaker(json, tableContainer, rowClick(edit, json)))


  function generateFormFromObject(obj, index){
    const form = document.createElement('form');
    form.setAttribute('row-index', index)

    for(let key in obj){
        const formGroup = document.createElement('div');
        
        let keyArr = Array.from(key).toString().split(",").join(" ").replace(/\s+/g,'');
        const UID = `edit_${keyArr}`;
        const label = document.createElement('label');
        const input = document.createElement('input');
        

        label.for = UID;
        label.textContent = key;

        input.name = key;
        input.type = 'text';
        input.id = UID;
        input.value = obj[key];

        formGroup.append(label);
        formGroup.append(input);
        form.append(formGroup);


    }
    return form;

  }

  function updateAndSave(e) {
    const editBody = edit.getEditBody();
    const form = editBody.querySelector('form');
    const rowIndex = form.getAttribute('row-index');
    const tr = tableContainer.querySelector(`tr[data-index="${rowIndex}"]`);
    const cells = Array.from(tr.querySelectorAll('td'));

    cells.forEach(cell => {
      let selector = `#edit_${cell.getAttribute('data-key')}`;
      let input = form.querySelector(selector);
      cell.textContent = input.value;
    })

    this.removeEventListener('click', updateAndSave)
    edit.hide()
  }

  function rowClick(edit, data) {
    return function(e) {
        const {target} = e;
        const tr = target.nodeName === 'TR' ? target : target.closest('tr');
    
        if(!tr)
            return;

            let index = tr.dataset.index;
            let dataObj = data[index];
            const form = generateFormFromObject(dataObj, index);
            edit.setEditBody(form);
            edit.show();
            const editFooter = edit.getEditFooter();
            const btnSave = editFooter.querySelector('.save-btn');
            const btnClose = editFooter.querySelector('.close-btn');
            btnClose.addEventListener('click', edit.hide);
            btnSave.addEventListener('click', updateAndSave);
            console.log(editFooter);
      }
  }
