import { Fragment, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ShowTweet from './ShowTweet'
import { useNavigate } from "react-router";

const TweetCard = ({id, userId, username, body, createdAt, likes, retweets, reloadFeed} : {id: number, userId: number, username: string, body: string, createdAt : Date, likes: number, retweets: number, reloadFeed: () => void}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUsernameClick = () => {
    navigate("/profile/"+userId)
  };

  return (
    <Fragment>
      {username ? (
      <div key={id} className="flex gap-3 mb-4 border-b p-5 last:border-none bg-(--dm-surface-a10) cursor-pointer">
        <img src="/user.png" alt={'user_'+username} className="rounded-full w-10 h-10"/>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-(--clr-light-a0)" onClick={handleUsernameClick}>{username}</span>
          </div>
          <p className="text-(--clr-light-a0) text-xl mt-1" onClick={handleCardClick}>{body}</p>
          <span className="text-gray-400 text-xs">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-(--clr-light-a0) text-sm mr-5">Likes: {likes}</span>
          </div>
        </div>
      </div>
      ) : (
      <div className="text-center text-gray-500">Aucun utilisateur n'a été trouvé</div>
      )}
      {isModalOpen && (
      <ShowTweet
        id={id}
        userId={userId}
        username={username}
        body={body}
        createdAt={createdAt}
        likes={likes}
        retweets={retweets}
        onClose={handleCloseModal}
        reloadFeed={reloadFeed}
      />
      )}
    </Fragment>
  );
};

export default TweetCard;