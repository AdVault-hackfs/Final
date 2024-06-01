import React from "react";
import lighthouse from "@lighthouse-web3/sdk";
import "./App.css"; // Import the CSS file

function App() {
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file, type) => {
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/company_logo.png" alt="Company Logo" className="logo" />
        <h1>Ad Upload Dashboard</h1>
      </header>
      <div className="upload-section">
        <div className="upload-window">
          <h2>Upload Poster</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadFile(e.target.files, "photo")}
          />
        </div>
        <div className="upload-window">
          <h2>Upload Video</h2>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => uploadFile(e.target.files, "video")}
          />
        </div>
        <div className="upload-window">
          <h2>Upload Ad description</h2>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => uploadFile(e.target.files, "text")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
