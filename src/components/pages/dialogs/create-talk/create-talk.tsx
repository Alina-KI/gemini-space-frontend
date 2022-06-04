import React, { useEffect, useRef, useState } from 'react'
import s from './create-talk.module.scss'
import { useRefDimensions } from '../../../../hooks/use-ref-dimensions'
import { observer } from 'mobx-react-lite'
import { Modal } from './modal/modal'

const readFile = (file: File | undefined | null) => {
  return new Promise<string>((resolve => {
    if (!file) {
      resolve('')
    }
    const reader = new FileReader()

    reader.onloadend = function() {
      resolve(reader.result as string)
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      resolve('')
    }
  }))
}


export const CreateTalk = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const containerRef = useRef<HTMLImageElement>(null)
  const { height } = useRefDimensions(containerRef)
  const [selectedFile, setSelectedFile] = useState<File | undefined | null>(undefined)
  const [preview, setPreview] = useState('')
  useEffect(() => {
    readFile(selectedFile).then(setPreview)
  }, [selectedFile])

  return (
    <form action="" className={s.formTalk} onSubmit={e => e.preventDefault()}>
      <div className={s.downlandPhoto}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
          <i className="material-icons">attach_file</i>
          <span className={s.textPhoto}>Загрузить файл</span>
          <input onChange={e => setSelectedFile(e.target?.files?.[0])} className={s.file} type="file" />
          <img ref={containerRef} className={s.photo} src={preview} alt="" />
        </label>
      </div>
      <div className={s.titleText}>
        <p className={s.title}>Title talk:</p>
        <input className={s.text} type="text" />
      </div>
      <div className={s.friends}>
        <button onClick={() => setIsOpenModal(true)}  className={s.btnAddedUsers}>Add users</button>
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
      <button className={s.btnTalk}>Create talk</button>
    </form>
  )
})
