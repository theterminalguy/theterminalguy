import React from 'react'

const Link = ({children, url}) => (
	<a href={url} target="_blank" rel="noopener">
		{children}
	</a>
);

export default Link;
