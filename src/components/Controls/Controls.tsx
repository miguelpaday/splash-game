import './Controls.css'
import React from 'react'
import { Button, Slider, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { IPlayer } from '../../@types/Player.type'
import Stepper from '../Stepper/Stepper'
import Container from '../Container/Container'

const TEST_DATA: IPlayer[] = [
    {
        id: 1,
        name: "CPU 1",
        points: 0,
        multiplier: 0
    },
    {
        id: 2,
        name: "CPU 2",
        points: 0,
        multiplier: 0
    },
    {
        id: 3,
        name: "CPU 3",
        points: 0,
        multiplier: 0
    },
    {
        id: 4,
        name: "CPU 4",
        points: 0,
        multiplier: 0
    },
    {
        id: 5,
        name: "CPU 5",
        points: 0,
        multiplier: 0
    },
]



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


export default function Controls() {

    let marks:({value: number, label: string})[] = [];

    for(let i = 1; i <= 5; i++){
        marks.push({value: i, label: `${i}x`})
    }


    const handleStartRound = () => {

    }

    const valuetext = (value: number) =>  {
        return `${value}°C`;
      }

    const valueLabelFormat = (value: number) => {
        return marks.findIndex((mark) => mark.value === value);
    }

  return (
    <div className='controlContainer'>
        <div className='controlSteppers'>
            <Stepper label='Points' min={0} max={500} initial={50} steps={25} decimal={false}/>
            <Stepper label='Multiplier'  min={0.5} max={10} initial={1} steps={0.25} decimal={true}/>
        </div>
        <div className='controlBottom'>
        <Button 
            className='controlStartButton'
            style={ 
                {
                    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                    padding: 12,  
                    marginTop: 20,
                    marginBottom: 20,
                    display: 'flex',
                    flex: 1
                } }
                
            onClick={handleStartRound} 
            variant='contained'>
            Start
        </Button>
            <div>
                <div className="rankingContainer">
                    <div className='rankingHeader'>
                        <div className="rankingIcon">
                            🎯
                        </div>
                        <div className="rankingName">
                            Current Round
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
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div>
                <div className='speedSliderContainer'>
                    <div style={{marginRight: 8, marginBottom: 8}}>⚙</div>
                    <div>Speed</div>
                </div>
                <Container>
                    <Slider
                    aria-label="Speed"
                    defaultValue={1}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    step={1}
                    max={5}
                    min={1}
                    marks={marks}
                    />
                </Container>
            </div>

            
        </div>
    </div>
  )
}
