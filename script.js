document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  if (validateForm(this)) {
    processData(this);
  }
});

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });
  const phoneNumberInput = form.querySelector('#phoneNumber');
  const phoneNumber = phoneNumberInput.value.trim();
  const phoneNumberRegex = /^(03[0-9]{2}-[0-9]{7}|03[0-9]{9})$/; 
  if (!phoneNumberRegex.test(phoneNumber)) {
    isValid = false;
    phoneNumberInput.classList.add('error');
  } else {
    phoneNumberInput.classList.remove('error');
  }

  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  let checkboxesChecked = false;
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkboxesChecked = true;
    }
  });

  if (!checkboxesChecked) {
    isValid = false;
    document.getElementById('errorMsg').textContent = 'Please agree to the terms and conditions and acknowledge the privacy policy.';
  } else {
    document.getElementById('errorMsg').textContent = '';
  }

  return isValid;
}

function processData(form) {
  const formData = new FormData(form);
  let processedData = {};

  for (let pair of formData.entries()) {
    processedData[pair[0]] = pair[1];
  }
  console.log(processedData);
  submittedApplications.push(processedData);
  form.reset();
}

document.getElementById('viewApplicationsButton').addEventListener('click', function() {
  displayApplicationsAsTable();
});

function displayApplicationsAsTable() {
  const tableContainer = document.getElementById('applicationsTableContainer');

  if (submittedApplications.length === 0) {
    tableContainer.innerHTML = '<p>No applications submitted yet.</p>';
    return;
  }

  let tableHTML = '<h2>Applications</h2><table>';
  tableHTML += '<tr>';
  for (let key in submittedApplications[0]) {
    tableHTML += `<th>${key}</th>`;
  }
  tableHTML += '</tr>';

  submittedApplications.forEach(application => {
    tableHTML += '<tr>';
    for (let key in application) {
      if (key === 'resume' && application[key] instanceof File) {
        tableHTML += `<td><pre>${application[key].name}</pre></td>`;
      } else {
        tableHTML += `<td><pre>${application[key]}</pre></td>`;
      }
    }
    tableHTML += '</tr>';
  });

  tableHTML += '</table>';
  tableContainer.innerHTML = tableHTML;
}

const submittedApplications = [];
