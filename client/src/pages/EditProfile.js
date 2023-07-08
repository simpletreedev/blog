import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loading, setLoading } =
    useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [texts, setTexts] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: currentUser.bio || "",
    location: currentUser.location || "",
    avatar: currentUser.avatar,
  });

  const handleChange = (e) => {
    setTexts((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const mutation = useMutation(async (user) => {
    setLoading(true);
    return await makeRequest
      .put(`/users/${currentUser.userId}`, user)
      .then((res) => {
        const { name, email, avatar, bio, location } = res.data.user;
        setCurrentUser((prev) => {
          return { ...prev, name, email, avatar, bio, location };
        });
        setLoading(false);
      });
  });

  const handleEditProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", texts.name);
    formData.append("email", texts.email);
    formData.append("bio", texts.bio);
    formData.append("location", texts.location);
    formData.append("avatar", avatar || texts.avatar);

    mutation.mutate(formData);
    navigate(`/users/${currentUser.userId}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="editProfile">
      <div className="container">
        <h1>
          Edit Profile For <span>{currentUser.name}</span>
        </h1>
        <div className="right">
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={texts.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={texts.email}
              onChange={handleChange}
            />
            <label htmlFor="avatar">Profile image</label>
            <p>
              <img
                src={avatar ? URL.createObjectURL(avatar) : texts.avatar}
                alt=""
              />
              <input
                className="inputAvatar"
                id="inputTag"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </p>

            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={texts.location}
              onChange={handleChange}
            />
            <label htmlFor="bio">Intro</label>
            <input
              type="text"
              name="bio"
              value={texts.bio}
              onChange={handleChange}
            />

            <button onClick={handleEditProfile}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
