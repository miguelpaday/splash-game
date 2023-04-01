import './Ranking.css'
import { styled } from '@mui/material/styles'
import { TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Table, TableBody } from '@mui/material'
import { IPlayer } from '../../@types/Player.type';


const TEST_DATA: IPlayer[] = [
    {
        id: 1,
        name: "CPU 1",
        points: 0
    },
    {
        id: 2,
        name: "CPU 2",
        points: 0
    },
    {
        id: 3,
        name: "CPU 3",
        points: 0
    },
    {
        id: 4,
        name: "CPU 4",
        points: 0
    },
    {
        id: 5,
        name: "CPU 5",
        points: 0
    },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.ranking.header,
      border: 0,
      color: "white"
      
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
                            TEST_DATA.map((player: IPlayer)=>{
                                return (
                                    <StyledTableRow key={player.name} className='rankingTableRow'>
                                        <StyledTableCell component="th" scope="row" className={'rankingRows'}>{player.id}</StyledTableCell>
                                        <StyledTableCell className={'rankingRows'}>{player.name}</StyledTableCell>
                                        <StyledTableCell className={'rankingRows'}>{player.points}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
{/* 
                    <StyledTableRow className='rankingTableRow'>
                        <StyledTableCell component="th" scope="row" className={'rankingRows'}>aw</StyledTableCell>
                        <StyledTableCell className={'rankingRows'}>aw</StyledTableCell>
                        <StyledTableCell className={'rankingRows'}>aw</StyledTableCell>
                    </StyledTableRow> */}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
  )
}
