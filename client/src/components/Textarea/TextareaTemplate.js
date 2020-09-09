import React from 'react'
import { Picker } from 'emoji-mart'
import smileSvg from 'assets/icons/smile.svg'
import sendSvg from 'assets/icons/send.svg'

const TextareaTemplate = ({
    isEmojiOpen,
    addEmoji,
    setIsEmojiOpen,
    value,
    setValue,
    keyHandler,
    sendHandler
}) => {
    return (
        <div className="Dialog__input-wrap">
            {isEmojiOpen
                ? <div className="Dialog__emoji-picker">
                    <Picker
                        onSelect={emojiTag => addEmoji(emojiTag)}
                        set="apple"
                    />
                </div>
                : <div className="Dialog__emoji-button">
                    <img src={smileSvg} alt="" onClick={() => setIsEmojiOpen(true)} />
                </div>}

            <div className="Input">
                <input
                    placeholder="Введите текст сообщения…"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={keyHandler}
                />
                <div className="send" onClick={sendHandler}>
                    <img src={sendSvg} alt="" onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default TextareaTemplate