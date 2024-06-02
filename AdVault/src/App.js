import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import "./App.css"; // Import the main CSS file
import Footer from "./Footer"; // Import the Footer component

function App() {
  const [loading, setLoading] = useState(false);
  const [posterFileName, setPosterFileName] = useState("");
  const [videoFileName, setVideoFileName] = useState("");
  const [descriptionFileName, setDescriptionFileName] = useState("");

  const progressCallback = (progressData) => {
    let percentageDone = 
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    setLoading(true);
    try {
      const output = await lighthouse.upload(
        file,
        "8042ee4f.3d3131d24f0041b8b7bf3b85e336195e",
        false,
        null,
        progressCallback
      );
      console.log("File Status:", output);
      console.log(
        `Visit at https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "poster") {
        setPosterFileName(file.name);
      } else if (type === "video") {
        setVideoFileName(file.name);
      } else if (type === "description") {
        setDescriptionFileName(file.name);
      }
      uploadFile(file);
    }
  };

  return (
    <div className="App">
      {loading && <div className="loading-indicator">Uploading...</div>}
      <header className="App-header">
        <img src="AdVault/assets/advault logo.png" alt="AdVault" className="logo" />
        <h1>Ad Upload Dashboard</h1>
      </header>
      <div className="upload-section">
        <div className="upload-window">
          <h2>Upload Ad Poster</h2>
          <label className="file-label">
            Choose file
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "poster")}
            />
          </label>
          <span className="file-name">{posterFileName}</span>
        </div>
        <div className="upload-window">
          <h2>Upload Ad Video</h2>
          <label className="file-label">
            Choose file
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
            />
          </label>
          <span className="file-name">{videoFileName}</span>
        </div>
        <div className="upload-window">
          <h2>Upload Ad Description</h2>
          <label className="file-label">
            Choose file
            <input
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChange(e, "description")}
            />
          </label>
          <span className="file-name">{descriptionFileName}</span>
        </div>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
