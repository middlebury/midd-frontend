import { $, $$, on } from './utils/dom';

// Toggles address form fields in enquiry form on Schools Abroad 
// homepage when select element associated with #midd_sa_viewbook 
// is toggled.

const formField = $('#midd_sa_viewbook');

if(formField) {
  const toggleFields =  $$('.js-form-field-toggle');

  on(formField, 'change', (event) => {
    if(event.target.value == '1436321' || event.target.value == '') {
      toggleFields.forEach(el => {
        el.style.display = 'none';
      });
    } else if(event.target.value == '1436319') {
      toggleFields.forEach(el => {
        el.style.display = 'flex';
      });
    };
  })
}