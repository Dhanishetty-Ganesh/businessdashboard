import React, { useState } from "react";
import "./index.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://businessdashboard-xfbm.onrender.com/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
   
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://businessdashboard-xfbm.onrender.com/regenerate-headline?name=${formData.name}&location=${formData.location}`
      );
      const result = await res.json();
      setData((prev) => ({ ...prev, headline: result.headline }));
    } catch (err) {
      alert("Failed to regenerate headline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Local Business SEO Dashboard</h1>

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {data && (
        <div className="card">
          <h2>{formData.name} - {formData.location}</h2>
          <p><strong>Rating:</strong> ⭐ {data.rating}</p>
          <p><strong>Reviews:</strong> {data.reviews}</p>
          <p><strong>SEO Headline:</strong> {data.headline}</p>
          <button onClick={regenerateHeadline} disabled={loading}>
            {loading ? "Generating..." : "Regenerate SEO Headline"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
