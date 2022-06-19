import React, { useEffect, useRef, useState } from 'react'
import s from './create-talk.module.scss'
import { useRefDimensions } from '../../../../hooks/use-ref-dimensions'
import { observer } from 'mobx-react-lite'
import { Modal } from './modal/modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { usersTalkStore } from '../../../../store/users-talk-store'
import { readFile } from '../../../../functions/read-file'
import { dialogsStore } from '../../../../store/dialogs-store'
import ava from '../../../../images/2.jpg'
import { ReactComponent as Cross } from '../../../../images/cross.svg'

type TalkForm = {
  image: FileList
  nameTalk: string
}


export const CreateTalk = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const containerRef = useRef<HTMLImageElement>(null)
  const { height } = useRefDimensions(containerRef)
  const [selectedFile, setSelectedFile] = useState<File | undefined | null>(undefined)
  const [preview, setPreview] = useState('')
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm<TalkForm>()
  const onSubmit: SubmitHandler<TalkForm> = async data => {
    const dialog = await dialogsStore.createGroupDialog({
      nameTalk: data.nameTalk,
      users: usersTalkStore.users,
      image: data.image[0]
    })
    console.log(dialog)
    history.push(`/dialogs/${dialog._id}`)
  }
  useEffect(() => {
    readFile(selectedFile).then(setPreview)
  }, [selectedFile])

  return (
    <form action="" className={s.formTalk} onSubmit={handleSubmit(onSubmit)}>
      <button type="button" className={s.crossClose} onClick={() => {
        history.push('/dialogs')
      }}>
        <Cross className={s.crossPhotoClose} />
      </button>
      <div className={s.downlandPhoto}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
          <i className="material-icons">attach_file</i>
          <span className={s.textPhoto}>Upload file</span>
          <input {...register('image')}
            onChange={e => setSelectedFile(e.target?.files?.[0])} className={s.file} type="file" />
          <img ref={containerRef} className={s.photo} src={preview} alt="" />
        </label>
      </div>
      <div className={s.titleText}>
        <p className={s.title}>Title talk:</p>
        <input
          {...register('nameTalk', {
            required: { value: true, message: 'This field is required' },
            maxLength: { value: 100, message: 'Title talk cannot exceed 100 characters' }
          })}
          className={s.text} type="text" placeholder={errors?.nameTalk?.message || ''} />
      </div>
      <div className={s.friends}>
        <button type="button" onClick={() => setIsOpenModal(true)} className={s.btnAddedUsers}>Add users</button>
        {usersTalkStore.users.map(user =>
          <div key={user._id} className={s.listUsers}>
            <img className={s.photoUser} src={ava} alt="" />
            <div className={s.nameUser}>{user.surname} {user.name} {user.lastname}</div>
            <button type="button" className={s.cross} onClick={() => {
              usersTalkStore.removeUsers(user)
            }}>
              <Cross className={s.crossPhoto} />
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <button className={s.btnTalk}>Create talk</button>
    </form>
  )
})
