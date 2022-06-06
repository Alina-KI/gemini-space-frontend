import React, { useEffect, useRef, useState } from 'react'
import s from './create-talk.module.scss'
import { useRefDimensions } from '../../../../hooks/use-ref-dimensions'
import { observer } from 'mobx-react-lite'
import { Modal } from './modal/modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { socketStore } from '../../../../store/socket-store'
import { usersTalkStore } from '../../../../store/users-talk-store'
import { readFile } from '../../../../functions/read-file'
import { dialogsStore } from '../../../../store/dialogs-store'

type TalkForm = {
  image: string
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
      image: data.image
    })
    history.push(`/dialogs/${dialog._id}`)
  }
  useEffect(() => {
    readFile(selectedFile).then(setPreview)
  }, [selectedFile])

  return (
    <form action="" className={s.formTalk} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.downlandPhoto}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
          <i className="material-icons">attach_file</i>
          <span className={s.textPhoto}>Загрузить файл</span>
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
          className={s.text} type="text" />
        {errors?.nameTalk &&
        <p className={s.error}>* {errors.nameTalk.message} </p>}
      </div>
      <div className={s.friends}>
        <button type="button" onClick={() => setIsOpenModal(true)} className={s.btnAddedUsers}>Add users</button>
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <button className={s.btnTalk}>Create talk</button>
    </form>
  )
})
