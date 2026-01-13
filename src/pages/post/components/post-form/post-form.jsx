import { useLayoutEffect, useRef } from 'react';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	id,
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

	const isDisabled = false;

	useLayoutEffect(() => {
		if (imageRef.current) {
			imageRef.current.value = image_url;
		}
		if (titleRef.current) {
			titleRef.current.value = title;
		}
		if (contentRef.current) {
			contentRef.current.innerText = content;
		}
	}, [image_url, title, content]);

	const onSaveClick = () => {
		const newContent = sanitizeContent(contentRef.current.innerText);

		onSave({
			id,
			image_url: imageRef.current.value,
			title: titleRef.current.value,
			content: newContent,
		});
	};

	return (
		<div className={className}>
			{/* Поля ввода через Ref */}
			<Input ref={imageRef} defaultValue={image_url} placeholder="Изображение..." />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />

			<div className="special-panel">
				<div className="special-panel-date">
					<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
					{published_at}
				</div>
				<div className="special-panel-icons">
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSaveClick}
					/>
					<Icon
						id="fa-trash-o"
						size="21px"
						disabled={isDisabled}
						className={isDisabled ? 'icon-disabled' : ''}
						onClick={() => {
							if (isDisabled) return;
							onPostDelete(id);
						}}
					/>
				</div>
			</div>

			<div className="post-text">
				<div
					contentEditable={true}
					suppressContentEditableWarning={true}
					className="text-content"
					ref={contentRef}
				>
					{content}
				</div>
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
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
		white-space: pre-line;
		background-color: #fff;
	}

	img {
		float: left;
		margin: 0 20px 10px 0;
		max-width: 300px;
	}

	.text-content {
		outline: none;
		min-height: 80px;
	}
`;
