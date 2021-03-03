import React from 'react'
import { formatingLetters } from './EditLetters'


export default function CardComponent(props) {
    return (
        <div className="custom-card container">
            <div className='row row-cols-1 row-cols-lg-2 py-2' key={props.companyName}>
                <div className="col col-lg-8">
                    <span className="navbar-brand">
                        <img src={props.image} alt={props.companyName} title={props.companyName} className="d-inline-block align-middle" />
                        <span className="company-name">{props.companyName}</span>
                    </span>
                    <p> {props.description} </p>
                </div>
                <div className="col col-lg-4">
                    <ul className="stockPriceMatters" style={{background: Math.sign(props.changes) === -1 ? "#DB4437" : "#0F9D58"}}>
                        <li className="stockPrice">{"$" + (props.price)}</li>
                        <li className="stockChanges">
                            {"$" + (props.changes)} {((new Intl.NumberFormat().format((props.changes) / (props.price) * 100)) + "%")}
                        </li>
                    </ul>
                    <ul className="list-group">
                        <li className="list-group-item">{props.exchangeShortName}: <b>{props.symbol}</b></li>
                        <li className="list-group-item">IPO: <b>{(props.ipoDate).replaceAll('-','/')}</b></li>
                        <li className="list-group-item">Market Cap:<b> {'$' + (new Intl.NumberFormat().format(props.mktCap))}</b></li>
                        <li className="list-group-item">Industry:<b> {props.industry}</b></li>
                        <li className="list-group-item">Sector:<b> {props.sector}</b></li>
                        <li className="list-group-item">CEO:<b> {props.ceo}</b></li>
                        <li className="list-group-item">Employees:<b> {new Intl.NumberFormat().format(props.fullTimeEmployees)}</b></li>
                        <li className="list-group-item">Headquarters:<b> {formatingLetters(props.state)} - {props.country}</b></li>
                        <li className="list-group-item">Website:<b> <a href={props.website} target='_blank' rel="noreferrer">{(props.website).toString().replaceAll('http://','').replaceAll('https://','').replaceAll('www.','').replaceAll('.com/','.com')} </a></b></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
