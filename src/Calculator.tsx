import React, { useState } from "react";

import styles from "./Calculator.module.css";

const Calculator: React.FC = () => {
  // State for storing bill
  const [bill, setBill] = useState<number | string>("");
  // State for storing tip percentage
  const [tipPercentage, setTipPercentage] = useState<number | string>("");
  // State for storing total bill after tip
  const [total, setTotal] = useState<number | null>(null);

  // Checks if string is a valid number
  const isNumber = (num: string): boolean => /^\d*\.?\d*$/.test(num);

  // Prevents page from refreshing when the submit button is clicked
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof bill === "number" && typeof tipPercentage === "number") {
      const tipAmount = bill * (tipPercentage / 100);
      const totalAmount = bill + tipAmount;
      const roundedTotal = Math.round(totalAmount * 100) / 100; 
      setTotal(roundedTotal);
    } else {
      alert("Please enter valid numbers");
    }
  };

  const handleBillChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newBill = event.target.value;

    // If input is cleared, set tip to empty string
    if (newBill === "") {
      setBill("");
    } else if (isNumber(newBill)) {
      // If input is valid, update the bill state
      setBill(Number(newBill));
    }
  };

  const handleTipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newTip = event.target.value;

    // If input is cleared, set tip to empty string
    if (newTip === "") {
      setTipPercentage("");
    } else if (isNumber(newTip)) {
      // If input is valid, update the tip state
      setTipPercentage(Number(newTip));
    }
  };

  return (
    <div className={styles.calculator}>
      <form onSubmit={handleSubmit} className={styles.calculatorForm}>
        <div className={styles.formGroup}>
          <label htmlFor="bill">Bill Amount</label>
          <input
            type="text"
            id="bill"
            value={bill}
            placeholder="Enter Bill Amount"
            onChange={handleBillChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tipPercentage">Tip Percentage</label>
          <input
            type="text"
            id="tipPercentage"
            value={tipPercentage}
            placeholder="Enter Tip Percentage"
            onChange={handleTipChange}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* Displays the result if total is not null */}
      {total && <h2>Your total bill is {total}</h2>}
    </div>
  );
};

export default Calculator;
