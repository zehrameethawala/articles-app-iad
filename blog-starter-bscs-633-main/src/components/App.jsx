import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import Login from "./Login";
import Register from "./Register";
import Profile from './Profile';
import { fetchArticles, createArticle } from "../services/articleService";
import { getCurrentUser, logout } from "../services/authService";
import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles).catch(console.error);
    } else {
      setArticles([]);
      setArticle(null);
    }
  }, [user]);

  function addArticle({ title, body }) {
    createArticle({ title, body })
      .then((article) => {
        setArticle(article);
        setArticles([article, ...articles]);
        setWriting(false);
      })
      .catch(console.error);
  }

  const handleLogin = (user) => {
    setUser(user);
    setShowLogin(false);
  };

  const handleRegister = (user) => {
    setUser(user);
    setShowRegister(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setArticles([]);
    setArticle(null);
    setWriting(false);
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    setShowProfile(false);
  };

  if (!user) {
    return (
      <div className="App unauthenticated">
        <header>
          <h1>Blog</h1>
        </header>
        <div className="auth-container">
          <div className="welcome-message">
            <h1>Welcome to Blog</h1>
            <p>Share your thoughts and connect with others</p>
          </div>
          <div className="auth-buttons">
            <button className="secondary-btn" onClick={() => setShowLogin(true)}>Login</button>
            <button className="secondary-btn" onClick={() => setShowRegister(true)}>Register</button>
          </div>
          {showLogin && <Login onLogin={handleLogin} />}
          {showRegister && <Register onRegister={handleRegister} />}
        </div>
      </div>
    );
  }

  return (
    <div className="App authenticated">
      <header>
        <h1>Blog</h1>
        <div className="header-controls">
          <div className="action-buttons">
            <button onClick={() => setWriting(true)}>New Article</button>
            <button onClick={() => setShowProfile(true)}>Update Profile</button>
            <button className="secondary-btn" onClick={handleLogout}>Logout</button>
          </div>
          <div className="user-info">
            {user.profilePicture && (
              <img 
                src={`http://localhost:3000${user.profilePicture}`} 
                alt="Profile" 
                className="profile-picture"
              />
            )}
            <span className="welcome-text">Welcome, {user.username}!</span>
          </div>
        </div>
      </header>
      {showProfile && (
        <Profile user={user} onUpdateProfile={handleUpdateProfile} />
      )}
      <Nav articles={articles} setArticle={setArticle} />
      {writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}
    </div>
  );
}