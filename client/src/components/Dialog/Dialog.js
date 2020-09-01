import './Dialog.scss'
import React from 'react' 
 
const Dialog = () => {
  return (
    <div className="Dialog">
        <div className="Dialog__top">
            <div className="Dialog__name">Гай Юлий Цезарь</div>
            <div className="Dialog__status">
                <div className="circle"></div>
                <span>онлайн</span>
            </div>
        </div>
    </div>
  );
};

export default Dialog