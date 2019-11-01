import React from "react";
import style from "../style.module.css";
import propTypes from "prop-types";
const Controls = ({ onInputChange, deposit, withdraw, resetForm}) => {
  return (
    <section className={style.controls}>
      <input
        type="number"
        className={style.input}
        onChange={onInputChange}
        value={resetForm}
      />
      <button
        type="submit"
        className={style.button}
        name="deposit"
        onClick={deposit}
      >
        Deposit
      </button>
      <button
        type="button"
        className={style.button}
        name="withdraw"
        onClick={withdraw}
      >
        Withdraw
      </button>
    </section>
  );
};
export default Controls;

Controls.propTypes = {
  onInputChange: propTypes.func,
  deposit: propTypes.func,
  withdraw: propTypes.func,
  resetForm: propTypes.string
};
