import deletingImage from "../../../../public/image/deleting_icon.svg"
import redactImage from "../../../../public/image/redact_icon.svg"

export default function WindowMessage({ state, text, time, id, redactButton, deleteButton }){
    const classNameDiv = state ? `chat__message-container ${state}` : 'chat__message-container';
    const classNameText = state ? `chat__message-text ${state}` : 'chat__message-text';
    return(
        <div className={classNameDiv}>
            
            <p className={classNameText}>
                <button 
                className="chat__message_button"
                onClick={() => redactButton(id, text)}
                >
                    <img className="chat__message-icon redact" src={redactImage} alt="" />
                </button>
                
                <span className="chat__message-text-inside">
                    {text}
                </span>

                <span className="chat__message-time">
                    {time}
                </span>

                <button 
                className="chat__message_button"
                onClick={() => deleteButton(id)}
                >
                    <img className="chat__message-icon delete" src={deletingImage} alt="" />
                </button>
            </p>
        </div>
    )
}