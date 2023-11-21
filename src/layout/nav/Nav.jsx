import "./Nav.scss";
import { Container } from "../../utils";
import logo from "../../assets/images/logo.svg";
import { NavLink, useLocation } from 'react-router-dom';
import { useValue } from '../../context/AppProvider';
import { useFetch } from '../../helpers/hooks/useFetch';
import { FaUser } from "react-icons/fa";

const Nav = ({ type }) => {
  const [state] = useValue();
  const { data, loading, error } = useFetch(`/api/users/${state.auth.user_id}`)
  const { pathname } = useLocation();

  return pathname.includes("/auth") || pathname.includes("/admin") ? null : (
    <nav className='nav'>
      <Container>
        <div className="nav__wrapper">
          <div className="nav__logo">
            <img width={200} height={40} src={logo} />
            <h1 className="nav__seo-title">Medium</h1>
          </div>


          <ul className='nav__list'>
            <li className='nav__item'><NavLink end className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/">Home</NavLink></li>
            <li className='nav__item'><NavLink className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/membership">Membership</NavLink></li>
            <li className='nav__item'><NavLink className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/articles">Articles</NavLink></li>

          </ul>

          <div className="user-profile">
            {!data && error ?
              <>
                <NavLink className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/auth/login">Login</NavLink>
                <NavLink className={({ isActive }) => isActive ? "nav__link nav__link--active btn" : "nav__link btn"} to="/auth/signup">Get Started</NavLink>
              </>
              :
              <NavLink className="nav__link" to="/admin"><FaUser />{loading ? <div class="loader"></div> : data?.data.firstname}</NavLink>
            }
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Nav