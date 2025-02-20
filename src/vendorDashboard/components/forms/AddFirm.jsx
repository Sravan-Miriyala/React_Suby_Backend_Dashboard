import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ClipLoader } from "react-spinners";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) throw new Error("User not authenticated");

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);
      category.forEach((value) => formData.append('category', value));
      region.forEach((value) => formData.append('region', value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: { 'token': loginToken },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add Firm');

      alert("Firm added Successfully");
      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);
      
      localStorage.setItem('firmId', data.firmId);
      localStorage.setItem('firmName', data.vendorFirmName);
      window.location.reload();

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading ? (
        <div className="loaderSection">
          <ClipLoader color="#4fa94d" loading={loading} size={50} />
        </div>
      ) : (
        <form className="tableForm" onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>
          <label>Firm Name</label>
          <input type="text" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
          <label>Area</label>
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />

          <label>Category</label>
          <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} /> Veg
          <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} /> Non-Veg

          <label>Offer</label>
          <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} />

          <label>Region</label>
          <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} /> South Indian
          <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} /> North Indian

          <label>Firm Image</label>
          <input type="file" onChange={handleImageUpload} />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
