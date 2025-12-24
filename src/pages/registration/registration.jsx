import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Input, Button, H2, AuthFormError } from '../../components';
import { useResetForm } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { setUserSession } from '../../utils';
import styled from 'styled-components';

const regFormSchema = yup.object().shape({
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
	passCheck: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role_id = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}
			dispatch(setUser(res));
			setUserSession(res);
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;

	const errorMessage = formError || serverError;

	useEffect(() => {
		if (role_id !== ROLE.GUEST) {
			navigate('/');
		}
	}, [role_id, navigate]);

	return (
		<div className={className}>
			<H2>Регистрация:</H2>
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
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passCheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
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
