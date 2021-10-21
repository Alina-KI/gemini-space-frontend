import React, { useEffect, useState } from 'react'
import s from './my-page.module.scss'
import avatar from '../../../images/1.jpg'
import setting from '../../../images/setting/setting.png'
import { NavLink } from 'react-router-dom'
import { Gallery } from './gallery/gallery'
import { Comments } from './comments/comments'
import { authStore } from '../../../store/auth-store'

export const MyPage = () => {
  const user = authStore.user
  const [settingText, setSettingText] = useState('Setting')
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width && width <= 500) setSettingText('')
    if (width && width > 500) setSettingText('Setting')
  }, [width])

  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }} />
        <div className={s.name_data}>
          <NavLink to={`/user/${user?.login}`} className={s.NameUser}>
            {user?.name} {user?.surname} {user?.lastname}
          </NavLink>
          {user?.dateOfBirth === null ?
            <p className={s.TextDate}>Date of Birth: {user?.dateOfBirth}</p>
            :
            <p className={s.TextDate}> </p>
          }
          {user?.town === null ?
            <p className={s.TextDate}>Town: {user?.town}</p>
            :
            <p className={s.TextDate}> </p>
          }
        </div>
        <div className={s.settingContainer}>
          <NavLink to="/setting" className={s.setting}>
            <img className={s.settingImage} src={setting} alt="Setting" />
            <p className={s.settingText}>{settingText}</p>
          </NavLink>
        </div>
      </div>
      <Gallery />
      <div style={{ marginLeft: '10px' }}>
        <Comments text={'Hi'} />
        <Comments text={'Hello'} />
        <Comments text={'Red'} />
        <Comments text={'Hi'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments
          text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments
          text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments
          text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
        <Comments
          text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae esse exercitationem, ipsum iusto neque perferendis provident sed vel voluptatum. At deleniti mollitia perspiciatis reprehenderit sit voluptates? Corporis, labore, quaerat?'} />
      </div>
    </div>
  )
}