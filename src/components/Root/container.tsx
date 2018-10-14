import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import Root from './presentational';
import Teams from 'src/enums/Teams';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { IGridSquare } from 'src/constants/setup';
import generateGame from 'src/utils/generateGame';

export default compose(
	withState('data', 'setData', () => generateGame()),
	withState('isPlaying', 'setIsPlaying', false),
	withState('activeTeam', 'setActiveTeam', Teams.Red),
	withState('winner', 'setWinner'),
	withState('redTeamName', 'setRedTeamName'),
	withState('yellowTeamName', 'setYellowTeamName'),
	withState('isLeaderboardVisible', 'setIsLeaderboardVisible', false),
	withPropsOnChange(['activeTeam', 'redTeamName', 'yellowTeamName'], ({ activeTeam, redTeamName, yellowTeamName }: any) => ({
		currentPlayer: activeTeam === Teams.Red ? redTeamName : yellowTeamName
	})),
	withHandlers({
		reset: ({ setIsLeaderboardVisible, setIsPlaying, setActiveTeam, setRedTeamName, setYellowTeamName, setWinner, setData }: any) => () => {
			setIsLeaderboardVisible(false);
			setIsPlaying(false);
			setActiveTeam(Teams.Red);
			setRedTeamName(null);
			setYellowTeamName(null);
			setWinner(null);
			setData(generateGame());
		}
	}),
	withHandlers({
		onStart: ({ setIsPlaying, setRedTeamName, setYellowTeamName }: any) => (playerOneName: string, playerTwoName: string) => {
			setRedTeamName(playerOneName);
			setYellowTeamName(playerTwoName);
			setIsPlaying(true);
		},

		onPlayerTakesTurn: ({ redTeamName, yellowTeamName, activeTeam, setActiveTeam, setIsLeaderboardVisible, setWinner, setData }: any) => (data: IGridSquare[], winner?: Teams) => {
			if (winner) {
				setWinner(winner === Teams.Red ? redTeamName : yellowTeamName);
				setIsLeaderboardVisible(true);
			}

			setData(data);
			setActiveTeam(activeTeam === Teams.Red ? Teams.Yellow : Teams.Red);
		},

		onLeaderboardClose: ({ reset }: any) => () => {
			reset();
		}
	})
)(Root);