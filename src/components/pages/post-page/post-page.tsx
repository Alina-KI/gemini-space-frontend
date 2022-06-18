import React, { useState } from 'react'
import s from './post-page.module.scss'
import { groupPageStore } from '../../../store/group-page-store'
import { Comments } from '../comments/comments'
import { Post } from '../../../types/post'
import { authStore } from '../../../store/auth-store'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { userPageStore } from '../../../store/user-page-store'

type Props = Post & {
  isPostGroups: boolean
}

export const PostPage = observer((post: Props) => {
  const isWhite = !post.likes.find(user => user.login === authStore.user?.login)
  const [isShow, setIsShow] = useState(false)

  return (
    <div className={s.containerPost} key={post._id}>
      <div className={s.datePost}>
        {new Date(+post.datePublished).toDateString() + ' ' + new Date(+post.datePublished).toLocaleTimeString()}
      </div>
      <h3 className={s.titlePost}>{post.title}</h3>
      <div className={s.textPost}>{post.text}</div>
      <div className={s.containerCreatorButton}>
        <NavLink to={`/${post.user.login}`} className={s.userPost}>{post.user.surname} {post.user.name}</NavLink>
        <button onClick={() => {
          if (post.isPostGroups){
            groupPageStore.changeLikes(post._id).then()
          }
          else{
            userPageStore.changeLikes(post._id).then()
          }
        }} className={s.likesPost}>
          <span style={{ color: `${isWhite ? 'white' : 'green'}` }}>&#10003;</span>
          {post.likes.length}
        </button>
      </div>
      <button onClick={() => setIsShow(!isShow)} className={s.show}>
        {isShow ? 'Show comments' : 'Hide comments'}
      </button>
      {isShow && post.comments.map(comment =>
        <Comments {...comment} key={comment._id} />
      )}
    </div>
  )
})