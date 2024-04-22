
export default function Sidebar({onCategoryClick, onCreateCollection, collections, onDeleteCollection}) {
    const handleClick = (category) => {
        onCategoryClick(category);
      };

      const handleDelete = (id) => {
        onDeleteCollection(id);
      };

  return (
    <div className="sidebar">
        <div className="title">
      <h2>Сохраненное</h2>
      <img className="sattings" src={"https://cdn.icon-icons.com/icons2/634/PNG/48/cogs_icon-icons.com_58295.png"} alt="" />
      </div>
      <div className="savedObject">
        <img className="objImg" src={"https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_gallery_icon_157643.png"} alt="" />
        <p>Сохраненные обьекты</p>
      </div>
      <ul>
        <h4>Мои коллекции</h4>
        <li onClick={() => handleClick("all")}>Все</li>
        <li onClick={() => handleClick("article")}>Статьи</li>
        <li onClick={() => handleClick("image")}>Изображения</li>
        
      </ul>
      <div className="collections" onClick={onCreateCollection}>
        <img className="plus" src= {"https://cdn.icon-icons.com/icons2/1993/PNG/512/add_circle_create_expand_new_plus_icon_123218.png"} alt="" />
        <p>Создать новую подборку</p>
      </div>
      {collections.map(collection => (
          <li className="collectionsNew" key={collection.id}>
          {collection.title}
          <button className="delete-btn" onClick={() => handleDelete(collection.id)}>×</button>
        </li>
          
        ))}
    </div>
  );
}


