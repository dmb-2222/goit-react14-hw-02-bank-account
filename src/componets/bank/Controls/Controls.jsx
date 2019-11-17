import React from "react";
import style from "./Controls.module.css";
import propTypes from "prop-types";

class Controls extends React.Component {
  state = { value: "" };

  handleInput = e => {
    this.setState({ value: +e.target.value });
  };
  hadleDeposit = ({ target: { name } }) => {
    this.props[name](this.state.value);
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
            onClick={this.hadleDeposit}
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
