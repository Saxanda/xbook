import React from 'react';
import BookmarkCard from '../BookmarksCard/BookmarksCard';

function BookmarkList({ bookmarks }) {
  return (
    <div className="bookmark-list">
      <h2>Все </h2>
      {bookmarks.map(bookmark => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

export default BookmarkList;
