import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
    // 1- One state for each item
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [shownForm, setFormState] = useState('Add');

    // 2- Single state
    //const [userInput, setUserInput] = useState({
    //   enteredTitle: '',
    //    enteredAmount: '',
    //    enteredDate: ''
    //});

    const titleChangeHandler = (event) => {
        //1
        setEnteredTitle(event.target.value);

        //2 -> bad practice, there might be cases this fail 
        //(react schedules state updates, if you have many of them happening at once, 
        //you may get an older version of the previous state)
        //setUserInput({
        //    ...userInput,
        //    enteredTitle: event.target.value
        //})

        //2- if your next state depends on the previous, use this instead:
        //react guarantees that you get the latest version of the previous state
        //setUserInput((previousState) => {
        //    return {
        //        ...previousState,
        //       enteredTitle: event.target.value
        //    }
        //});

        console.log(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        console.log(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
        console.log(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        };

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');

        props.onSaveExpenseData(expenseData);
        setFormState('Add');

        console.log(expenseData);
    };

    const showForm = () => {
        setFormState('Create');
    };

    const closeForm = () => {
        setFormState('Add');
    };


    return (
        shownForm === 'Add' ? (
            <div className="new-expense__show">
                <button onClick={showForm}>Add New Expense</button>
            </div>
        ) : (
            <form onSubmit={submitHandler}>
                <div className="new-expense__controls">
                    <div className="new-expense__control">
                        <label>Title</label>
                        <input
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                        />
                    </div>
                    <div className="new-expense__control">
                        <label>Amount</label>
                        <input
                            value={enteredAmount}
                            onChange={amountChangeHandler}
                            type="number"
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                    <div className="new-expense__control">
                        <label>Date</label>
                        <input
                            value={enteredDate}
                            onChange={dateChangeHandler}
                            type="date"
                            min="2019-01-01"
                            max="2022-12-31"
                        />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button onClick={closeForm}>Cancel</button>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        )

    );
};

export default ExpenseForm;