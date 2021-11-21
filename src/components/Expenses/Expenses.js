import Card from '../UI/Card';
import './Expenses.css'
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import { useState } from 'react';

const Expenses = props => {
    const [selectedYear, setYear] = useState('2020');

    const yearSelectHandler = selectedYear => {
        setYear(selectedYear);
    };

    const filteredExpenses = props.expenses.filter((expense) => {
        return expense.date.toString().indexOf(selectedYear) > -1;
    });

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter
                    selected={selectedYear}
                    onYearSelected={yearSelectHandler} />
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList items={filteredExpenses} />
            </Card>
        </div>
    );
}

export default Expenses;