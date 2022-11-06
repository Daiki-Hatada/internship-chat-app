import { where } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { createChat } from '../../libs/chats/createChat'
import { listChats } from '../../libs/chats/listChats'
import { listenChats } from '../../libs/chats/listenChats'
import { createUser } from '../../libs/users/createUser'
import { getUser } from '../../libs/users/getUser'
import { Chat } from '../../types/Chat.types'
import { User } from '../../types/User.types'
import './Chats.css'

const ChatBubble = ({ chat, fromMe }: { chat: Chat, fromMe?: boolean }) => 
  <li className={`chat-bubble-wrapper ${fromMe ? 'from-me' : 'to-me'}`} >
    <span className={`chat-bubble ${fromMe ? 'from-me' : 'to-me'}`}>
      {chat.body} from {chat.name}
    </span>
  </li>

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
      <button onClick={onSaveButtonClicked}>Create User</button>
    </>
  )
}

const Page = () => {
  const [user, setUser] = useState<User>()
  const [modalOpen, setModalOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [body, setBody] = useState<string>('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const onSendButtonClicked = async () => {
    if (!body || !user) return
    await createChat({ chat: { body, name: user.name } })
    setBody('')
  }

  useEffect(() => {
    if (!chats.length) {
      ;(async () => {
        const fetchedChats = await listChats()
        setChats(fetchedChats)
      })()
    }
    return listenChats({
      callback: (incomingChats) => {
        setChats(prev => {
          const filteredChats = incomingChats.filter(ele => ele.createdAt > prev[0].createdAt)
          return [...filteredChats, ...prev]
        })
      },
      onError: console.error,
      queryConstraints: [where('createdAt', '>=', Date.now())],
    })
  }, [listenChats, listChats, setChats])

  useEffect(() => {
    if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [chats])

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
    <div className='App'>
      {modalOpen ? (
        <UserCreateModal
          onSave={async (name) => {
            const user = await createUser({ user: { name } })
            setUser(user)
            localStorage.setItem('userId', user.id)
          }}
        />
      ) : (
        <>
          <div ref={chatContainerRef} className='chat-area'>
            <ul className='chat-container'>
              {[...chats].reverse().map((chat) => <ChatBubble key={chat.id} chat={chat} fromMe={chat.name === user?.name} />)}
            </ul>
          </div>
          <input value={body} onChange={({ target }) => setBody(target.value)} />
          <button onClick={onSendButtonClicked}>Send</button>
        </>
      )}
    </div>
  )
}

export default Page
