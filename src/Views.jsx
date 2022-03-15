import { Outlet, Routes, Route} from 'react-router-dom';
import image from "./assets/bg.jpg";
import Posts from './components/Posts';
import Post from './components/Post';
import Author from './components/Author';

const Views = () => {
  return (
    <Routes>
        <Route index element={<div><img src={image} width="100%" height="100%"  alt='bg'/></div>} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post" element={
            <Outlet />
        } >
            <Route path=":id" element={<Post />} />
        </Route>
        <Route path="/author" element={<Author />} />
        <Route path="*" element={<div>404 Not Found!!</div>} />
    </Routes>
  )
}

export default Views