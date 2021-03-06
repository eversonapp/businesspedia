export default function NewsComponent(props) {
    return (
            <a href={props.url} target="_blank" rel="noreferrer" className='custom-news row'>
                <div className="row row-cols-1 row-cols-xl-2">
                    <div className="pic col">
                        <img src={props.image} alt={props.related} title={props.related} />
                    </div>
                    <div className="col">
                        <h6> {props.source} </h6>
                        <h4> {(props.headline).toString().substring(0,120)} </h4>
                        <p> {(props.summary).toString().substring(0,120)}. </p>
                    </div>
                </div>
            </a>
    )
}
