import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutRedirect({ loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      // 当用户登出时，跳转到主页
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return null; // 该组件不渲染任何内容
}

export default LogoutRedirect;