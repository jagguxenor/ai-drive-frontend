import "../App.css";

export default function Login() {

  const handleLogin = () => {
    window.location.href = "https://ai-drive-agent-clean-5.onrender.com/oauth2/authorization/google";
  };

  return (
    <div className="container">
      <h2 className="title">Connect Google Drive</h2>
      <button className="btn" onClick={handleLogin}>
        Connect with Google
      </button>
    </div>
  );
}