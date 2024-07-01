import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { service } from '@service';
import {Service} from '@modal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35, 137, 218, 1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

export default function CustomizedTables({data}) {
  const [edit, setEdit] = useState({})
  const [open, setOpen] = useState(false)
  const deleteItem = async(id) => {
    try {
      const response = await service.delete(id)
      response.status === 200 && window.location.reload()
    } catch (error) {
      console.log(error);
    }
    }
    const editItem = (item) => {
      setEdit(item)
      setOpen(true)
  }
  return (
    <>
    <Service item={edit} open={open} handleClose={()=>setOpen(false)} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>T/R</StyledTableCell>
            <StyledTableCell align="center">Service name</StyledTableCell>
            <StyledTableCell align="center">Service price</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{item.name}</StyledTableCell>
              <StyledTableCell align="center">{item.price}</StyledTableCell>
              <StyledTableCell align="center">
                <Button onClick={()=>editItem(item)}>Edit</Button>
                <Button onClick={()=>deleteItem(item.id)}>Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
