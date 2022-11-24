const Layout = (props) => {
	return (
		<div>
			<div>{props.menu}</div>
			<div>{props.header}</div>
			<div className='container'>{props.content}</div>
			<div>{props.footer}</div>
		</div>
	);
};

export default Layout;
