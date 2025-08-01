function isEmpty(inputStr) {
  if (inputStr == null || inputStr == '') return true;
  return false;
}

function validateNumber(formObj, label) {
  var aFloat = parseFloat(formObj.value);
  if (
    isNaN(aFloat) ||
    isEmpty(formObj.value) ||
    formObj.value.indexOf(',') != -1 ||
    aFloat < 0
  ) {
    alert(
      'Please enter a valid amount for ' +
        label +
        ' that is not a letter or symbol.'
    );
    formObj.focus();
    formObj.select();
    return false;
  }
  return true;
}

function CalculateTotals(form) {
  let annualTotalCharges = 0;
  let annualTotalCredits = 0;

  //loop over all of the tables for quarter/semester/annual
  //find and sum all class="charge" inputs
  //find and sum all class="credit" inputs
  //find the input named totCost1 and put sum of charges in it
  //find the input named totAid1 and put sum of credits in it
  //add the sum of charges to annualTotalCharges
  //add the sum of credits to annualTotalCredits
  //find the Annual Budgeted Amount and put (annualTotalCharges - annualTotalCredits) in it
  // console.log(form)
  let tables = form.querySelectorAll('.term');
  // console.log(tables)
  for (let i = 0; i < tables.length; i++) {
    let totalCharges = 0;
    let charges = tables[i].querySelectorAll('.charge');
    // console.log("charges: ", charges)
    for (let j = 0; j < charges.length; j++) {
      // console.log(charges[j], charges[j].value, parseInt(charges[j].value) || 0, totalCharges)
      totalCharges += parseInt(charges[j].value) || 0;
    }
    let totCost1 = tables[i].querySelectorAll('[name=totCost1]');
    totCost1[0].value = totalCharges;
    // console.log("totCost1: ", totalCharges)
    annualTotalCharges += parseInt(totalCharges);

    let totalCredits = 0;
    let credits = tables[i].querySelectorAll('.credit');
    for (let q = 0; q < credits.length; q++) {
      // console.log(totalCredits, credits[q], credits[q].value)
      totalCredits += parseInt(credits[q].value);
    }
    let totAid1 = tables[i].querySelectorAll('[name=totAid1]');
    // console.log(tables[i], totAid1)
    totAid1[0].value = totalCredits;
    // console.log("totAid1", totalCredits)
    annualTotalCredits += parseInt(totalCredits);
  }

  // console.log(annualTotalCharges - annualTotalCredits, 'annualdue')
  let annualDue = form.querySelectorAll('[name=annualContribution]');
  if (annualTotalCharges - annualTotalCredits < 0) {
    annualDue[0].value = 0;
    alert(
      'If your total credits are greater than your total charges, you have no annual charges due.'
    );
  } else {
    annualDue[0].value = annualTotalCharges - annualTotalCredits;
    // console.log('due', annualDue[0].value)
  }
}
