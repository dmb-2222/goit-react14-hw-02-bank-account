import React from "react";
import propTypes from "prop-types";
import style from "./Balance.module.css";

const Balance = ({ balance, history }) => {
  const deposit = history
    ? history
        .filter(el => el.type === "Deposit")
        .reduce((acc, el) => acc + Number(el.amount), 0)
    : 0;
  const withdraw = history
    ? history
        .filter(el => el.type === "Withdraw")
        .reduce((acc, el) => acc + Number(el.amount), 0)
    : 0;
  return (
    <section className={style.balance}>
      <span className={style.deposite}>⬆ {deposit}$</span>
      <span className={style.withdraw}>⬇ {withdraw}$</span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

export default Balance;

Balance.propTypes = {
  balance: propTypes.number,
  withdraw: propTypes.number
};
