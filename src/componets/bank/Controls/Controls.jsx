import React from "react";
import style from "../style.module.css";
import propTypes from "prop-types";

class Controls extends React.Component {
  state = { value: "" };

  handleInput = e => {
    this.setState({ value: +e.target.value });
  };
  hadleDeposit = () => {
    this.props.deposit(this.state.value);
    this.resetForm()
  };
  handleWithdraw = () => {
    this.props.withdraw(this.state.value);
    this.resetForm()
  };
  resetForm = () => {
    this.setState({ value: "" });
  };
  render() {
    const { value } = this.state;
    return (
      <section className={style.controls}>
        <form onSubmit={evt => evt.preventDefault()}>
          <input
            type="number"
            className={style.input}
            onChange={this.handleInput}
            value={value}
          />
          <button
            type="submit"
            className={style.button}
            name="deposit"
            onClick={this.hadleDeposit}
          >
            Deposit
          </button>
          <button
            type="submit"
            className={style.button}
            name="withdraw"
            onClick={this.handleWithdraw}
          >
            Withdraw
          </button>
        </form>
      </section>
    );
  }
}
export default Controls;

Controls.propTypes = {
  onInputChange: propTypes.func,
  deposit: propTypes.func,
  withdraw: propTypes.func,
  resetForm: propTypes.string
};
