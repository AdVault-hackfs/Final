import React from "react";
import lighthouse from "@lighthouse-web3/sdk";
import "./App.css"; // Import CSS file for styling

function App() {
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    const output = await lighthouse.upload(
      file,
      "<API_KEY>",
      false,
      null,
      progressCallback
    );
    console.log("File Status:", output);

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload your Advertisement Here</h1>
        <input
          className="File-input"
          onChange={(e) => uploadFile(e.target.files)}
          type="file"
        />
      </header>
    </div>
  );
}

export default App;
