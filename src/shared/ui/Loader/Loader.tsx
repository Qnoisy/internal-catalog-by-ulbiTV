import React from 'react';
import './Loader.scss';

interface LoaderProps {
	className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => (
	<div className='lds-default'>
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
);
