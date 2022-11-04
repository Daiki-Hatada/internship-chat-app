import { useEffect, useState } from 'react'
import { createChat } from '../../libs/chats/createChat'
import { listenChats } from '../../libs/chats/listenChats'
import { createUser } from '../../libs/users/createUser'
import { getUser } from '../../libs/users/getUser'
import { Chat } from '../../types/Chat.types'
import { User } from '../../types/User.types'
import './Chats.css'

const UserCreateModal = ({ onSave }: { onSave?: (name: string) => void }) => {
  const [name, setName] = useState<string>('')

  const onSaveButtonClicked = () => {
    if (!name) return
    setName('')
    onSave && onSave(name)
  }

  return (
    <>
      <p>Input your name to start chatting with us...</p>
      <input value={name} onChange={({ target }) => setName(target.value)} />
      <button onClick={onSaveButtonClicked}>
        Create User
      </button>
    </>
  )
}

const Page = () => {
  const [user, setUser] = useState<User>()
  const [modalOpen, setModalOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [body, setBody] = useState<string>('')

  const onSendButtonClicked = async () => {
    if (!body || !user) return
    await createChat({ chat: { body, name: user.name }})
    setBody('')
  }

  useEffect(() => {
    return listenChats({
      callback: (chats => {
        setChats(chats)
      }),
      onError: console.error,
    })
  }, [listenChats, setChats])

  useEffect(() => {
    if (user) {
      setModalOpen(false)
      return
    }
    const id = localStorage.getItem('userId')
    if (id) {
      getUser({ id }).then(setUser).catch(console.error)
      setModalOpen(false)
      return
    }
    setModalOpen(true)
  }, [user, setModalOpen])

  return (
    <div className="App">
      {modalOpen ? (
        <UserCreateModal onSave={async (name) => {
          const user = await createUser({ user: { name } })
          setUser(user)
          localStorage.setItem('userId', user.id)
        }} /> 
      ) : (
        <>
          <div>
            <ul>
              {chats.map(chat => <li key={chat.id}>{chat.body} from {chat.name}</li>)}
            </ul>
          </div>
          <input value={body} onChange={({ target }) => setBody(target.value)} />
          <button onClick={onSendButtonClicked} >Send</button>
        </>
      )}
      
    </div>
  )
}

export default Page
