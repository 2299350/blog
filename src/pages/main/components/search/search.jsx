import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '../../../../components';

const SearchContainer = ({ className, searchValue, onChange }) => {
	return (
		<div className={className}>
			<input
				type="text"
				placeholder="Поиск статей..."
				value={searchValue}
				onChange={({ target }) => onChange(target.value)}
			/>
			<Icon id="fa-search" className="search-icon" />
		</div>
	);
};

SearchContainer.propTypes = {
	className: PropTypes.string,
	searchValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export const Search = styled(SearchContainer)`
	position: relative;
	margin-top: 20px;
	width: 880px;

	input {
		width: 100%;
		padding: 10px 40px 10px 15px;
		font-size: 16px;
		border: 1px solid #000;
		outline: none;
		box-sizing: border-box;

		&:focus {
			border-color: #555;
		}
	}

	.search-icon {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
	}
`;
