import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

function App() {
	return (
		<Div>
			<div>123</div>
			<i className="fa fa-camera-retro"></i> fa-camera-retro
			<br />
			<a href="http://localhost:4000/users">Users</a>
		</Div>
	);
}

export default App;
