import { useState } from 'react';
import { updateProfilePicture } from '../services/authService';

export default function Profile({ user, onUpdateProfile }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const data = await updateProfilePicture(formData);
      onUpdateProfile(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile-form">
      <h3>Update Profile Picture</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}