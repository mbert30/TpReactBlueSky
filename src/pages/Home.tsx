import { Fragment } from "react/jsx-runtime"
import AuthGuard from "../app/authGuard"
import TweetList from "../domains/tweets/components/TweetList"
import Navbar from "../ui/NavBar"

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="mt-15 min-w-full min-h-full flex bg-(--dm-surface-a0)">
        <TweetList />
      </div>
    </Fragment>

  )
}

export default AuthGuard(Home)