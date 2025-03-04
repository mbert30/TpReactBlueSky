import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'
import { addTweet } from '../tweetSlice'
import { Tweet } from '../types'
import TweetCard from './TweetCard'

const TweetList = () => {
  const dispatch = useDispatch()
  const tweets = useSelector((state: { tweets: Tweet[] }) => state.tweets)
  return (
    <Fragment>
      <div className='mx-auto flex flex-col '>
        <div>
          <div className=''>
            <button onClick={()=>{ dispatch(addTweet({id:1, username:'David', body: 'TITRE', createdAt:'2021-05-30T00:00:00Z'})) }}>Nouveau tweet</button>
          </div>
        </div>
        <div>
          {tweets.map((t:Tweet) => <TweetCard id={t.id} username={t.author_id} body={t.body} createdAt={t.createdAt} />)}
        </div>
      </div>

    </Fragment>
  )
}

export default TweetList