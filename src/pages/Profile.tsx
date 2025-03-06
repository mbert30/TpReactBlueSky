import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../ui/NavBar';
import AuthGuard from '../app/authGuard';
import { useAppDispatch } from '../app/store';
import TweetListProfil from '../domains/tweets/components/TweetListeProfile';
import { getUserById } from '../domains/auth/authSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();

  const [username, setUsename] = useState('');
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await dispatch(getUserById(Number(userId)));
      if(!res.payload) {
        return;
      }
      setUsename(res.payload.username);
    };
    fetchUser();
  }, [userId]);
  
  return(
    <Fragment>
      <Navbar />
      {username ? (
        <div className='mt-15 min-w-full min-h-full bg-(--dm-surface-a0)'>
          <div className="m-auto max-w-2xl border border-(--dm-surface-a30) rounded-lg bg-(--dm-surface-a20) overflow-hidden">
        {/* Banner */}
        <div className="h-20 bg-cover bg-center bg-(--dm-surface-a10)"></div>
        
        {/* Profile Section */}
        <div className="p-4">
          <div className="flex items-center z-50">
            <img 
          src='/user.png' 
          alt='user.png' 
          className="w-24 h-24 rounded-full border-4 border-(--dm-surface-a30) -mt-12"
            />
            <div className="ml-4">
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-500">@{username}</p>
            </div>
          </div>
          
          {/* Follow stats */}
          <div className="flex space-x-4 mt-2 text-gray-500">
            <span><strong>{0}</strong> Following</span>
            <span><strong>{0}</strong> Followers</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-(--dm-surface-a30) flex justify-around text-gray-400 p-2 bg-(--dm-surface-a10)">
          <button className="font-bold text-(--clr-light-a0)">Liste des Posts</button>
        </div>
          </div>
          <div className='m-auto mt-2 max-w-2xl rounded-lg bg-(--dm-surface-a10)'>
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
    </Fragment>
  )
}

export default AuthGuard(Profile);