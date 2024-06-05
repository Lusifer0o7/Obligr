import React, { useState } from "react";
import axios from "axios";

export default function HomeFooterSetting() {
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

  return (
    <div className="content">
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
