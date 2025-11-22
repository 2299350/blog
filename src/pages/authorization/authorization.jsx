import { useState, useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Input, Button, H2 } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(/^\w+$/, 'Логин может содержать только буквы, цифры и _')
		.min(3, 'Логин должен содержать минимум 3 символа')
		.max(15, 'Логин должен содержать максимум 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Пароль может содержать только буквы, цифры и символы _ # %',
		)
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(30, 'Пароль должен содержать максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 8px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #ffe0e0;
	color: #900;
	padding: 12px;
	border-radius: 6px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const store = useStore();
	const navigate = useNavigate();
	const role_id = useSelector(selectUserRole);

	useEffect(() => {
		let currentLogoutSwitcher = store.getState().app.logoutSwitcher;

		return store.subscribe(() => {
			const prevLogoutSwitcher = currentLogoutSwitcher;
			currentLogoutSwitcher = store.getState().app.logoutSwitcher;

			if (currentLogoutSwitcher !== prevLogoutSwitcher) {
				reset();
			}
		});
	}, [store, reset]);

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}
			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	useEffect(() => {
		if (role_id !== ROLE.GUEST) {
			navigate('/');
		}
	}, [role_id, navigate]);

	return (
		<div className={className}>
			<H2>Авторизация:</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		width: 300px;
		display: flex;
		row-gap: 10px;
		flex-direction: column;
	}
`;
