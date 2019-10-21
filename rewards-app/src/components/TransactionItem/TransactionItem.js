import React from 'react';
import './TransactionItem.css';

function TransactionItem(props) {

    const processDate = (date) =>{
        let newDate = new Date(date);
        return newDate.toDateString();
    }

    return (
        <div className="transactionItemContainer">
            <p>{processDate(props.datetime)}</p>
            <p>Total: ${props.transactionTotal}</p>
        </div>
    );
}

export default TransactionItem;
