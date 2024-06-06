import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHomeFooter } from "actions/settingAction";
import Loader from "components/Loader";

export default function HomeFooterSetting() {
  const dispatch = useDispatch();
  const { loading, homeFooter, error } = useSelector(
    (state) => state.getHomeFooter
  );

  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    links: [""],
    icons: [""],
    contactInfo: {
      address: "",
      phone: [{ key: "", value: "" }],
      email: [{ key: "", value: "" }],
    },
    copyrightInfo: "",
  });

  useEffect(() => {
    dispatch(getHomeFooter());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (
    e,
    index,
    field,
    nestedField,
    isKeyValue = false
  ) => {
    const { name, value } = e.target;
    if (isKeyValue) {
      const updatedField = formData[field][nestedField].slice();
      updatedField[index] = {
        ...updatedField[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        [field]: { ...formData[field], [nestedField]: updatedField },
      });
    } else {
      const updatedField = formData[field].slice();
      updatedField[index] = value;
      setFormData({
        ...formData,
        [field]: updatedField,
      });
    }
  };

  const addField = (field, nestedField) => {
    if (nestedField) {
      const updatedField = formData[field][nestedField].concat({
        key: "",
        value: "",
      });
      setFormData({
        ...formData,
        [field]: { ...formData[field], [nestedField]: updatedField },
      });
    } else {
      const updatedField = formData[field].concat("");
      setFormData({
        ...formData,
        [field]: updatedField,
      });
    }
  };

  const removeField = (index, field, nestedField) => {
    if (nestedField) {
      const updatedField = formData[field][nestedField].filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        [field]: { ...formData[field], [nestedField]: updatedField },
      });
    } else {
      const updatedField = formData[field].filter((_, i) => i !== index);
      setFormData({
        ...formData,
        [field]: updatedField,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if (typeof loading === "undefined" || loading) {
    return <Loader />;
  }

  return (
    <div className="content">
      <div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "3rem",
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #2d2d2d",
              paddingBottom: "3rem",
            }}
          >
            <div>
              <img
                src="https://placehold.co/100x100"
                alt="Midday logo"
                style={{ height: "2rem" }}
              />
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  marginTop: "0.75rem",
                }}
              >
                {homeFooter[0].heading}
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                }}
              >
                {homeFooter[0].subheading}
              </p>
            </div>
          </header>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "3rem",
            }}
          >
            <div style={{ width: "25%" }}>
              <h2
                style={{
                  fontWeight: "600",
                  fontSize: "1.125rem",
                  marginBottom: "0.75rem",
                }}
              >
                Links
              </h2>
              <ul>
                {homeFooter[0].links.map((link, index) => {
                  return (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                      {link}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ width: "25%" }}>
              <h2
                style={{
                  fontWeight: "600",
                  fontSize: "1.125rem",
                  marginBottom: "0.75rem",
                }}
              >
                Contact Us
              </h2>

              <div>
                <span>Address : </span>
                <span style={{ marginBottom: "0.5rem" }}>
                  {homeFooter[0].address}
                </span>
              </div>

              <div>
                <span>Phone : </span>

                {homeFooter[0].phone.map((mobile) => {
                  return <span>{mobile}</span>;
                })}
              </div>

              <div>
                <span>Email : </span>

                {homeFooter[0].email.map((mail) => {
                  return <span>{mail}</span>;
                })}
              </div>
            </div>
            <div style={{ width: "25%", textAlign: "right" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                  color: "black",
                }}
              >
                <i class="fa-solid fa-star"></i>
                <span>Star</span>
                <span>1.8K</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  color: "black",
                  fontSize: "150%",
                }}
              >
                {homeFooter[0].icons.map((icon) => {
                  return <i class={`${icon}`}></i>;
                })}
              </div>
              <div
                style={{
                  borderTop: "1px solid #2d2d2d",
                  marginTop: "3rem",
                  paddingTop: "0.75rem",
                }}
              ></div>
            </div>
          </div>
          <footer
            style={{
              color: "#a0aec0",
              fontSize: "0.875rem",
              marginTop: "3rem",
              textAlign: "right",
            }}
          >
            {homeFooter[0].copyrightInfo}
          </footer>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Heading:</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subheading:</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Links:</label>
          {formData.links.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleNestedChange(e, index, "links")}
              />
              <button type="button" onClick={() => removeField(index, "links")}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addField("links")}>
            Add Link
          </button>
        </div>
        <div>
          <label>Icons:</label>
          {formData.icons.map((icon, index) => (
            <div key={index}>
              <input
                type="text"
                value={icon}
                onChange={(e) => handleNestedChange(e, index, "icons")}
              />
              <button type="button" onClick={() => removeField(index, "icons")}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addField("icons")}>
            Add Icon
          </button>
        </div>
        <div>
          <label>Contact Info - Address:</label>
          <input
            type="text"
            name="address"
            value={formData.contactInfo.address}
            onChange={(e) => handleNestedChange(e, 0, "contactInfo", "address")}
          />
        </div>
        <div>
          <label>Contact Info - Phone:</label>
          {formData.contactInfo.phone.map((phone, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                placeholder="Label"
                value={phone.key}
                onChange={(e) =>
                  handleNestedChange(e, index, "contactInfo", "phone", true)
                }
              />
              <input
                type="text"
                name="value"
                placeholder="Phone Number"
                value={phone.value}
                onChange={(e) =>
                  handleNestedChange(e, index, "contactInfo", "phone", true)
                }
              />
              <button
                type="button"
                onClick={() => removeField(index, "contactInfo", "phone")}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("contactInfo", "phone")}
          >
            Add Phone
          </button>
        </div>
        <div>
          <label>Contact Info - Email:</label>
          {formData.contactInfo.email.map((email, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                placeholder="Label"
                value={email.key}
                onChange={(e) =>
                  handleNestedChange(e, index, "contactInfo", "email", true)
                }
              />
              <input
                type="text"
                name="value"
                placeholder="Email"
                value={email.value}
                onChange={(e) =>
                  handleNestedChange(e, index, "contactInfo", "email", true)
                }
              />
              <button
                type="button"
                onClick={() => removeField(index, "contactInfo", "email")}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("contactInfo", "email")}
          >
            Add Email
          </button>
        </div>
        <div>
          <label>Copyright Info:</label>
          <input
            type="text"
            name="copyrightInfo"
            value={formData.copyrightInfo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
