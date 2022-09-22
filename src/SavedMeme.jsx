import { useState } from "react";

export default function SavedMeme(props) {

    // DOCS: saves data from the edit && puts in the previous data for the meme text
    const [editedMeme, setEditedMeme] = useState({
        topText: props.savedMemesArr[props.id].topText,
        bottomText: props.savedMemesArr[props.id].bottomText

    });

    // DOCS: controls form for editing memes
    function handleChange(e) {
        const { name, value } = e.target;
        setEditedMeme(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <section className="savedMeme--card">
            <div className="savedMeme--header">
                <span onClick={() => props.deleteFunc(props.id)} className="bi bi-bookmark-x-fill"></span>
                <img src={props.url} style={{ width: "100px", height: "100px" }} alt="meme" />

            </div>
            <div className="savedMeme--body">
                <p>
                    {props.topText}...
                </p>
                <button className="savedMeme--view-meme" data-bs-toggle="modal" data-bs-target={`#memeModal${props.id}`}>view meme</button>
                <button className="savedMeme--view-meme edit" data-bs-toggle="collapse" data-bs-target={`#editForm${props.id}`}>edit</button>

            </div>
            {/* EDIT MEME FORM */}
            <form id={`editForm${props.id}`} className="collapse text-center" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="form-control w-75 mx-auto mb-1" placeholder="top text" name="topText" value={editedMeme.topText} onChange={handleChange} />
                <input type="text" className="form-control w-75 mx-auto mb-1" placeholder="bottom text" name="bottomText" value={editedMeme.bottomText} onChange={handleChange} />
                <button className="btn" onClick={() => props.editMeme(props.id, editedMeme)} data-bs-toggle="collapse" data-bs-target={`#editForm${props.id}`}>Save</button>
            </form>
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

        </section >
    );
}