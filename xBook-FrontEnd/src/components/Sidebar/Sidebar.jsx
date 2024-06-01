import './Sidebar.scss'

export default function Sidebar({ onCategoryClick }) {
  const handleClick = (category) => {
    onCategoryClick(category);
  };

  return (  
    <div className="sidebar">
        <div className="title">
      <h2>Bookmarks</h2>
      </div>
      <div className="savedObject">
        <img className="objImg" src={"https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_gallery_icon_157643.png"} alt="" />
        <p>Saved objects</p>
      </div>
      <ul>
        <h3>My collections</h3>
        <li onClick={() => handleClick("all")}>All</li>
      </ul>
    </div>
  );
}


