import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, currentPage, pageCount, onPageChange }) => {
	if (pageCount <= 1) {
		return null;
	}

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pageCount;

	return (
		<div className={className}>
			<button type="button" onClick={() => onPageChange(1)} disabled={isFirstPage}>
				В начало
			</button>

			<button
				type="button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={isFirstPage}
			>
				Предыдущая
			</button>

			<div className="page-info">
				<span>Страница: </span>
				<strong>
					{currentPage} / {pageCount}
				</strong>
			</div>

			<button
				type="button"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={isLastPage}
			>
				Следующая
			</button>

			<button
				type="button"
				onClick={() => onPageChange(pageCount)}
				disabled={isLastPage}
			>
				В конец
			</button>
		</div>
	);
};

PaginationContainer.propTypes = {
	className: PropTypes.string,
	currentPage: PropTypes.number.isRequired,
	pageCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-top: auto;
	padding: 20px 0;

	span {
		margin-right: 4px;
	}

	button {
		min-width: 120px;
		height: 36px;
		padding: 0 12px;
		border: 1px solid #000;
		background: #fff;
		cursor: pointer;
		font-size: 14px;

		&:hover:not(:disabled) {
			background: #f3f3f3;
		}

		&:disabled {
			cursor: default;
			opacity: 0.5;
		}
	}

	.page-info {
		min-width: 140px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #000;
		background: #fff;
		font-size: 14px;
	}
`;
