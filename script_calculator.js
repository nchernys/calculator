let optionMenu = document.querySelector(".compounded_select");
let sBtn_text = document.querySelector(".sBtn_text");
let selectBtn = document.querySelector(".compounded_btn");
let options = document.querySelectorAll(".option");
let options_box = document.querySelector(".options");

selectBtn.addEventListener("click", () => {
  options_box.classList.add("active");
});

options.forEach((options) => {
  options.addEventListener("click", () => {
    let selectedOption = options.querySelector(".option_text").innerText;
    sBtn_text.innerText = selectedOption;
    options_box.classList.remove("active");
  });
});

function noCommas(num) {
  return num.replace(/[,]/g, "");
}

function withCommas(input) {
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let current_investment = document.getElementById("current_investment");
current_investment.addEventListener("input", () => {
  let no_commas = noCommas(current_investment.value);
  let with_commas = withCommas(no_commas);
  current_investment.value = with_commas;
});

let monthly_deposits = document.getElementById("monthly_deposits");
monthly_deposits.addEventListener("input", () => {
  let no_commas = noCommas(monthly_deposits.value);
  let with_commas = withCommas(no_commas);
  monthly_deposits.value = with_commas;
});

function total() {
  let cur_inv = document.getElementById("current_investment").value;
  cur_inv = noCommas(cur_inv);
  let deposits = document.getElementById("monthly_deposits").value;
  deposits = noCommas(deposits);
  let months = document.getElementById("period_months").value;
  let rateofreturn = document.getElementById("rate_of_return").value;
  let compounded = document.querySelector(".sBtn_text").innerText;

  if (compounded == "annually") {
    compounded = 1;
  } else if (compounded == "quaterly") {
    compounded = 4;
  } else if (compounded == "monthly") {
    compounded = 12;
  } else {
    compounded = 1;
  }

  cur_inv = parseFloat(cur_inv);
  deposits = parseFloat(deposits);
  rateofreturn = parseFloat(rateofreturn);
  compounded = parseFloat(compounded);
  months = parseFloat(months);

  let r = rateofreturn / 100;
  let years = months / 12;

  let FV =
    cur_inv * (1 + r / compounded) ** (compounded * years) +
    ((deposits * months * (months + 1)) / 12) * r +
    deposits * months;

  FV = Math.trunc(FV);
  FV_string = FV.toString();

  let total_amount = FV_string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("total_final").innerHTML = "$" + total_amount;
}

/* SECOND SECTION ================================================================*/
