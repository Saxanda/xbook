import { useState } from 'react';
import './Modal.scss';

function Modal({ isOpen, onClose, onCreate }) {
  const [collectionName, setCollectionName] = useState('');

  const handleCreate = () => {
    onCreate(collectionName);
    setCollectionName('');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Создать новую подборку</h2>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Название подборки"
              />
            </div>
            <div className="modal-footer">
              <button onClick={handleCreate}>Создать</button>
              <button onClick={onClose}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
