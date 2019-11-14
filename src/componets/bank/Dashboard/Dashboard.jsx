import React from "react";
import Controls from "../Controls/Controls";
import Balance from "../Balance/Balance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import shortid from "short-id";
import style from "./Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Dashboard extends React.Component {
  state = {
    history: [],
    balance: 0
  };
  // deposit = 0;
  withdraw = 0;

  noMoney = () =>
    toast("На счету недостаточно средств для проведения операции!", {
      autoClose: 5000
    });
  unCorrectInput = () =>
    toast("Введите сумму для проведения операции!", { autoClose: 5000 });
  createNewOperation = (typeOperation, valueInput) => {
    const dateOperation = new Date().toLocaleString();
    return {
      id: shortid.generate(),
      type: typeOperation,
      amount: valueInput,
      date: dateOperation
    };
  };

  handleCkickDeposit = valueInput => {
    if (valueInput > 0) {
      const operation = this.createNewOperation("Deposit", valueInput);
      this.setState(prevState => {
        return {
          history: [operation, ...prevState.history],
          balance: (prevState.balance += Number(operation.amount))
        };
      });
    } else {
      this.unCorrectInput();
    }
  };

  handleCkickWithdraw = valueInput => {
    if (valueInput && valueInput > 0) {
      const operation = this.createNewOperation("Withdraw", valueInput);
      this.setState(prevState => {
        if (this.state.balance >= valueInput) {
          return {
            balance: (prevState.balance -= Number(operation.amount)),
            history: [operation, ...prevState.history]
          };
        } else {
          this.noMoney();
        }
      });
    } else {
      this.unCorrectInput();
    }
  };

  render() {
    const { history, balance } = this.state;
    return (
      <div className={style.dashboard}>
        <Controls
          deposit={this.handleCkickDeposit}
          withdraw={this.handleCkickWithdraw}
        />
        <ToastContainer />
        <Balance balance={balance} history={history} />
        <TransactionHistory history={history} />
      </div>
    );
  }
}
export default Dashboard;
