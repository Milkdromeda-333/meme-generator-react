import { useState, useEffect } from "react";
import Meme from "./Meme.jsx";
import SavedMeme from "./SavedMeme.jsx";

export default function App() {
  /*
  PROJECT TASKS:
    task: be able to delete saved meme from list
    task: be able to edit the meme

  TASKS:
  [] edit the bookmark icons
  
  TODO:
  []change font-family
  []when meme is bookmareked and unbookmarked make the bookmark icons change
  []block certain memes from coming up that doesnt match the style. 
  */
  const btn = document.querySelector("#btn");
  const memeContainer = document.querySelector("#meme-image");
  function getRandomMeme() {
    return memes[Math.floor(Math.random() * memes.length)];
  }

  const [memes, setMemes] = useState([]);
  const [memeImageUrl, setMemeImageUrl] = useState("");
  const [formData, setFormData] = useState({
    topText: "Top text",
    bottomText: "bottom text",
    id: ""
  });
  const [savedMemes, setSavedMemes] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        setMemes(response.data.memes);
        return response;
      })
      .then(setMemeImageUrl("https://i.imgflip.com/1bik.jpg"));
  }, []);

  function handleClick(e) {
    e.preventDefault;
    let generatedMeme = getRandomMeme();
    // theres a meme data whose url is a blank image so i am skipping it here
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
      id: generatedMeme.id
    }));
  }
  console.log(formData);

  function saveMeme() {
    setSavedMemes(prevState => ([
      ...prevState,
      {
        ...formData,
        url: memeImageUrl
      }
    ]));
  }
  const bookmarkedMemes = savedMemes.map(meme => (<SavedMeme url={meme.url} topText={meme.topText} bottomText={meme.bottomText} saveMemeFunc={saveMeme} isBookmarked={true} id={meme.id} />));

  return (
    <div>
      {/* NAV BAR */}
      <nav className="navbar nav--bg">
        <div className="container-fluid">
          <div className="navbar-brand w-100">
            <div className="d-flex flex-column justify-content-between flex-sm-row text-center">
              {/* BRAND/NAVBAR */}
              <div>
                <img src="src/assets/troll-face.png" alt="troll face logo" className="d-inline-block pe-2 nav--logo" />
                <a href="#" className="navbar-brand">
                  <span className="fs-5 text-white">Meme Generator</span>
                </a>
              </div>
              <button className="saved-memes--open-btn text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                <span className="bi bi-bookmarks-fill bookmark-icon fa-2x"></span>
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
            <input type="text" placeholder="top text" className="form-control" aria-label="bottom text" name="topText" value={formData.topText} onChange={handleChange} />
          </div>
          <div className="col-12 col-sm-6">
            <input type="text" placeholder="bottom text" className="col-12 col-sm-3 form-control" aria-label="bottom text" name="bottomText" value={formData.bottomText} onChange={handleChange} />
          </div>
          <div className="row  mx-auto  mt-2">
            <button type="button" className="btn btn--bg btn--hover-bg mb-2 text-white col-12 form-control" onClick={handleClick}>Get a new image</button>
          </div>
        </div>
      </form>
      <Meme url={memeImageUrl} topText={formData.topText} bottomText={formData.bottomText} saveMemeFunc={saveMeme} />
    </div>

  );
}
