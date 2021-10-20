import React from 'react'
import s from './my-page.module.scss'
import avatar from '../../../images/1.jpg'
import setting from '../../../images/setting/setting.png'
import { NavLink } from 'react-router-dom'
import { Gallery } from './gallery/gallery'
import { Comments } from './comments/comments'
// import { authStore, UserLoginType } from '../../../store/auth-store'

export const MyPage = () => {
  // const user = authStore.user as UserLoginType
  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }} />
        <div className={s.name_data}>
          <NavLink to="/user/:pk" className={s.NameUser}>Alis Red</NavLink>
          {/*{user.name} {user.surname} {user.lastname}*/}
          <p className={s.TextDate}>Date of Birth: 20.06.2002</p>
          <p className={s.TextDate}>Town: Moscow</p>
        </div>
        <div className={s.settingContainer}>
          <NavLink to="/setting" className={s.settingLink}>
            <img className={s.settingImage} src={setting} alt="Setting" />
          </NavLink>
          <NavLink to="/setting" className={s.setting}>Setting</NavLink>
        </div>
      </div>
      <Gallery />
      <div style={{ marginLeft: '10px' }}>
        <Comments text={'Hi'} />
        <Comments text={'Hello'} />
        <Comments text={'Red'} />
        <Comments text={'Hi'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
      </div>
    </div>
  )
}