export default function SavedMeme(props) {

    return (
        <section className="savedMeme--card">
            <div className="savedMeme--header">
                <span onClick={() => props.deleteFunc(props.id)} className="bi bi-bookmark-x-fill"></span>
                <img src={props.url} style={{ width: "100px", height: "100px" }} alt="meme" />
            </div>
            <div className="savedMeme-body">
                <p>
                    {props.topText}...
                </p>
                <button className="savedMeme--view-meme" data-bs-toggle="modal" data-bs-target={`#memeModal${props.id}`}>view meme</button>
                <button className="savedMeme--view-meme" data-bs-toggle="collapse" data-bs-target={`#editForm${props.id}`} >edit</button>
                <form id={`editForm${props.id}`} className="collapse">
                    <input type="text" className="form-control" />
                    <input type="text" className="form-control" />
                </form>
            </div>
            {/* MODAL */}
            <div className="modal fade" id={`memeModal${props.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body memeModal position-relative text-center text-uppercase font-weight-bold display-6 text-white">
                            <img src={props.url} alt="meme" className="w-100 mx-auto" />
                            <p className="position-absolute meme--text meme--text-top">{props.topText}</p>
                            <p className="position-absolute  meme--text meme--text-bottom">{props.bottomText}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}