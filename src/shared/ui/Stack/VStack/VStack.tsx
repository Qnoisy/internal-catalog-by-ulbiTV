import React from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack: React.FC<VStackProps> = props => {
	return <Flex {...props} direction='column'></Flex>;
};
