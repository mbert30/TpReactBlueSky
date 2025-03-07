import { Fragment } from 'react/jsx-runtime'
import { loadFeedProfile } from '../tweetSlice'
import { Tweet } from '../types'
import TweetCard from './TweetCard'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store'

const TweetListeProfile = ({ userId } : {userId: number}) => {
  const dispatch = useAppDispatch()
  const tweets = useAppSelector((state: { tweets: Tweet[] }) => state.tweets)

  useEffect(()=> {
    dispatch(loadFeedProfile(userId))
  }, [])

  const reloadFeed = () => {
    dispatch(loadFeedProfile(userId))
  }

  return (
    <Fragment>
      <div className='mt-5 mx-1'>
        {
          (tweets.length === 0)
            ? <div className='mt-5 mx-auto flex'> <p className='mx-auto text-(--clr-light-a0) '>Aucun tweet pour l'instant</p></div>
            : tweets.map((t: Tweet) => t.user && t.id !== undefined ? <TweetCard key={t.id} id={t.id} userId={t.userId} username={t.user.username} body={t.body} createdAt={t.createdAt} likes={t.likes} retweets={t.retweets} reloadFeed={reloadFeed} /> : null)
        }
      </div>
    </Fragment>
  )
}

export default TweetListeProfile