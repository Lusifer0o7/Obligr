import { createHomeSlider } from "actions/settingAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function HomeSliderSetting() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});

  console.log(image);

  const handleSubmit = (event) => {
    event.preventDefault();

    const homeSliderData = {
      title: title,
      description: description,
      image: image,
    };

    dispatch(createHomeSlider());
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <div className="content">
      <div>
        <h1>Submit Your Information</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Image:
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </label>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}
