export default function SavedMeme(props) {
    return (
        <div className="savedMeme--card">
            <div className="savedMeme--header">
                <span onClick={() => props.deleteBookmarkFunc([].splice(props.index, 1))} className="bi bi-bookmark-x-fill"></span>
                <img src={props.url} style={{ width: "100px", height: "100px" }} alt="meme" />
            </div>
            <div className="savedMeme-body">
                <p>
                    {props.topText}...
                </p>
                <button className="savedMeme--view-meme">view meme</button>
                <button className="savedMeme--view-meme">edit</button>
            </div>
        </div>
    );
}