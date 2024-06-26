import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const PREFIX = 'Table';

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`
};

const StyledTableContainer = styled(TableContainer)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    flexShrink: 0,
  },

  [`& .${classes.button}`]: {
	  padding: '0px',
  }
}));

function TablePaginationActions(props) {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };


  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </IconButton>
      <IconButton className={classes.button}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable(props) {
  let rows = props.rows;


  const font = '0.5rem';

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table size="small" className={classes.table} aria-label="log table">
      <TableBody>
        <TableRow>
        	<TableCell className={classes.tableHead}>{'Open/Close'}</TableCell>
        	<TableCell className={classes.tableHead}>{'User'}</TableCell>
        	<TableCell className={classes.tableHead}>{'Date'}</TableCell>
        	<TableCell className={classes.tableHead}>{'Time'}</TableCell>
        </TableRow>
          {(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ).map(row => (
            <TableRow key={row[0]}>
              <TableCell component="th" scope="row" className={classes.tablecell}>
                {row[1][0]}
              </TableCell>
              <TableCell className={classes.tablecell}>{row[1][1]}</TableCell>
              <TableCell className={classes.tablecell}>{row[1][2]}</TableCell>
			  <TableCell className={classes.tablecell}>{row[1][3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination className={classes.nav}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
                style:{
                  marginLeft: '0px',
				  marginRight: '0px',
                  fontSize: font
                }
              }}
              labelRowsPerPage={<div style={{fontSize:font}}>{'Rows per Page:'}</div>}
              labelDisplayedRows={row => <div style={{fontSize: font}}>{page * rowsPerPage+1 +'-'+((page * rowsPerPage) + rowsPerPage) + ' of ' + rows.length}</div>}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}