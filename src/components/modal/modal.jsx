import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
import { closeModal } from '../../actions';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const dispatch = useDispatch();

	if (!isOpen) return null;

	return (
		<div className={className}>
			{/* Оверлей закрывает окно при клике на фон */}
			<div className="overlay" onClick={() => dispatch(closeModal())}></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<button onClick={onConfirm}>Да</button>
					<button onClick={onCancel}>Отмена</button>
				</div>
			</div>
		</div>
	);
};

ModalContainer.propTypes = {
	className: PropTypes.string,
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	width: 100%;
	height: 100%;

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.box {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		width: 400px;
		margin: 0 auto;
		padding: 20px;
		background-color: #fff;
		border: 2px solid #000;
		text-align: center;
		z-index: 30;
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 20px;
	}

	.buttons button {
		width: 120px;
		padding: 5px 10px;
		font-size: 16px;
		cursor: pointer;
		background-color: #eee;
		border: 1px solid #000;
		transition: background-color 0.2s;
	}

	.buttons button:hover {
		background-color: #ccc;
	}
`;
