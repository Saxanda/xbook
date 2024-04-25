
export default function WindowMessage({ state, text, time }){
    const classNameDiv = state ? `chat__message-container ${state}` : 'chat__message-container';
    const classNameText = state ? `chat__message-text ${state}` : 'chat__message-text';
    return(
        <div className={classNameDiv}>
                <p className={classNameText}>{text}<span className="chat__message-time">{time}</span></p>
                
        </div>
    )
}