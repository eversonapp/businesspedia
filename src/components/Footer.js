import gitHub from '../pics/github.png'

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footerContainer">
                <a href='https://github.com/eversonapp/businesspedia' target="_blank" rel='noreferrer'>
                    <img src={gitHub} title='GitHub' alt='GitHub' />
                </a>
            </div>
        </footer>
    )
}