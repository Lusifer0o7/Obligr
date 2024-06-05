import React, { useState } from "react";
import "../../assets/css/HomeMenuSettings.css";
import { createHomeMenu } from "actions/settingAction";
import { useDispatch } from "react-redux";

export default function HomeMenuSetting() {
  const dispatch = useDispatch();
  const [titles, setTitles] = useState([]);

  const handleAddTitle = () => {
    setTitles([...titles, { title: "", subtitles: [] }]);
  };

  const handleRemoveTitle = (index) => {
    const newTitles = titles.filter((_, i) => i !== index);
    setTitles(newTitles);
  };

  const handleTitleChange = (index, value) => {
    const newTitles = titles.map((item, i) =>
      i === index ? { ...item, title: value } : item
    );
    setTitles(newTitles);
  };

  const handleAddSubtitle = (index) => {
    const newTitles = titles.map((item, i) =>
      i === index ? { ...item, subtitles: [...item.subtitles, ""] } : item
    );
    setTitles(newTitles);
  };

  const handleSubtitleChange = (titleIndex, subtitleIndex, value) => {
    const newTitles = titles.map((item, i) =>
      i === titleIndex
        ? {
            ...item,
            subtitles: item.subtitles.map((subtitle, j) =>
              j === subtitleIndex ? value : subtitle
            ),
          }
        : item
    );
    setTitles(newTitles);
  };

  const handleRemoveSubtitle = (titleIndex, subtitleIndex) => {
    const newTitles = titles.map((item, i) =>
      i === titleIndex
        ? {
            ...item,
            subtitles: item.subtitles.filter((_, j) => j !== subtitleIndex),
          }
        : item
    );
    setTitles(newTitles);
  };

  const menuSubmitHandler = () => {
    titles.map((title) => {
      dispatch(createHomeMenu(title));
    });
  };

  return (
    <div className="content">
      <div>
        <h1>Titles and Subtitles</h1>
        <button onClick={handleAddTitle}>Add Title</button>
        {titles.map((item, index) => (
          <div key={index} className="title-block">
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder="Title"
            />
            <button onClick={() => handleRemoveTitle(index)}>
              Remove Title
            </button>
            <button onClick={() => handleAddSubtitle(index)}>
              Add Subtitle
            </button>
            {item.subtitles.map((subtitle, subtitleIndex) => (
              <div key={subtitleIndex} className="subtitle-block">
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) =>
                    handleSubtitleChange(index, subtitleIndex, e.target.value)
                  }
                  placeholder="Subtitle"
                />
                <button
                  onClick={() => handleRemoveSubtitle(index, subtitleIndex)}
                >
                  Remove Subtitle
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={menuSubmitHandler}> Submit</button>
      </div>
    </div>
  );
}
