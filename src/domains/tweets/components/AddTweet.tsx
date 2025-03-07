import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { addTweet } from "../tweetSlice"

const AddTweet = ({reloadFeed} : {reloadFeed: () => void}) => {
  const [newTweet, setNewTweet] = useState('')
  const dispatch = useAppDispatch()
  const infoConn = useAppSelector((state: { auth: {token: string, isLogged: boolean, userInfo: { username: string, id: number } }}) => state.auth)
  const submitNewTweet = async (e: any) => {
    e.preventDefault()
    await dispatch(addTweet({ body: newTweet, userID: infoConn.userInfo.id }))
    reloadFeed()
  }
  return (
    <div className="px-5 py-3 flex flex-col border border-(--dm-surface-a30) bg-(--dm-surface-a10) rounded-lg w-full max-w-2xl mx-auto">
      <form className="flex flex-col space-y-3" onSubmit={submitNewTweet}>
        <div className="flex items-start space-x-3">
          <img src='/user.png' alt="Avatar" className="w-10 h-10 rounded-full" />
          <textarea 
          className="flex-1 bg-transparent text-(--clr-light-a0) outline-none text-lg resize-none"
          placeholder="Que se passe-t-il ?!"
          value={newTweet} 
          onChange={(e) => setNewTweet(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end items-center text-blue-500">
          <button 
            type="submit" 
            className="px-4 py-2 bg-gray-500 text-white rounded-full" 
            disabled={!newTweet.trim()}>Envoyer
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTweet