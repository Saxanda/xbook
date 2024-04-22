import React from 'react';

function BookmarkCard({ bookmark }) {
  return (
    <div className="bookmark-card">
      <img src={bookmark.imageUrl} alt="" />
      <div>
        <h3>{bookmark.title}</h3>
        <p>{bookmark.description}</p>
      </div>
    </div>
  );
}

export default BookmarkCard;
