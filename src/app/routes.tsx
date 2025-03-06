import { Routes as ReactRoutes, Route} from 'react-router';
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import Signup from '../pages/Signup.tsx';
import Profile from '../pages/Profile.tsx';
import NotFound from '../pages/NotFound.tsx';
import TweetList from '../domains/tweets/components/TweetList.tsx';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/signup/" element={<Signup />}/>
      <Route path="/profile/:userId" element={<Profile />}/>
      <Route path="/tweets/" element={<TweetList />}/>
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
};

export default Routes;