import { useState } from "react";
import FolderList from "../components/FolderList";
import ChatBox from "../components/ChatBot"; // ✅ import chat
import "../App.css";

export default function FoldrPage() {

  const [folderSelected, setFolderSelected] = useState(false);

  return (
    <div className="container">
      <h2 className="title">Google Drive AI Agent</h2>

      {!folderSelected ? (
        <FolderList onSelect={() => setFolderSelected(true)} />
      ) : (
        <ChatBox />  // 🔥 show chat instead of text
      )}
    </div>
  );
}