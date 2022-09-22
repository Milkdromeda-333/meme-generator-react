export default function Meme(props) {
    function handleClick() {
        props.saveMemeFunc();

    }
    return (
        <div id="meme--container" className="position-relative text-center text-uppercase font-weight-bold display-5 text-white">
            <img src={props.url} className="meme--image" alt="meme" />
            <p className="position-absolute meme--text meme--text-top">{props.topText}</p>
            <p className="position-absolute  meme--text meme--text-bottom">{props.bottomText}</p>
            {props.isBookmarked === false && <span className="bi bi-bookmark-heart meme-bookmark-icon text-dark" onClick={handleClick}></span> || <span className="bi bi-bookmark-heart-fill meme-bookmarked" onClick={handleClick}></span>}
        </div>
    );
}