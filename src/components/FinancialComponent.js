import React from 'react'
import { formatingValues } from './EditNumbers'

export default function FinancialComponent(props) {
    return (
        <tr key={props.calendarDate}>
            <th> {(props.calendarDate).toString().substring(0,4).replace('-','/')} </th>
            <th> {formatingValues(props.shareholdersEquity)} </th>
            <th> {formatingValues(props.revenues)} </th>
            <th> {formatingValues(props.earningsBeforeInterestTaxesDepreciationAmortization)} </th>
            <th> {formatingValues(props.netIncome)} </th>
            <th style={{color: Math.sign((props.netIncome / props.revenues) * 100) === -1 ? "#DB4437" : "#333333"}}>
                {(((props.netIncome / props.revenues) * 100) < 0) ? 'LOSS' : (Math.round((props.netIncome / props.revenues) * 100) + '%')}
            </th>
            <th style={{color: Math.sign(props.returnOnAverageEquity) === -1 ? "#DB4437" : "#333333"}}>
                {(props.returnOnAverageEquity === undefined) ? '' : ((props.returnOnAverageEquity < 0) ? 'LOSS' : Math.round(props.returnOnAverageEquity * 100) + '%')}
            </th>
            <th> {formatingValues(props.cashAndEquivalents)} </th>
            <th> {formatingValues(props.debt)} </th>
        </tr>
    )
}
