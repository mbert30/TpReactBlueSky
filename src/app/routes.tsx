import { Routes as ReactRoutes, Route} from 'react-router';
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import Profile from '../pages/Profile.tsx';
import NotFound from '../pages/NotFound.tsx';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/profile/" element={<Profile />}/>
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
};

export default Routes;