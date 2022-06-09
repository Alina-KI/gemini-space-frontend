import React, { useEffect, useState } from 'react'
import s from './user-page.module.scss'
import setting from '../../../images/setting/setting.png'
import { NavLink, useParams } from 'react-router-dom'
import { MiniGallery } from './mini-gallery/mini-gallery'
import { Comments } from '../comments/comments'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { userPageStore } from '../../../store/user-page-store'
import { ModalUploadImage } from './modal-upload-image/modal-upload-image'
import { getFileUrl } from '../../../functions/get-file-url'

export const UserPage = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { login } = useParams<{ login: string }>()
  useEffect(() => {
    userPageStore.fetchUser(login)
  }, [login])
  const user = userPageStore.user

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

  if (userPageStore.isLoading) return <Loader />
  if (userPageStore.error) return <ErrorDisplay message={'Error'} />

  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.dataUser}>
          <img className={s.avatar} src={user?.avatar} onClick={() => setIsOpenModal(true)} alt='Avatar'/>
          <div className={s.name_data}>
            <NavLink to={`/${user?.login}`} className={s.NameUser}>
              {user?.name} {user?.surname} {user?.lastname}
            </NavLink>
            {user?.dateOfBirth === null &&
            <p className={s.TextDate}>Date of Birth: {user?.dateOfBirth}</p>
            }
            {user?.town === null &&
            <p className={s.TextDate}>Town: {user?.town}</p>
            }
          </div>
        </div>
        <ModalUploadImage isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        <div className={s.setting}>
          <NavLink to={`/${user?.login}/setting`} className={s.image}>
            <img className={s.settingImage} src={setting} alt="Setting" />
          </NavLink>
          <NavLink to={`/${user?.login}/setting`} className={s.text}><span
            className={s.settingText}>{settingText}</span></NavLink>
        </div>
      </div>
      <MiniGallery />
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
})