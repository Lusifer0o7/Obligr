import React, { useEffect, useState } from "react";
import "../../assets/css/HomeMenuSettings.css";
import { createHomeMenu } from "actions/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllHomeMenus } from "actions/settingAction";
import Loader from "components/Loader";
import { deleteHomeMenu } from "actions/settingAction";
import { DELETE_HOME_MENU_RESET } from "constants/settingConstants";
import { toast } from "react-toastify";
import { updateHomeMenu } from "actions/settingAction";
import { UPDATE_HOME_MENU_RESET } from "constants/settingConstants";
import { Button, Input } from "reactstrap";
import { CREATE_HOME_MENU_RESET } from "constants/settingConstants";

export default function HomeMenuSetting() {
  const dispatch = useDispatch();

  const { loading, homeMenus, error } = useSelector(
    (state) => state.allHomeMenus
  );

  const {
    loading: createLoading,
    isCreated,
    error: createError,
  } = useSelector((state) => state.newHomeMenu);

  const {
    error: deleteError,
    isDeleted,
    isUpdated,
    message,
  } = useSelector((state) => state.HomeMenu);

  const [titles, setTitles] = useState([]);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(null);

  useEffect(() => {
    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_HOME_MENU_RESET });
    }

    if (isUpdated) {
      toast.success(message);
      dispatch({ type: UPDATE_HOME_MENU_RESET });
    }

    if (isCreated) {
      toast.success("Menu Created Successfully");
      dispatch({ type: CREATE_HOME_MENU_RESET });
    }

    dispatch(getAllHomeMenus());
  }, [isDeleted, isUpdated, isCreated]);

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

  const deleteMenuHandler = (menuId) => {
    dispatch(deleteHomeMenu(menuId));
  };

  const updateMenuHandler = (menuId, subtitle) => {
    const myForm = new FormData();
    myForm.set("menuId", menuId);
    myForm.set("subtitles", subtitle);
    dispatch(updateHomeMenu(myForm));
  };

  if (typeof loading === "undefined" || loading) {
    return <Loader />;
  }

  return (
    <div className="content">
      <div>
        <h1>Home Menu Settings</h1>
      </div>
      <div
        transition={{ duration: 0.2, delay: 0.25, ease: "easeInOut" }}
        className="h-menu-preview-container"
        onMouseLeave={() => setHoveredMenuIndex(null)}
      >
        <div className="h-menu-preview-lwrapper">
          {homeMenus.map((menu, index) => {
            return (
              <div
                className="h-menu-preview-title"
                key={menu._id}
                onMouseEnter={() => setHoveredMenuIndex(index)}
              >
                {menu.title}
                {hoveredMenuIndex === index && (
                  <span
                    className="h-menu-preview-title-cross"
                    onClick={() => deleteMenuHandler(menu._id)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </span>
                )}
                {hoveredMenuIndex === index && (
                  <div
                    className="h-menu-preview-subtitle-wrapper"
                    onMouseEnter={() => setHoveredMenuIndex(index)}
                    onMouseLeave={() => setHoveredMenuIndex(null)}
                  >
                    {menu.subtitles.map((subtitle, index) => {
                      return (
                        <div className="h-menu-preview-subtitle" key={index}>
                          {subtitle}

                          <span
                            className="h-menu-preview-subtitle-cross"
                            onClick={() =>
                              updateMenuHandler(menu._id, subtitle)
                            }
                          >
                            <i class="fa-solid fa-xmark"></i>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          className="btn-round btn-icon btn-success"
          onClick={handleAddTitle}
          style={{ fontSize: "20px", marginRight: "5%" }}
        >
          +
        </Button>
      </div>

      {hoveredMenuIndex === null && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
            }}
          >
            {titles.map((item, index) => (
              <div key={index} className="title-block-container col-md-11 card">
                <div className="title-block">
                  <Input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    placeholder="Title"
                    style={{ width: "65%" }}
                  />
                  <Button
                    className="btn-primary btn-sm"
                    onClick={() => handleAddSubtitle(index)}
                  >
                    Add Subtitle
                  </Button>
                  <Button
                    className="btn-round btn-icon btn-danger"
                    onClick={() => handleRemoveTitle(index)}
                    style={{ margin: "none !important" }}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </Button>
                </div>
                {item.subtitles.map((subtitle, subtitleIndex) => (
                  <div key={subtitleIndex} className="subtitle-block">
                    <Input
                      type="text"
                      value={subtitle}
                      onChange={(e) =>
                        handleSubtitleChange(
                          index,
                          subtitleIndex,
                          e.target.value
                        )
                      }
                      placeholder="Subtitle"
                      style={{ width: "50%" }}
                    />
                    <Button
                      className="btn-round btn-icon btn-danger"
                      onClick={() => handleRemoveSubtitle(index, subtitleIndex)}
                      style={{ margin: "none !important" }}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Button
          onClick={menuSubmitHandler}
          className="btn-simple btn-primary"
          style={{ display: titles.length === 0 ? "none" : "block" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
