import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Profile = () => {
	return (
		<div className='card mt-5 mb-5'>
			<h5 className='card-header p-3'>Mój Profil</h5>
			<div className='card-body'>
				<ul className='nav nav-tabs '>
					<li className='nav-item'>
						<NavLink end to={`/profil`} className='nav-link'>
							Profil
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to={`/profil/hotele`} className='nav-link'>
							Hotele
						</NavLink>
					</li>
				</ul>
				<div className='p-4'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Profile;
