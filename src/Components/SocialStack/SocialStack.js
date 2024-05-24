// ProfileCard.js
import React from "react";
import "./SocialStack.scss";

function SocialStack({ profile }) {
  return (
    <div className="profile-card">
      <img
        className="cover"
        src={profile.coverImage}
        alt="Cover"
      />
      <img
        className="profile"
        src={profile.profileImage}
        alt="Profile"
      />
      <h2>{profile.accName}</h2>
      <p>{profile.userName}</p>
      <ul>
        {profile.idbio.map((bio, index) => (
          <li key={index}>{bio}</li>
        ))}
      </ul>
      <ul>
        <li>
          <div>{profile.postsCount}</div>
          <div>Posts</div>
        </li>
        <li>
          <div>{profile.followersCount}</div>
          <div>Followers</div>
        </li>
        <li>
          <div>{profile.followingCount}</div>
          <div>Following</div>
        </li>
      </ul>
      <button className="follow-button">Follow {profile.platform}</button>
    </div>
  );
}

export default SocialStack;
