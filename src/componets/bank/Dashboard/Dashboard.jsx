import React from "react";
import Controls from "../Controls/Controls";
import Balance from "../Balance/Balance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import shortid from "short-id";
import style from "../style.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [],
      balance: 0,
      deposit: 0,
      withdraw: 0,
      valueInput: ""
    };
  }
  noMoney = () =>
    toast("На счету недостаточно средств для проведения операции!", {
      autoClose: 5000
    });
  unCorrectInput = () =>
    toast("Введите сумму для проведения операции!", { autoClose: 5000 });

  handleInput = e => {
    e.preventDefault();
    // if (Number(e.target.value) >= 0) {
      this.setState({ valueInput: e.target.value });
    // } else this.unCorrectInput();
  };

  createNewOperation = typyOperation => {
    const dateOperation = new Date().toLocaleDateString();
    return {
      id: shortid.generate(),
      type: typyOperation,
      amount: this.state.valueInput,
      date: dateOperation
    };
  };

  handleCkickDeposit = () => {
    if (this.state.valueInput !== "" && this.state.valueInput > 0) {
      const operation = this.createNewOperation("Deposit");
      this.setState(prevState => {
        return {
          history: [operation, ...prevState.history],
          deposit: (prevState.deposit += Number(operation.amount)),
          balance: (prevState.balance += Number(operation.amount)),
          valueInput: ""
        };
      });
    } else this.unCorrectInput();
  };

  handleCkickWithdraw = () => {
    if (this.state.valueInput !== "" && this.state.valueInput > 0) {
      const operation = this.createNewOperation("Withdraw");
      this.setState(prevState => {
        if (this.state.balance >= this.state.valueInput) {
          return {
            balance: (prevState.balance -= Number(operation.amount)),
            valueInput: "",
            history: [operation, ...prevState.history],
            withdraw: (prevState.withdraw += Number(operation.amount))
          };
        } else this.noMoney();
      });
    } else this.unCorrectInput();
  };

  render() {
    const { history, balance, deposit, withdraw, valueInput } = this.state;
    return (
      <div className={style.dashboard}>
        <Controls
          onInputChange={this.handleInput}
          deposit={this.handleCkickDeposit}
          withdraw={this.handleCkickWithdraw}
          resetForm={valueInput}
        />
        <ToastContainer />
        <Balance balance={balance} deposit={deposit} withdraw={withdraw} />
        <TransactionHistory history={history} />
      </div>
    );
  }
}
export default Dashboard;
