import { Fragment } from "react/jsx-runtime";
import { formatDistanceToNow } from "date-fns";

const TweetCard = ({id, username, body, createdAt} : {id: number, username: number, body: string, createdAt : Date}) => {
  return (
    <Fragment>
      <div key={id} className="flex gap-3 mb-4 border-b p-5 last:border-none bg-(--dm-surface-a10)">
        <img src="./user.png" alt={'user_'+username} className="rounded-full w-10 h-10"/>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{username}</span>
            <span className="text-gray-500 text-sm">{"handle"}</span>
          </div>
          <p className="text-gray-800 text-sm mt-1">{body}</p>
          <span className="text-gray-400 text-xs">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Fragment>
  )
}

export default TweetCard