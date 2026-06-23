import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { createClient } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const initialClientState = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
};

const initialErrorsState = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
};

const CreateClient = ({ open, setOpen, scroll }) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [clientData, setClientData] = useState(initialClientState);
  const [formErrors, setFormErrors] = useState(initialErrorsState);

  const validate = () => {
    const nextErrors = {
      firstName: clientData.firstName.trim() ? "" : "First name is required",
      lastName: clientData.lastName.trim() ? "" : "Last name is required",
      username: clientData.username.trim() ? "" : "Username is required",
      phone: clientData.phone.toString().trim() ? "" : "Phone is required",
    };

    setFormErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleChange = (field, value) => {
    setClientData((prevData) => ({ ...prevData, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setFormErrors(initialErrorsState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = Object.entries(clientData).reduce((data, [key, value]) => {
      if (value.toString().trim()) data[key] = value.toString().trim();
      return data;
    }, {});

    dispatch(createClient(payload, setOpen));
    setClientData(initialClientState);
    setFormErrors(initialErrorsState);
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-describedby="create-client-dialog-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tbody>
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.firstName}
                    onChange={(event) => handleChange("firstName", event.target.value)}
                    error={Boolean(formErrors.firstName)}
                    helperText={formErrors.firstName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.lastName}
                    onChange={(event) => handleChange("lastName", event.target.value)}
                    error={Boolean(formErrors.lastName)}
                    helperText={formErrors.lastName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.username}
                    onChange={(event) => handleChange("username", event.target.value)}
                    error={Boolean(formErrors.username)}
                    helperText={formErrors.username}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={clientData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={clientData.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    error={Boolean(formErrors.phone)}
                    helperText={formErrors.phone}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClient;
