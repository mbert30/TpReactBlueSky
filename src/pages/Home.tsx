// import AuthGuard from "../app/authGuard"

import TweetList from "../domains/tweets/components/TweetList"

const Home = () => {
  return (
    <div className="w-full h-full flex bg-(--dm-surface-a0) overflow-x-scroll overflow-y-auto">
      <TweetList />
    </div>

  )
}

export default Home