function SavedMeme(props) {
    return (
        <div className="savedMeme--card">
            <div className="savedMeme--header">
                <span className="bi bi-bookmark-x-fill"></span>
                <img src={props.url} style={{ width: "100px", height: "100px" }} alt="meme" />
            </div>
            <div className="savedMeme-body">
                <p>
                    {props.topText}...
                </p>
                <p className="savedMeme--view-meme">view meme</p>
            </div>
        </div>
    );
}

export default SavedMeme;