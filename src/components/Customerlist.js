import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import { forwardRef } from 'react';

//tableicons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Delete from '@material-ui/icons/DeleteForever';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    //Add new customer
    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New customer added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    //Edit existing customer
    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    //Delete customer
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer deleted')
                setOpen(true)})
            .catch(err => console.error(err)) 
        }
    }

    //Add training to customer
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New training added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [state] = React.useState({
        columns: [
            {render: row => (<AddTraining addTraining={addTraining} customer={row} />)},
            {title: 'First name', field: 'firstname'},
            {title: 'Last name', field: 'lastname'},
            {title: 'Email', field: 'email'},
            {title: 'Phone', field: 'phone'},
            {title: 'Address', field: 'streetaddress'},
            {title: 'Postcode', field: 'postcode'},
            {title: 'City', field: 'city'},
            {width: 50, render: row => (<EditCustomer updateCustomer={updateCustomer} customer={row}/>)},
            {
                width: 60,
                render: (rowData) => (<Tooltip title="Delete Customer"><Delete color="secondary" onClick={() => deleteCustomer(rowData.links[1].href)}/></Tooltip>)
            }

        ]
    })

    return (
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <MaterialTable 
            icons={tableIcons}
            title="Customers"
            columns={state.columns}
            data={customers}
            />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={msg} />
        </div>
    )
}