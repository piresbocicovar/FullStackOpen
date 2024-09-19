import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'
import { Navbar, Nav } from 'react-bootstrap'
import './Menu.css'

const Menu = () => {
  const user = useSelector(state => state.user)

  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' className='navbar-custom'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link as='div' className='nav-link-custom'>
            <Link to='/' className='nav-link-custom'>Blogs</Link>
          </Nav.Link>
          <Nav.Link as='div' className='nav-link-custom'>
            <Link to='/users' className='nav-link-custom'>Users</Link>
          </Nav.Link>
        </Nav>
        <Nav className='ms-auto d-flex align-items-center'>
          <Navbar.Text className='text-white navbar-text-custom'>
            Signed in as: {user.name}
          </Navbar.Text>
          <Nav.Item>
            <LogoutButton className='logout-button-custom' />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu