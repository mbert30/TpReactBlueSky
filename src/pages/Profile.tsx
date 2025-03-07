import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../ui/NavBar';
import AuthGuard from '../app/authGuard';
import { useAppDispatch } from '../app/store';
import TweetListProfil from '../domains/tweets/components/TweetListeProfile';
import { getUserById, followUser as handleFollowUser } from '../domains/auth/authSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const currentUserId = sessionStorage.getItem('id');
  const [infoUser, setInfoUser] = useState
  <{ username: string; following: number[]; followers: number[] }>
  ({ username: '', following: [], followers: [] });
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUser = async () => {
    const res = await dispatch(getUserById(Number(userId)));
    if(!res.payload) {
      return;
    }
    setInfoUser({ username: res.payload.username, following: res.payload.following, followers: res.payload.followers });
    console.log(infoUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setIsFollowing(infoUser.followers.includes(Number(currentUserId)));
  }, [infoUser]);

  const followUser = async () => {
    await dispatch(handleFollowUser({idFollowing: Number(userId), idFollower: Number(currentUserId)}));
    fetchUser()
  }
  
  return(
    <Fragment>
      {infoUser.username ? (
        <div className='mt-15 min-w-full min-h-full bg-(--dm-surface-a0)'>
          <div className="m-auto max-w-2xl border border-(--dm-surface-a30) rounded-lg bg-(--dm-surface-a20) overflow-hidden">
            <div className="h-20 bg-cover bg-center bg-(--dm-surface-a10)"></div>
        
            <div className="p-4">
              <div className="flex items-center relative">
              <img 
                src='/user.png' 
                alt='user.png' 
                className="w-24 h-24 rounded-full border-4 border-(--dm-surface-a30) -mt-12 z-0"
              />
              <div className="ml-4 z-0">
                <h1 className="text-2xl font-bold text-(--clr-grey-a0)">{infoUser.username}</h1>
                <p className="text-gray-500">@{infoUser.username}</p>
              </div>
              {userId !== currentUserId && (
                <button 
                  className={`absolute top-0 right-0 mt-2 mr-2 px-4 py-2 rounded-full z-0 transition-transform transform hover:scale-105 ${isFollowing ? 'bg-(--dm-primary-a40)' : 'bg-(--dm-primary-a20) text-white'}`} 
                  onClick={followUser}
                >
                {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
          
            <div className="flex space-x-4 mt-2 text-(--clr-light-a0)">
              <span><strong>{infoUser.following.length}</strong> Following</span>
              <span><strong>{infoUser.followers?.length}</strong> Followers</span>
            </div>
          </div>
        
          <div className="border-t border-(--dm-surface-a30) flex justify-around text-gray-400 p-2 bg-(--dm-surface-a10)">
            <button className="font-bold text-(--clr-light-a0)">Liste des Posts</button>
          </div>
        </div>
        <div className='m-auto mt-2 max-w-2xl'>
          <TweetListProfil userId={Number(userId)} />
        </div>
      </div>
      ) : (
        <div className='mt-15 min-w-full min-h-full bg-(--dm-surface-a0) flex justify-center'>
          <div className='mt-15 '>
            <h1 className="text-2xl font-bold text-(--clr-light-a0)">Le profil n'existe pas</h1>
          </div>
        </div>
      )}
      <Navbar />
    </Fragment>
  )
}

export default AuthGuard(Profile);