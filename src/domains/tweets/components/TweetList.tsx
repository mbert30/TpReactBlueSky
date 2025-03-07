import { Fragment } from 'react/jsx-runtime'
import { loadFeed } from '../tweetSlice'
import { Tweet } from '../types'
import TweetCard from './TweetCard'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import AddTweet from './AddTweet'

const TweetList = () => {
  const dispatch = useAppDispatch()
  const tweets = useAppSelector((state: { tweets: Tweet[] }) => state.tweets)
  const [typeTri, setTypeTri] = useState<'ByDate'|'ByPopularity'|'ByFollow'>('ByDate')

  useEffect(()=> {
    dispatch(loadFeed(typeTri))
  }, [typeTri])

  const reloadFeed = () => {
    dispatch(loadFeed(typeTri))
  }

  return (
    <Fragment>
      <div className='mx-auto flex flex-col w-2xl'>
        <div>
          <div className='mt-5 mx-2'>
            <AddTweet reloadFeed={reloadFeed}/>
          </div>
        </div>
        <div className='mt-5 mx-4 flex'>
          <p className='text-(--clr-light-a0)'>Trier par : </p>
            <select className='text-(--clr-light-a0)' onChange={(e) => setTypeTri(e.target.value as 'ByDate'|'ByPopularity'|'ByFollow')}>
            <option className='text-(--clr-dark-a0)' value={'ByDate'}>Ordre chronologique</option>
            <option className='text-(--clr-dark-a0)' value={'ByPopularity'}>Popularité</option>
            <option className='text-(--clr-dark-a0)' value={'ByFollow'}>Suivi</option>
            </select>
        </div>
        <div className='mt-5 mx-2' >
          {(tweets.length === 0) 
          ? <div className='mt-5 mx-auto flex'> <p className='mx-auto text-(--clr-light-a0) '>Aucun tweet pour l'instant</p></div>
          : tweets.map((t:Tweet) => t.user && t.id !== undefined ? <TweetCard id={t.id} userId={t.userId} username={t.user.username} body={t.body} createdAt={t.createdAt} likes={t.likes} retweets={t.retweets} reloadFeed={reloadFeed} /> : null)}
        </div>
      </div>

    </Fragment>
  )
}

export default TweetList