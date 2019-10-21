import React from 'react';
import './TransactionMonth.css';
import TransactionItem from '../TransactionItem';

function TransactionMonth(props) {

    return (
        <div className="transactionMonthContainer">
            <h3>{props.title}</h3>
            <h4>Points earned this month: {props.totalPoints}</h4>
            <div>
                {
                    props.data.map((pay) => (
                    <TransactionItem 
                        key={pay.id} 
                        datetime={pay.datetime}
                        transactionTotal={pay.transactionTotal}
                    ></TransactionItem>
                    ))
                }
            </div>
        </div>
    );
}

export default TransactionMonth;
