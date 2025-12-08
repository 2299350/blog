import { H2, Icon } from '../../../../components';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	id,
	title,
	image_url,
	content,
	published_at,
}) => {
	const isDisabled = false;

	if (!id) {
		return <div className={className}>Загрузка поста...</div>;
	}

	return (
		<div className={className}>
			<img src={image_url} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div>{published_at}</div>
			</div>
			<div className="special-panel-icons">
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					disabled={isDisabled}
					className={isDisabled ? 'icon-disabled' : ''}
					onClick={() => {
						if (isDisabled) return;

						// onUserDelete(id);
					}}
				/>
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					disabled={isDisabled}
					className={isDisabled ? 'icon-disabled' : ''}
					onClick={() => {
						if (isDisabled) return;

						// onUserDelete(id);
					}}
				/>
			</div>
			<div>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	width: 100%;
	margin-top: 20px;

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}
`;
