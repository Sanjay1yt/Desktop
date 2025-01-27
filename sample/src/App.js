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
import { debounceSearch } from './deBounce';

export default function Counter() {
  const dispatch = useDispatch()

  const { userList, searchKey, selectKey, checkedValues } = useSelector((state) => state)

  const searchUser = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    dispatch(setSearchKey(lowerCase))
    dispatch(setSelectKey(''))
  };
//  const debunce =  debounceSearch(searchUser,300 )
  const selectUserTopic = (e) => {
    const currentTitle = userList.find(({ id }) => id === e.target.value)
    if (currentTitle) {
      var topic = currentTitle.title.toLowerCase();
      dispatch(setSelectKey(topic))
    }

  };

  const filterBasedOnSearch = (isDropDown) => {
    console.log({ userList })
    let filteredData = userList
    if (searchKey) {
      filteredData = filteredData.filter(({ userId }) => String(userId).toLocaleLowerCase() === String(searchKey).toLocaleLowerCase())
      console.log({ filteredData })

    }
    if (!isDropDown && selectKey) {
      filteredData = filteredData.filter(({ title }) => String(title).replace(/ /g, '').toLocaleLowerCase() === String(selectKey).replace(/ /g, '').toLocaleLowerCase())
    }
    return filteredData
  }

  useEffect(() => {
    dispatch(fetchData())

  }, [])

  return (
    <div className='main-flex-container'>

      <h1>User List</h1>

      <div className='flex-container' >

        <TextField

          id="outlined-basic"

          onChange={searchUser}

          variant="outlined"

          fullWidth

          label="Search user ID"

        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select User Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectKey}
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