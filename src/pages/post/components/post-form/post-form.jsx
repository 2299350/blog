import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	id, // Нам нужен ID, чтобы понять, создаем мы или редактируем
	title,
	image_url,
	content,
	published_at,
	onSave,
	onPostDelete,
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const [error, setError] = useState(null);

	// Если даты нет (создание), берем текущую дату в формате YYYY-MM-DD
	const dateToDisplay = published_at || new Date().toISOString().substring(0, 10);

	useLayoutEffect(() => {
		// Используем оператор || '', чтобы избежать 'undefined' в полях
		if (imageRef.current) {
			imageRef.current.value = image_url || '';
		}
		if (titleRef.current) {
			titleRef.current.value = title || '';
		}
		if (contentRef.current) {
			contentRef.current.innerHTML = content || '';
		}
	}, [image_url, title, content]);

	const onSaveClick = () => {
		const contentVal = contentRef.current.innerHTML;
		const textContent = contentRef.current.innerText.trim(); // Для проверки на пустоту

		if (!imageRef.current.value || !titleRef.current.value || !textContent) {
			setError('Заполните все поля');
			return;
		}

		const newContent = sanitizeContent(contentVal);

		onSave({
			id,
			image_url: imageRef.current.value,
			title: titleRef.current.value,
			content: newContent,
		});
	};

	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={image_url || ''}
				placeholder="Изображение..."
				onChange={() => setError(null)} // Сбрасываем ошибку при вводе
			/>
			<Input
				ref={titleRef}
				defaultValue={title || ''}
				placeholder="Заголовок..."
				onChange={() => setError(null)} // Сбрасываем ошибку при вводе
			/>

			<div className="special-panel">
				<div className="special-panel-date">
					<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
					{/* Показываем вычисленную дату */}
					{dateToDisplay}
				</div>
				{/* Вывод ошибки, если она есть */}
				{error && <div className="error-message">{error}</div>}
				<div className="special-panel-icons">
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						disabled={!!error}
						className={error ? 'icon-disabled' : ''}
						onClick={onSaveClick}
					/>
					{/* Показываем кнопку удаления ТОЛЬКО если есть ID (редактирование) */}
					{id && (
						<Icon
							id="fa-trash-o"
							size="21px"
							onClick={() => {
								onPostDelete(id);
							}}
						/>
					)}
				</div>
			</div>

			<div className="post-text">
				<div
					placeholder="Текст статьи..."
					contentEditable={true}
					suppressContentEditableWarning={true}
					className="text-content"
					ref={contentRef}
					onInput={() => setError(null)} // Сбрасываем ошибку при вводе
				></div>
			</div>
		</div>
	);
};

PostFormContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	image_url: PropTypes.string,
	content: PropTypes.string,
	published_at: PropTypes.string,
	onSave: PropTypes.func.isRequired,
	onPostDelete: PropTypes.func.isRequired,
};

export const PostForm = styled(PostFormContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > input {
		width: 100%;
		margin-bottom: 10px;
	}

	.special-panel {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
	}

	.special-panel-icons {
		display: flex;
		align-items: center;
	}

	.special-panel-date {
		display: flex;
		align-items: center;
	}

	.post-text {
		min-height: 80px;
		border: 1px solid #000;
		padding: 10px;
		font-size: 18px;
		white-space: pre-wrap;
		background-color: #fff;
		width: 100%;
	}

	img {
		float: left;
		margin: 0 20px 10px 0;
		max-width: 300px;
	}

	.text-content {
		outline: none;
		min-height: 80px;
		word-break: break-all;
	}
	.text-content:empty::before {
		content: attr(placeholder);
		color: #757575;
	}

	.error-message {
		color: #d9534f;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
	}

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}
`;
