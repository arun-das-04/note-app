import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Landing = () => {

  const navigate = useNavigate();

  const userid = useSelector(state => state.user.userid);
  const islogged = useSelector(state => state.user.islogged);

  useEffect(() => {
    if(userid && islogged) {
      navigate('/notes');
    }
    else{
      navigate('/auth');
    }
  }, []);
  



  return (
    <div>landing Page</div>
  )
}

export default Landing;
