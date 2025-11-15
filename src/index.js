import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Blog from './blog';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Blog />
	</BrowserRouter>,
);
