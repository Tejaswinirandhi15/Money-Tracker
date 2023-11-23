document.addEventListener("DOMContentLoaded", function () {
  loadTransactions();
});

function submitTransaction() {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (description && amount && type) {
      const transaction = {
          description,
          amount,
          type,
      };

      // Assuming you have an API endpoint to handle transactions
      fetch("/api/transactions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
      })
      .then(response => response.json())
      .then(data => {
          // Assuming your API returns the updated transaction list
          displayTransactions(data);
      })
      .catch(error => console.error("Error:", error));
  }
}

function loadTransactions() {
  // Assuming you have an API endpoint to fetch transactions
  fetch("/api/transactions")
      .then(response => response.json())
      .then(data => {
          displayTransactions(data);
      })
      .catch(error => console.error("Error:", error));
}

function displayTransactions(transactions) {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";

  transactions.forEach(transaction => {
      const transactionElement = document.createElement("div");
      transactionElement.className = transaction.type;
      transactionElement.innerHTML = <strong>${transaction.description}</strong>: ${transaction.amount};
      transactionList.appendChild(transactionElement);
  });
}