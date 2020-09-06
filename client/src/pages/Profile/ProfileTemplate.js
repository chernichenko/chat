import React from 'react'
import './Profile.scss'

const ProfileTemplate = ({ loading, form, changeHandler, saveProfileHandler }) => {
  const avatarUrlArr = form.avatarUrl.split('\\')
  const avatarName = avatarUrlArr[avatarUrlArr.length - 1]

  return (
    <div className="Profile">
      <div className="Form">
        <div>
          <div className="Input">
            <input
              placeholder="Введите имя"
              id="name"
              type="text"
              className="yellow-input"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
          </div>

          <div className="Input file">
            <input
              id="file"
              type="file"
              name="file"
              onChange={e => changeHandler(e)}
            />
            <label htmlFor="file">{form.file ? form.file.name : avatarName ? avatarName : 'Фото не выбрано'}</label>
          </div>

        </div>
        <div className="">
          <button
            className="button"
            onClick={saveProfileHandler}
            disabled={loading || !form.name}
          >
            Изменить
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate