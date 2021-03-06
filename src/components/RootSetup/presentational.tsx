import * as React from 'react';
import styles from './styles.less';
import Flex, { FlexItem } from 'styled-flex-component';
import Input from 'src/components/Input/container';
import Button from 'src/components/Button/container';
import posed from 'react-pose';
import logo from 'images/logo.png';
import LANG from 'src/constants/lang';

interface IPropTypes {
	playerOneName: string;
	playerTwoName: string;
	children?: any;
	isStartDisabled: boolean;
	startButtonTitle: string;
	onPlayerOneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onPlayerTwoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onStart: React.MouseEventHandler<any>;
	onLeaderboardClick: React.MouseEventHandler<any>;
}

const Container = posed.div({
	exit: {
		opacity: 0
	},
	enter: {
		opacity: 1,
		delay: 300
	}
});

const RootSetup: React.SFC<IPropTypes> = ({
	playerOneName,
	playerTwoName,
	isStartDisabled,
	startButtonTitle,
	onPlayerOneChange,
	onPlayerTwoChange,
	onStart,
	onLeaderboardClick,
	...props
}) => {
	return (
		<Container {...props}>
			<Flex column justifyCenter alignCenter className={styles.container}>
				<FlexItem>
					<img src={logo} className={styles.logo} />
				</FlexItem>
				<FlexItem >
					<Input tabIndex={1} placeholder={LANG.playerOne} value={playerOneName} spellCheck={false} className={styles.input} onChange={onPlayerOneChange} />
				</FlexItem>
				<FlexItem>
					<Input tabIndex={2} placeholder={LANG.playerTwo} value={playerTwoName} spellCheck={false} className={styles.input} onChange={onPlayerTwoChange} />
				</FlexItem>
				<FlexItem>
					<Button tabIndex={3} className={styles.button} isDisabled={isStartDisabled} title={startButtonTitle} onClick={onStart}>{LANG.start}</Button>
					<Button tabIndex={4} className={styles.button} onClick={onLeaderboardClick}>{LANG.leaderboard}</Button>
				</FlexItem>
			</Flex>
		</Container>
	)
};

export default RootSetup;
