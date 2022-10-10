import React from "react";
import {
  FormControl,
  TextField,
  Container,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import UserModal from "./UserModal";
import Box from "@mui/material/Box";
import _ from "lodash";
// import './App.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  userTableWrapper: {
    "& .css-1ld3b9g-MuiGrid-root": {
      "& .MuiGrid-item": {
        paddingTop: "30px !important",
      },
    },
    "& .css-46bh2p-MuiCardContent-root:last-child": {
      paddingBottom: "40px !important",
    },
    "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold !important",
    },
    "& .css-17jjc08-MuiDataGrid-footerContainer": {
      minHeight: "75px !important",
    },
  },
  filterWrapper: {
    marginBottom: 5,
  },
  leftWrapper: {
    background: "gray",
    color: "#fff",
  },
  errorMessage: {
    color: "red",
    marginBottom: 8,
  },
  sucessMessage: {
    color: "green",
    marginBottom: 8,
  },

  "@global": {
    body: {
      "& .MuiDataGrid-columnHeader:last-child": {
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
      },
    },
  },
}));
// const BASEURL = "https://nphc-hr.free.beeceptor.com";
const regexPrice = /^\d+(?:\.\d+)?(?:,\d+(?:\.\d+)?)*$/;
const fileReader = new FileReader();
function App() {
  const classes = useStyles();
  let [usersData, setUsersData] = React.useState({ data: [], filterData: [] });
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);
  const [formValues, setFormValues] = React.useState({
    minSalary: "",
    maxSalary: "",
  });
  const [actionType, setActionType] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [userformFiledValues, setUserformFiledValues] = React.useState({
    id: "",
    name: "",
    login: "",
    salary: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    name: "",
    login: "",
    salary: "",
    csvFile: "",
  });
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState("");

  function getActrionButtons(params) {
    return (
      <div>
        <IconButton
          aria-label=""
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => editUserHandler(params.row)}
          color="inherit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label=""
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => deleteUser(params.row)}
          color="inherit"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
  const columns = [
    { field: "id", headerName: "ID", width: 100, disableColumnMenu: true },
    { field: "name", headerName: "Name", width: 200, disableColumnMenu: true },
    {
      field: "login",
      headerName: "Login",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "ACTIONS",
      headerName: "Action",
      width: 100,
      renderCell: getActrionButtons,
      disableColumnMenu: true,
      sortable: false,
    },
  ];
  function deleteUser(rowData) {
    const confirmPopup = window.confirm(
      "Are you sure want to delete the user?"
    );
    if (confirmPopup) {
      let result = usersData.data.filter((item) => item.id != rowData.id);
      setUsersData({ filterData: result, data: result });
    }
  }

  function editUserHandler(rowData) {
    const indexData = usersData.filterData.find(
      (item) => item.id == rowData.id
    );
    if (indexData) {
      setUserformFiledValues({
        ...userformFiledValues,
        id: indexData.id,
        name: indexData.name,
        login: indexData.login,
        salary: indexData.salary,
      });
    }
    setShowModal(true);
    setActionType("editUser");
  }
  const handleChangeRowsPerPage = (pageSize) => {
    setPageSize(parseInt(pageSize, 10));
  };
  React.useEffect(() => {
    let demoData = [
      { id: "e0001", name: "Harry Potter1", login: "hpotter1", salary: 1234.0 },
      { id: "e0002", name: "Harry Potter2", login: "hpotter2", salary: 2234.0 },
      { id: "e0003", name: "Harry Potter3", login: "hpotter3", salary: 3234.0 },
      { id: "e0004", name: "Harry Potter4", login: "hpotter4", salary: 4234.0 },
      { id: "e0005", name: "Harry Potter5", login: "hpotter5", salary: 5234.0 },
      { id: "e0006", name: "Harry Potter6", login: "hpotter6", salary: 6234.0 },
      { id: "e0007", name: "Harry Potter7", login: "hpotter7", salary: 7234.0 },
      { id: "e0008", name: "Harry Potter8", login: "hpotter8", salary: 8234.0 },
      { id: "e0009", name: "Harry Potter9", login: "hpotter9", salary: 9234.0 },
      {
        id: "e00010",
        name: "Harry Potter10",
        login: "hpotter10",
        salary: 10234.0,
      },
      {
        id: "e00011",
        name: "Harry Potter11",
        login: "hpotter11",
        salary: 11234.0,
      },
      {
        id: "e00012",
        name: "Harry Potter1",
        login: "hpotter1",
        salary: 1234.0,
      },
      {
        id: "e00013",
        name: "Harry Potter2",
        login: "hpotter2",
        salary: 2234.0,
      },
      {
        id: "e00014",
        name: "Harry Potter3",
        login: "hpotter3",
        salary: 3234.0,
      },
      {
        id: "e00015",
        name: "Harry Potter4",
        login: "hpotter4",
        salary: 4234.0,
      },
      {
        id: "e00016",
        name: "Harry Potter5",
        login: "hpotter5",
        salary: 5234.0,
      },
      {
        id: "e00017",
        name: "Harry Potter6",
        login: "hpotter6",
        salary: 6234.0,
      },
      {
        id: "e00018",
        name: "Harry Potter7",
        login: "hpotter7",
        salary: 7234.0,
      },
      {
        id: "e00019",
        name: "Harry Potter8",
        login: "hpotter8",
        salary: 8234.0,
      },
      {
        id: "e00020",
        name: "Harry Potter9",
        login: "hpotter9",
        salary: 9234.0,
      },
      // {id : 'e00021', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e00021', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000145', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000278', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000323', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000444', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000522', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000667', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000724', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e000832', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000912', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001012', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e000111', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000123', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000223', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000323', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000434', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e0005345', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000644', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000744', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e000844', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000922', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001022', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e000112', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000122', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e0002333', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000334', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e00044334', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e0005343', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000634', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000734', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e000834', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000934', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001043', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e00011443', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e00013443', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000234', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e00034343', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000434', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000534', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e00063443', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000743', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e00084343', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e00093443', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e000104343', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0001143', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e00013443', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e00023443', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000334', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000344', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000345', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e00034', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e00073443', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e00083443', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000943', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001034', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e000113443', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000143', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000243', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000343', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000443', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000543', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000634', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000743', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e00438', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000943', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e000434310', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0001731', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000134', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000234', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000334', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000443', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000543', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000643', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000734', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e000843', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000349', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001430', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0001431', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000431', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000342', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000343', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000443', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000543', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000643', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000743', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e000843', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e000943', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0001034', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0001341', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e000134', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e000234', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000343', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e000344', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000345', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e000346', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e000347', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e004308', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e004309', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0340010', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0043011', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e003401', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e003402', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e000433', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e043004', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e000435', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e043006', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e004307', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e043008', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e004309', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e0004310', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e0034011', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
      // {id : 'e043001', name: 'Harry Potter1', login: 'hpotter1', salary: 1234.00},
      // {id : 'e0043402', name: 'Harry Potter2', login: 'hpotter2', salary: 2234.00},
      // {id : 'e004303', name: 'Harry Potter3', login: 'hpotter3', salary: 3234.00},
      // {id : 'e0043304', name: 'Harry Potter4', login: 'hpotter4', salary: 4234.00},
      // {id : 'e043005', name: 'Harry Potter5', login: 'hpotter5', salary: 5234.00},
      // {id : 'e0443006', name: 'Harry Potter6', login: 'hpotter6', salary: 6234.00},
      // {id : 'e043434007', name: 'Harry Potter7', login: 'hpotter7', salary: 7234.00},
      // {id : 'e04343008', name: 'Harry Potter8', login: 'hpotter8', salary: 8234.00},
      // {id : 'e04343009', name: 'Harry Potter9', login: 'hpotter9', salary: 9234.00},
      // {id : 'e000weew10', name: 'Harry Potter10', login: 'hpotter10', salary: 10234.00},
      // {id : 'e004343011', name: 'Harry Potter11', login: 'hpotter11', salary: 11234.00},
    ];
    // try {
    //   fetch(
    //     `${BASEURL}/emplyees`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log("Response->", data);
    //           setUsersData({ data: demoData, filterData: demoData });
    //           setLoading(false);
    //     })
    //   } catch (error) {
    //       setLoading(false);
    //       console.log("error--->", error);
    // }
    setUsersData({ data: demoData, filterData: demoData });
    setLoading(false);
  }, []);

  const onChangeHandler = (event, name) => {
    let value = event.target.value ? event.target.value.trim() : "";
    setFormValues({ ...formValues, [name]: value });
  };

  const errorValue = {
    name: "Name can not be empty",
    login: "Login name can not be empty",
    salary: "Salary can not be empty",
    salaryInvalid: "Salary should be only number",
    csvFile: "Please upload CSV file",
  };

  const SetFormErrorHandler = (name, value) => {
    let errorMsg = "";
    if (value === "") {
      errorMsg = errorValue[name];
    }
    if (name == "salary" && value) {
      if (!regexPrice.test(value)) {
        errorMsg = errorValue[`${name}Invalid`];
      }
    }
    setFormErrors({ ...formErrors, [name]: errorMsg });
  };

  const handleOnChangeCSVFile = (e) => {
    let csvFile =
      e && e.target && e.target.files && e.target.files[0]
        ? e.target.files[0]
        : "";
    let errorMsg = "";
    if (csvFile === "") {
      errorMsg = errorValue["csvFile"];
    }
    if (csvFile) {
      if (!csvFile.name.includes(".csv")) {
        errorMsg = "Only upload csv file";
      }
      if (!csvFile.size > 1024 * 1024) {
        errorMsg = "Only upload 2 mb csv file";
      }
    }
    setFormErrors({ ...formErrors, ["csvFile"]: errorMsg });
    if (!errorMsg) {
      setFile(e.target.files[0]);
    } else {
      setFile("");
    }
  };
  const onChangeEditTrigger = (event, selectedDrop) => {
    const value = event.target.value ? event.target.value.trimStart() : "";
    SetFormErrorHandler(selectedDrop, value);
    if (selectedDrop == "name") {
      setUserformFiledValues({ ...userformFiledValues, ["name"]: value });
    } else if (selectedDrop == "login") {
      setUserformFiledValues({ ...userformFiledValues, ["login"]: value });
    } else if (selectedDrop == "salary") {
      setUserformFiledValues({ ...userformFiledValues, ["salary"]: value });
    }
  };

  const searchFilter = () => {
    let result = usersData.data;
    let minSalary = formValues.minSalary;
    let maxSalary = formValues.maxSalary;
    if (minSalary && !regexPrice.test(minSalary)) {
      minSalary = "";
    }
    if (maxSalary && !regexPrice.test(maxSalary)) {
      maxSalary = "";
    }

    if (minSalary && !maxSalary) {
      result = usersData.data.filter((item) => item.salary >= minSalary);
    } else if (!minSalary && maxSalary) {
      result = usersData.data.filter((item) => item.salary <= maxSalary);
    } else if (minSalary && maxSalary) {
      result = usersData.data.filter(
        (item) => item.salary >= minSalary && item.salary <= maxSalary
      );
    }
    setUsersData({ ...usersData, filterData: result });
  };

  const getPopup = () => {
    setShowModal(true);
    setActionType("uploadUserCSV");
  };
  const toggleModalDialog = () => {
    if (actionType == "editUser") {
      setFormErrors({ name: "", login: "", salary: "" });
    }
    setShowModal(false);
    setActionType("");
  };
  const uploadCSV = (
    // <Button variant="contained" component="label"> Upload <input hidden accept="csv/*" multiple type="file" /> </Button>
    <div>
      {message && <div className={classes.sucessMessage}>{message}</div>}
      <input
        type={"file"}
        id={"csvFileInput"}
        accept={".csv"}
        onChange={handleOnChangeCSVFile}
      />
      <div className={classes.errorMessage}>{formErrors["csvFile"]}</div>
    </div>
  );

  const editUserForm = (
    <FormControl>
      {message && <div className={classes.sucessMessage}>{message}</div>}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField
            id=""
            label={"Name"}
            value={userformFiledValues["name"]}
            onChange={(e) => {
              onChangeEditTrigger(e, "name");
            }}
          ></TextField>
          <div className={classes.errorMessage}>{formErrors["name"]}</div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id=""
            label={"Login"}
            value={userformFiledValues["login"]}
            onChange={(e) => {
              onChangeEditTrigger(e, "login");
            }}
          ></TextField>
          <div className={classes.errorMessage}>{formErrors["login"]}</div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id=""
            label={"Salary"}
            value={userformFiledValues["salary"]}
            onChange={(e) => {
              onChangeEditTrigger(e, "salary");
            }}
          ></TextField>
          <div className={classes.errorMessage}>{formErrors["salary"]}</div>
        </Grid>
      </Grid>
    </FormControl>
  );
  const checkProperFormat = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    if (csvHeader && csvHeader.length == 4) {
      if (
        csvHeader[0] == "id" &&
        csvHeader[1] == "login" &&
        csvHeader[2] == "name" &&
        csvHeader[3].includes("salary")
      ) {
        return true;
      }
    }
    return false;
  };
  const csvFileToArray = (string) => {
    let csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    if (csvHeader && csvHeader[3] && csvHeader[3].includes("salary")) {
      csvHeader[3] = "salary";
    }
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    let userDataClone = _.cloneDeep(usersData);
    if (array && array.length > 0) {
      array.map((rowItem) => {
        if (
          rowItem.id != "" &&
          rowItem.name != "" &&
          rowItem.login != "" &&
          rowItem.salary != ""
        ) {
          const index = userDataClone.filterData.findIndex(
            (item) => item.id == rowItem.id
          );
          if (index > -1) {
            let name = rowItem.name;
            let login = rowItem.login;
            let salary = rowItem.salary.replace(/\n|\r/g, "");
            userDataClone.filterData[index].name = name;
            userDataClone.filterData[index].login = login;
            userDataClone.filterData[index].salary = salary;
          } else {
            let id = rowItem.id;
            let name = rowItem.name;
            let login = rowItem.login;
            let salary = rowItem.salary.replace(/\n|\r/g, "");
            let objData = { id, name, login, salary };
            userDataClone.filterData.push(objData);
          }
        }
      });
    }
    setMessage("User csv data saved successfully");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    setUsersData(userDataClone);
    setFile("");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (actionType == "editUser") {
      validateFormFields();
    } else {
      validateUploadCSV();
    }
  };
  const validateUploadCSV = () => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        let isCheck = checkProperFormat(text);
        if (isCheck) {
          csvFileToArray(text);
        } else {
          setFormErrors({
            ...formErrors,
            ["csvFile"]: "invalid data format..",
          });
        }
      };

      fileReader.readAsText(file);
    }
  };

  const validateFormFields = () => {
    if (userformFiledValues["name"] == "") {
      SetFormErrorHandler("name", "");
    } else if (userformFiledValues["login"] == "") {
      SetFormErrorHandler("login", "");
    } else if (userformFiledValues["salary"] == "") {
      SetFormErrorHandler("salary", "");
    } else {
      const index = usersData.filterData.findIndex(
        (item) => item.id == userformFiledValues.id
      );
      if (index > -1) {
        let name =
          userformFiledValues.name &&
          typeof userformFiledValues.name == "string"
            ? userformFiledValues.name.trim()
            : userformFiledValues.name;
        let login =
          userformFiledValues.login &&
          typeof userformFiledValues.login == "string"
            ? userformFiledValues.login.trim()
            : userformFiledValues.login;
        let salary = userformFiledValues.salary
          ? userformFiledValues.salary
          : 0;

        usersData.filterData[index].name = name;
        usersData.filterData[index].login = login;
        usersData.filterData[index].salary = salary;
        usersData.data[index].name = name;
        usersData.data[index].login = login;
        usersData.data[index].salary = salary;
        setMessage("User data saved successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setUsersData(usersData);
      }
    }
  };

  let boxHeight = 400;
  // if(window.innerWidth <= 800){
  //   boxHeight =  280;
  // }
  console.log("usersData-->>>", usersData);
  return (
    <div className={classes.root}>
      {["uploadUserCSV", "editUser"].includes(actionType) && (
        <UserModal
          modalSize={"sm"}
          contentToRender={actionType == "editUser" ? editUserForm : uploadCSV}
          modalTitle={
            actionType == "editUser" ? "Edit User" : "Upload User CSV"
          }
          canShowModal={showModal}
          updateModalState={toggleModalDialog}
          onSubmitClick={onSubmit}
        />
      )}

      <Container maxWidth="lg">
        <Card elevation={4}>
          <CardContent style={{ height: 500, width: "100%" }}>
            <Grid container justify="flex-start" spacing={5}>
              <Grid item xs={12} sm={12} md={2} className={classes.leftWrapper}>
                <IconButton
                  aria-label=""
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  style={{ background: "black" }}
                  onClick={getPopup}
                >
                  <AccountBoxRoundedIcon />
                </IconButton>
                <div>UserName</div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                className={classes.userTableWrapper}
              >
                {/* <Card elevation={1} >
                        <CardContent style={{ height: 450, width: '100%' }}> */}
                {/* Search Wrapper start */}
                <Grid container spacing={5} className={classes.filterWrapper}>
                  <Grid item xs={5}>
                    <FormControl>
                      <TextField
                        id="visibleColumn"
                        label="Minimum Salary"
                        variant="outlined"
                        onChange={(e) => {
                          onChangeHandler(e, "minSalary");
                        }}
                        value={formValues["minSalary"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl>
                      <TextField
                        id="visibleColumn"
                        label="Maximum Salary"
                        variant="outlined"
                        onChange={(e) => {
                          onChangeHandler(e, "maxSalary");
                        }}
                        value={formValues["maxSalary"]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              style={{ cursor: "pointer" }}
                              onClick={searchFilter}
                            >
                              <SearchIcon />
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                {/* Search Wrapper end */}

                <Box sx={{ height: boxHeight, width: "90%" }}>
                  <DataGrid
                    rows={usersData.filterData}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    // onRowClick={onUserRowSelected}
                    pageSize={pageSize}
                    loading={loading}
                    onPageSizeChange={handleChangeRowsPerPage}
                    disableSelectionOnClick
                  />
                </Box>

                {/* </CardContent>
                       </Card>    */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
