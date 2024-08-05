let transactions = [];

document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
    displayTransactions();
    document.getElementById('transaction-form').addEventListener('submit', addTransaction);
});

function addTransaction(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        amount,
        date,
        category,
        description
    };
    transactions.push(transaction);
    updateSummary();
    displayTransactions();
    document.getElementById('transaction-form').reset();
}

function updateSummary() {
    const totalIncome = transactions.filter(t => t.category === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.category === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const savings = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('savings').textContent = savings.toFixed(2);
}

function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'transaction-item';
        listItem.innerHTML = `
            <div>
                <strong>${transaction.date}</strong> - ${transaction.description} ($${transaction.amount.toFixed(2)})
            </div>
            <div>
                <button onclick="editTransaction(${index})">Edit</button>
                <button onclick="deleteTransaction(${index})">Delete</button>
            </div>
        `;
        transactionList.appendChild(listItem);
    });
}

function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('date').value = transaction.date;
    document.getElementById('category').value = transaction.category;
    document.getElementById('description').value = transaction.description;
    transactions.splice(index, 1);
    updateSummary();
    displayTransactions();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateSummary();
    displayTransactions();
}
