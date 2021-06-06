import React, { useEffect, useState } from 'react';
import './App.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import gAxios from './utils/axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function App() {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();
  const [menus, _setMenus] = useState([])
  const [colors, _setColors] = useState([
    { id: 1, title: '#b00b69', year: 'Pink'},
    { id: 2, title: '#042069', year: 'Blue'},
    { id: 3, title: '#8a2be2', year: 'Violet'},
    { id: 4, title: '#000000', year: 'Black'},
  ])

  useEffect(() => {
    if (menus && menus.length === 0) {
      getMenus()
    }
  },[menus])

  useEffect(() => {
    if (colors && colors.length === 0) {
      getColors()
    }
  },[colors])

  const getMenus = async () => {
    const response = await gAxios.get(`/menu`, '', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const menusRes = response.data && response.data.data
    if (menusRes && menusRes.length > 0) {
      _setMenus(menusRes)
    }
  }

  const handleChange = async (event, checked) => {
    const response = await gAxios.put(`/menu/${event.target.id}`, { isActive: !checked }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    menus.forEach(row => {
      if(row._id === event.target.id) {
        row.isActive = !checked
      }
    });

    const menusRes = response.data.data
    if (menusRes) {
      _setMenus([ ...menus ])
    }
  };

  const getColors = async () => {
    const response = await gAxios.get(`/color`, '', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const colorsRes = response.data.data
    if (colorsRes && colorsRes.length > 0) {
      _setColors(colorsRes)
    }
  }
  const [choosedColor, _choosedColor] = React.useState('');

  const handleColorChange = async (event) => {
    _choosedColor(event.target.value);
    console.log(event.target);
    await gAxios.put(`/color/60bbce1a85011037b8b91a0e`, { colorName:event.target.value}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };


  return (
    <div className="App">
      <TableContainer component={Paper} style={{ textAlign: "center" }}>
        <Table className={classes.table} aria-label="customized table" style={{ textAlign: "center" }}>
          <TableHead >
            <TableRow >
              <StyledTableCell align="center">Menu</StyledTableCell>
              <StyledTableCell align="center">Show</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ textAlign: "center" }}>
            { menus && menus.length > 0 && menus.map((row, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.menuName}
                </StyledTableCell  >

                <StyledTableCell align="center">   

                <Switch
                  checked={row.isActive}
                  onChange={(e) => handleChange(e, row.isActive)}
                  name={row._id}
                  id={row._id}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                </StyledTableCell>
              </StyledTableRow>
            )
            })}
          </TableBody>
        </Table>
        <Table className={classes.table} aria-label="customized table" style={{ textAlign: "center" }}>
          <TableHead >
            <TableRow >
              <StyledTableCell align="center">Color Code</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ textAlign: "center" }}>
            <StyledTableRow style={{ justifyContent: "center", display: "flex" , padding:"10px" }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Color   </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={choosedColor}
          onChange={handleColorChange}
          label="Color"
        >
          {colors.map(c=>{
              return <MenuItem key={c.id} value={c.title} name={c.year}>{c.year}</MenuItem>
              })}
        </Select>
        </FormControl>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
