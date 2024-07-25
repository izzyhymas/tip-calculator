import React, { useState } from "react";

const Calculator: React.FC = () => {
  // State for storing bill
  const [bill, setBill] = useState<number | string>("");
  // State for storing tip percentage
  const [tipPercentage, setTipPercentage] = useState<number | string>("");
  // State for storing total bill after tip
  const [total, setTotal] = useState<number | null>(null);

  // Checks if string is a valid number
  const isNumber = (num: string): boolean => /^\d+$/.test(num);

  // Prevents page from refreshing when the submit button is clicked
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof bill === "number" && typeof tipPercentage === "number") {
      setTotal(Number(bill * tipPercentage));
    } else {
      alert("Please enter valid numbers");
    }
  };

  const handleBillChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newBill = event.target.value;

    if (newBill === "") {
      setBill("");
    } else if (isNumber(newBill)) {
      setBill(Number(newBill));
    }
  }

  const handleTipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newTip = event.target.value;

    // If input is cleared, set tip to empty string
    if (newTip === "") {
      setTipPercentage("");
    } else if (isNumber(newTip)) {
      setTipPercentage(Number(newTip));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bill">Bill Amount</label>
          <input
            type="text"
            id="bill"
            value={bill}
            placeholder="Enter Bill Amount"
            onChange={handleBillChange}
          ></input>
        </div>
        <div>
          <label htmlFor="tipPercentage">Tip Percentage</label>
          <input
            type="number"
            id="tipPercentage"
            value={tipPercentage}
            placeholder="Enter Tip Percentage"
            onChange={handleTipChange}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* Displays the result if total is not null */}
      {total && <h2>Your bill amount is {total}</h2>}
    </>
  );
};

export default Calculator;
