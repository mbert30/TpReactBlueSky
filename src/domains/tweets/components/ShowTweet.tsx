import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { toast } from 'react-toastify';
import { messageErreur } from '../../../app/toastStyle';
import { deleteTweet, editTweet } from '../tweetSlice';

const ShowTweet = ({ id, userId, username, body, createdAt, likes, retweets, onClose, reloadFeed }: { id: number, userId: number, username: string, body: string, createdAt: Date, likes: number, retweets: number, onClose: () => void, reloadFeed: () => void}) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(body);

  const infoConn = useAppSelector((state: { auth: {token: string, isLogged: boolean, userInfo: { username: string, id: number } }}) => state.auth)

  const handleUpdate = async () => {
    if (editedContent.trim() === '') {
      toast.error("Erreur : Le tweet ne peut être vide", messageErreur);
      return;
    }
    await dispatch(editTweet({ id: id, body: editedContent, userId: infoConn.userInfo.id }))
    reloadFeed()
    onClose()
  };

  const handleDelete = async () => {
    //TODO: Faire mieux pour la demande utilisateur
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce tweet ?")) {
      return;
    }
    await dispatch(deleteTweet(id))

    reloadFeed()
    onClose()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-51">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <span className="text-gray-500 hover:text-gray-700 cursor-pointer float-right" onClick={onClose}>&times;</span>
      {isEditing ? (
        <div>
        <textarea
          className="w-full p-2 border rounded mt-4"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleUpdate}>Update</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        </div>
      ) : (
        <div>
        <div className="flex items-center space-x-3">
          <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-white text-lg">{username.charAt(0)}</span>
          </div>
          <div>
          <h2 className="text-lg font-bold">{username}</h2>
          <p className="text-gray-500 text-sm">{createdAt.toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-4">{body}</p>
        {
          infoConn.userInfo.id === userId && (
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
            </div>
        )}
        </div>
      )}
      </div>
    </div>
  );
};

export default ShowTweet;