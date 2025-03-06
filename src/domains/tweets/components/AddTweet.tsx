import { useState } from "react"
import ButtonPrincipal from "../../../ui/ButtonPrincipal"
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
    <div className="px-20 py-5 flex flex-col border border-(--dm-surface-a30) bg-(--dm-surface-a10) justify-center content-center">
      <h2 className="mb-5 text-(--clr-light-a0)">Ecrire un nouveau post</h2>
      <form className="flex flex-col" onSubmit={submitNewTweet}>
        <textarea className="mb-5 text-(--clr-light-a0) bg-(--dm-surface-a20)" value={newTweet} onChange={(valeur: any) => setNewTweet(valeur.target.value)}></textarea>
        <ButtonPrincipal />
      </form>

    </div>
  )
}

export default AddTweet