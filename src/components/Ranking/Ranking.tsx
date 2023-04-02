import './Ranking.css'
import { styled } from '@mui/material/styles'
import { TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Table, TableBody } from '@mui/material'
import { IPlayerInfo, IPlayerRanking } from '../../@types/Player.type';
import { useContext, useEffect, useState } from 'react';
import { GameRoundContext } from '../../context/GameRound/GameRound.context';
import { useSocket } from '../../context/Socket/Socket.context';
import GameInfo from '../GameInfo/GameInfo';
import { GameInfoContext } from '../../context/GameInfo/GameInfo.context';


// let  TEST_DATA: IPlayerInfo[];
let playerRanking: IPlayerRanking[] = Array(5).fill({
    id: 55,
    name: "-",
    score: "-"
})


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.ranking.header,
      border: 0,
      color: "white",
      padding: "3px 16px"
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      color: 'white',
      border: 0
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.ranking.even

    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.ranking.odd,

    }
  }));

export default function Ranking() {
    const {player1, setPlayer1} = useContext(GameInfoContext)
    const {animationDone} = useContext(GameRoundContext)
    const {socket, isConnected} = useSocket();

    useEffect(() => {
      let isMounted = true;
    
        if(isConnected)
        socket!.on('ranking', (response: IPlayerRanking[])=>{
            const found = response.find(rank => {
               return rank.id === player1.id
            })
            
            if(found){
                setPlayer1(prev => ({...prev, points: found.score}))
            }
            playerRanking = response
        })

      return () => {
        isMounted = false
      }
    }, [animationDone])
    


  return (
        <div className="rankingContainer">
            <div className='rankingHeader'>
                <div className="rankingIcon">
                    🏆
                </div>
                <div className="rankingName">
                    Ranking
                </div>
            </div>
            <div className='rankingTable'>
                <TableContainer sx={{ border: 1, borderRadius: 2, borderColor: "#616b824c"}}>
                    <Table >
                    <TableHead >
                        <TableRow className='rankingTableRow'>
                            <StyledTableCell className={'rankingRows'}>No.</StyledTableCell>
                            <StyledTableCell className={'rankingRows'}>Name</StyledTableCell>
                            <StyledTableCell className={'rankingRows'}>Score</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            playerRanking !== undefined && playerRanking.map((player: IPlayerRanking, index)=>{
                                return (
                                    <StyledTableRow key={player.name+index}
                                    style={{
                                        backgroundColor: player.id === player1.id ? "#3e4556" : ''
                                    }}
                                    className='rankingTableRow'>
                                        <StyledTableCell component="th" scope="row" className={'rankingRows'}>{index+1}</StyledTableCell>
                                        <StyledTableCell className={'rankingRows'}>{player.name}</StyledTableCell>
                                        <StyledTableCell className={'rankingRows'}>{player.score}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
  )
}
