import { useState, useEffect } from "react";
import Meme from "./Meme.jsx";
import SavedMeme from "./SavedMeme.jsx";

/*
  TASKS:
  []block certain memes from coming up that doesnt match the style.
  [] make responsive
  */

export default function App() {

  const [memes, setMemes] = useState([]);
  const [memeImageUrl, setMemeImageUrl] = useState("");
  const [formData, setFormData] = useState({
    topText: "top text",
    bottomText: "bottom text",
    id: "",
    isBookmarked: false,
    bookmarkedIndex: ""
  });
  const [savedMemes, setSavedMemes] = useState([]);


  function getRandomMeme() {
    return memes[Math.floor(Math.random() * memes.length)];
  }
  // DOCS: controls the input of meme form
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // DOCS: resets form after the meme has been bookmarked when the user goes to change the form
  function handleResetForm() {
    if (formData.isBookmarked) {
      setFormData({
        topText: "top text",
        bottomText: "bottom text",
        id: "",
        isBookmarked: false,
        bookmarkedIndex: savedMemes.length
      });
    }

  }

  // DOCS: fetched api data for memes, sets the image of the first meme on mount
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        setMemes(response.data.memes);
        return response;
      })
      .then(setMemeImageUrl("https://i.imgflip.com/jrj7.jpg"))
      .then(setFormData(prevState => ({
        ...prevState
      })));
  }, []);

  // DOCS: handles get new meme button
  function handleClick(e) {
    e.preventDefault();
    let generatedMeme = getRandomMeme();
    // DOCS: theres a meme data whose url is a blank image so i am skipping it here
    switch (generatedMeme.id) {
      case "183518946":
        generatedMeme = getRandomMeme();
        break;
      default:
        break;
    }
    setMemeImageUrl(generatedMeme.url);
    setFormData(prevState => ({
      ...prevState,
      id: generatedMeme.id,
      isBookmarked: false
    }));
  }

  // DOCS: handles main bookmark button
  function saveMeme() {
    if (formData.isBookmarked === false) {
      setSavedMemes(prevState => ([
        ...prevState
        , {
          ...formData,
          url: memeImageUrl,
          isBookmarked: true,
          bookmarkedIndex: savedMemes.length
        }
      ]));

      setFormData(prevState => ({
        ...prevState,
        isBookmarked: true,
        bookmarkedIndex: savedMemes.length
      }));

    } else if (formData.isBookmarked === true) {
      setFormData(prevState => ({
        ...prevState,
        isBookmarked: false
      }));
      savedMemes.splice(formData.bookmarkedIndex, 1);
    }

  };
  // DOCS: this deletes bookmarked memes by comparing its index to the index of the meme the user wants to delete
  const delMeme = (id) => {
    setSavedMemes(savedMemes.filter((_, index) => index !== id));
  };

  // DOCS: edits saved memes
  function editMeme(id, newMeme) {
    const newMemeFull = {
      ...savedMemes[id],
      ...newMeme
    };
    setSavedMemes(prevState => prevState.map((meme, index) => index === id ? newMemeFull : meme));
    // DOCS: if it breaks try [...prevState]
  }

  const bookmarkedMemes = savedMemes.map((meme, index) => (<SavedMeme url={meme.url} topText={meme.topText} bottomText={meme.bottomText} saveMemeFunc={saveMeme} isBookmarked={meme.isBookmarked} id={index} key={meme.id + index} deleteFunc={delMeme} savedMemesArr={savedMemes} editMeme={editMeme} />));

  return (
    <div className="bg-light vh-100">
      {/* NAV BAR */}
      <nav className="navbar p-2 bg-dark shadow-lg">
        <div className="container-fluid">
          <div className="navbar-brand w-100">
            <div className="d-flex flex-column justify-content-between flex-sm-row text-center">
              {/* BRAND/NAVBAR */}
              <div>
                <img src="src/assets/troll-face.png" alt="troll face logo" className="d-inline-block pe-2 nav--logo" />
                <a href="#" className="navbar-brand">
                  <span className="fs-4 text-white fw-bold">Meme Generator</span>
                </a>
              </div>
              <button className="btn nav--btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                <span className="bi bi-bookmarks-fill bookmark-icon"></span>
              </button>
            </div>
            {/* SIDEBAR/OFFCANVAS */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidebar" aria-labelledby="sidebar--header">
              <div className="offcanvas-header">
                <h2 className="offcanvas-title" id="sidebar--header">Your saved memes</h2>
                <button className="btn-close" data-bs-dismiss="offcanvas" type="button" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body p-0">
                {bookmarkedMemes}
              </div>
            </div>

          </div>
        </div>
      </nav>
      {/* FORM */}
      <form className="container p-5">
        <div className="row g-2 mx-auto">
          <div className="col-12 col-sm-6">
            <input type="text" placeholder="top text" className="form-control" aria-label="bottom text" name="topText" value={formData.topText} onChange={handleChange} onFocus={handleResetForm} />
          </div>
          <div className="col-12 col-sm-6">
            <input type="text" placeholder="bottom text" className="col-12 col-sm-3 form-control" aria-label="bottom text" name="bottomText" value={formData.bottomText} onChange={handleChange} onFocus={handleResetForm} />
          </div>
          <div className="row  mx-auto  mt-2">
            <button type="button" className="btn btn-dark mb-2 col-12 form-control fw-bold text-uppercase" onClick={handleClick}>Get new image</button>
          </div>
        </div>
      </form>
      <Meme url={memeImageUrl} topText={formData.topText} bottomText={formData.bottomText} saveMemeFunc={saveMeme} isBookmarked={formData.isBookmarked} />
    </div>

  );
}