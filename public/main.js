function deleteExpense(button) {
  const expenseId = button.getAttribute('data-expenseId');

  axios.delete(`/expense/delete-expense/${expenseId}`)
    .then(response => {
      console.log(response.data);
      button.parentElement.parentElement.remove();
    })
    .catch(error => {
      console.error(error);
    });
}

function editExpense(expenseId) {
  // Fetch expense details from the server
  axios.get(`/expense/${expenseId}`)
    .then(response => {
      const expense = response.data;

      // Populate expense details in an editable form
      let amount = document.getElementById(`amount-edit`);
      let type = document.getElementById(`type-edit`);
      let date = document.getElementById(`date-edit`);
      amount.value = expense.amount;
      type.value = expense.type;
      date.value = expense.date;

      // Assign expenseId to the "data-expenseId" attribute of the update button
      const updateButton = document.getElementById(`submit-edit`);
      updateButton.setAttribute('data-expenseId', expenseId);

      // Show the edit form
      const editForm = document.getElementById(`edit-form-${expenseId}`);
      editForm.style.display = "block";
    })
    .catch(error => {
      console.error(error);
    });
}

document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the form data
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;

  const formData = {
    amount: amount,
    type: type,
    date: date
  }

  // Make a POST request to the server
  axios.post('/expense/add-expense', formData)
    .then(function(response) {
      // Handle the successful response
      console.log(response.data);
      // Perform any additional actions or display a success message
    })
    .catch(function(error) {
      // Handle the error
      console.error(error);
      // Display an error message to the user
    });
});

document.getElementById('submit-edit').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the updated expense data from the form fields
  const expenseId = document.getElementById('submit-edit').getAttribute('data-expenseId');
  const updatedExpense = {
    amount: document.getElementById(`amount-edit`).value,
    type: document.getElementById(`type-edit`).value,
    date: document.getElementById(`date-edit`).value
  };

  // Make a PUT request to update the expense data
  axios.put(`/expense/update-expense/${expenseId}`, updatedExpense)
    .then(response => {
      console.log(response.data);
      location.reload();
    })
    .catch(error => {
      console.error(error);
    });
});
