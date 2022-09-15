export default function Meme(props) {
    return (
        <div id="meme--container" className="position-relative text-center text-uppercase font-weight-bold display-5 text-white">
            <img src={props.url} className="meme--image" alt="meme" />
            <p className="position-absolute meme--text meme--text-top">{props.topText}</p>
            <p className="position-absolute  meme--text meme--text-bottom">{props.bottomText}</p>
            <span className="bi bi-bookmark-heart bookmark-icon" onClick={props.saveMemeFunc}></span>
        </div>
    );
}