import { useState, useEffect } from "react";

export default function App() {

  const btn = document.querySelector("#btn");
  const memeContainer = document.querySelector("#meme-image");
  // const getRandomMeme = () => { return memes[Math.floor(Math.random() * memes.length)]; };
  function getRandomMeme() {
    return memes[Math.floor(Math.random() * memes.length)];
  }

  const [memes, setMemes] = useState([]);
  const [memeImageUrl, setMemeImageUrl] = useState("");
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: ""
  });

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
      .then(response => setMemeImageUrl(response.data.memes[2].url));
  }, []);

  function handleClick(e) {
    e.preventDefault;
    setMemeImageUrl(getRandomMeme().url);
  }

  return (
    <div>
      <nav className="navbar nav--bg">
        <div className="container-fluid">
          <div className="navbar-brand w-100">
            <div className="d-flex flex-column justify-content-between flex-sm-row text-center">

              <div>
                <img src="src/assets/troll-face.png" alt="troll face logo" className="d-inline-block pe-2 nav--logo" />
                <a href="#" className="navbar-brand">
                  <span className="fs-5 text-white">Meme Generator</span>
                </a>
              </div>
              <p className="text-white">React course - Project 3</p>
            </div>

          </div>
        </div>
      </nav>
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
        <div id="meme-image" className="mx-auto position-relative">
          <img src={memeImageUrl} className="meme--image img-fluid" alt="meme" />
          <p className="">{formData.topText}</p>
          <p className="">{formData.bottomText}</p>
        </div>
      </form>
    </div>
  );
}
