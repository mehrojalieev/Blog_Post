import { Outlet } from 'react-router-dom'
import Sidebar from '../../layout/sidebar/Sidebar'
import "./AdminContainer.scss"
import { useNavigate } from 'react-router-dom'

const AdminContainer = () => {
    // window.location.reload()
    const navigate = useNavigate()
    return (
        <div className='admin-container'>
            <Sidebar />
            <div className="admin-container__content">
                <header className="admin-container__header">
                    <h1>{}</h1>
                </header>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminContainer