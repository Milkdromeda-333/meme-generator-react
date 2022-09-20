export default function SavedMeme(props) {
    return (
        <section className="savedMeme--card">
            <div className="savedMeme--header">
                <span onClick={() => props.deleteBookmarkFunc([].splice(props.index, 1))} className="bi bi-bookmark-x-fill"></span>
                <img src={props.url} style={{ width: "100px", height: "100px" }} alt="meme" />
            </div>
            <div className="savedMeme-body">
                <p>
                    {props.topText}...
                </p>
                <button className="savedMeme--view-meme" data-bs-toggle="modal" data-bs-target={`#memeModal${props.index}`}>view meme</button>
                <button className="savedMeme--view-meme">edit</button>
            </div>
            {/* MODAL */}
            <div class="modal fade" id={`memeModal${props.index}`} aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body memeModal position-relative text-center text-uppercase font-weight-bold display-6 text-white">
                            <img src={props.url} alt="meme" className="w-100 mx-auto" />
                            <p className="position-absolute meme--text meme--text-top">{props.topText}</p>
                            <p className="position-absolute  meme--text meme--text-bottom">{props.bottomText}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}