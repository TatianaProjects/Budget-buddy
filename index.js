const button = document.querySelector("#btn");
const remainingBlock = document.querySelector("#remainingBlock");

button.addEventListener("click", calculateBudget);



function calculateBudget (e) {
    e.preventDefault();

    remainingBlock.classList.remove("placeholder");
    
    const income = parseFloat(document.querySelector("#income").value);
    const rent = parseFloat(document.querySelector("#rent").value);
    const utilities = parseFloat(document.querySelector("#utilities").value);
    const groceries = parseFloat(document.querySelector("#groceries").value);
    const entertainment = parseFloat(document.querySelector("#entertainment").value);

    if (isNaN(income) || income <= 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter a valid income",
    });
    return;
    }
    const totalExpenses = (rent || 0) + (utilities || 0) + (groceries || 0) + (entertainment || 0);
    const remaining = income - totalExpenses;    
    const spentPercent = (totalExpenses / income) * 100;

   let statusText = "";

  if (spentPercent < 50) {
    statusText = "Budget under control ✔ ";
  } else if (spentPercent < 80) {
    statusText = "Watch your spending ⚠" ;
  }
  else{
    statusText = "Over budget ✖";
  }

  if (remaining >= 0) {
    remainingBlock.classList.remove("negative");
    remainingBlock.classList.add("positive");

    remainingBlock.innerHTML = `
    <p>Money Left This Month 💰</p>
    <span class="amount">$${remaining.toFixed(2)}</span>
    <p class="percent">Expenses: ${spentPercent.toFixed(1)}%</p>
    <p class="status">${statusText}</p>
    `;
  } 
  else {
    remainingBlock.classList.remove("positive");
    remainingBlock.classList.add("negative");

    remainingBlock.innerHTML = `
      <p>Overspent This Month 😬</p>
      <p class="percent">Expenses: ${spentPercent}%</p>
      <p class="status">${statusText}</p>`
    ;
  }
}
