import { useEffect, useState } from "react";
import api from "../services/api";
import "../App.css";

export default function FolderList({ onSelect }) {

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await api.get("/drive/folders");
      setFolders(res.data.files || []);
    } catch (err) {
      console.error("Error fetching folders", err);
      setError("Failed to load folders");
    }
  };

  const handleSelect = async (folderId) => {
    try {
      setLoading(true);
      setActiveFolder(folderId);
      setError("");

      console.log("Selecting folder:", folderId);

      // ✅ Step 1: Store folder
      await api.post("/drive/select-folder", { folderId });

      // ✅ Step 2: Process files
      const res = await api.get("/drive/process-files");
      console.log("Process response:", res.data);

      // 🔥 Basic validation
      if (!res.data) {
        setError("Processing failed");
        return;
      }

      // ✅ Step 3: Move to chat
      onSelect();

    } catch (err) {
      console.error("Error:", err);

      // 🔥 Better error message
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 500) {
        setError("Server error while processing files");
      } else {
        setError("Something went wrong while processing folder");
      }

    } finally {
      setLoading(false);
      setActiveFolder(null);
    }
  };

  return (
    <div>
      <h3>Select a Folder</h3>

      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      {folders.length === 0 && !error && (
        <p>Loading folders...</p>
      )}

      {folders.map(folder => (
        <div key={folder.id} className="folder">
          <span className="folder-name">📁 {folder.name}</span>

          <button
            className="select-btn"
            onClick={() => handleSelect(folder.id)}
            disabled={loading}
          >
            {loading && activeFolder === folder.id
              ? "Processing..."
              : "Select"}
          </button>
        </div>
      ))}
    </div>
  );
}