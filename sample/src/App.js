import { React, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {
  fetchData,
  setSearchKey,
  setSelectKey
} from './action'
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import debounce from "lodash.debounce";

export default function Counter() {
  const dispatch = useDispatch()

  const { userList, searchKey, selectKey } = useSelector((state) => state)

  const searchUser = (e) => {
    deBounceDispatch(e.target.value)
  };

  const deBounceDispatch = debounce((input) => {
    dispatch(setSearchKey(input))
    dispatch(setSelectKey(''))
  }, 500)

  const selectUserTopic = (e) => {
    const selectedValue = e.target.value; 
    dispatch(setSelectKey(selectedValue))
  };

  const filterBasedOnSearch = (isDropDown) => {
    console.log({ userList })
    let filteredData = userList
    if (searchKey) {
      filteredData = filteredData.filter(({ userId }) => String(userId).toLocaleLowerCase() === String(searchKey).toLocaleLowerCase())
      console.log({ filteredData })

    }
    if (!isDropDown && selectKey) {
      filteredData = filteredData.filter(({ id }) => id === selectKey)
    }
    return filteredData
  }

  useEffect(() => {
    dispatch(fetchData())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main-flex-container'>

      <h1>User List</h1>

      <div className='flex-container' >
{/* validation pending for user id is pending */}
        <TextField

          id="outlined-basic"

          onChange={searchUser}

          variant="outlined"

          fullWidth

          label="Search user ID"

        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select User Title</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectKey || ""}
            label="User Name"
            onChange={selectUserTopic}
          >
            {!userList.length ? "data fetching" : filterBasedOnSearch(true).map((ele) => (<MenuItem value={ele.id}>{ele.title}</MenuItem>))}
          </Select>
        </FormControl>

      </div>

      <div className='grid'>
        {!userList.length ? "data fetching" : filterBasedOnSearch(false).map((ele) => (<div key={ele.id} className='grid-item'>
          <p>{ele.userId}</p>
          <p>{ele.title}</p>
        </div>))}
      </div>

    </div>
  )
}