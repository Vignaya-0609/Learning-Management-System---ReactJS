
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getUsersFromJson=createAsyncThunk("user/getUsersFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/userList/");
  if(response.ok){
      const data= await response.json();
      // console.log("Data from API:", data);
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No Users Found"});
  }
})
export const addUserToJson=createAsyncThunk("user/addUserToJson",async(user,{rejectWithValue})=>{
  // const id=`cust123`+1
  // const newUser={...user,id}
  const options={
      method:"POST",
      body:JSON.stringify(user), //here JSON.stringify(newUser)
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/userList/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const updateUserToJson=createAsyncThunk("user/updateUserToJson",async(user,{rejectWithValue})=>{
  const options={
      method:"PATCH",
      body:JSON.stringify(user), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch(`http://localhost:5000/userList/${user.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deleteUserFromJson=createAsyncThunk("user/deleteUserFromJson",async(user,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/userList/${user.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})
export const updateUserProfileList = createAsyncThunk(
  'user/updateUserProfileList',
  async ({ education, phoneno, id }, { getState, rejectWithValue }) => {
    const state = getState();
    const existingUserIndex = state.user.userList.findIndex(user => user.id === id);

    if (existingUserIndex !== -1) {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({ education, phoneno }),
        headers: { 'content-type': 'application/json;charset-UTF-8' },
      };
      const response = await fetch(`http://localhost:5000/userList/${id}`, options);
      if (response.ok) {
        const updatedUserData = await response.json();
        return { id, updatedUserData };
      } else {
        return rejectWithValue({ error: "Something went wrong" });
      }
    } else {
      const newUser = { id, education, phoneno };
      return { id, newUser };
    }
  }
);


const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    currentUser: "",
    userList:[],
    selectedUser:{},
    error:"",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload;
    },
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getUsersFromJson.pending,(state)=>{})
            .addCase(getUsersFromJson.fulfilled,(state,action)=>{
                state.userList=action.payload;
                state.error="";
                
            })
            .addCase(getUsersFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.userList=[];
            })
            .addCase(addUserToJson.pending,(state)=>{})
            .addCase(addUserToJson.fulfilled,(state,action)=>{
                state.userList.push(action.payload);
                state.error="";
            })
            .addCase(addUserToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(updateUserToJson.pending,(state)=>{})
            .addCase(updateUserToJson.fulfilled,(state,action)=>{
                // state.userSet.push(action.payload);
                state.userList=state.userList.map((user)=>user.id===action.payload.id?action.payload:user)
                state.error="";
            })
            .addCase(updateUserToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(deleteUserFromJson.pending,(state)=>{})
            .addCase(deleteUserFromJson.fulfilled,(state,action)=>{
                state.userList=state.userList.filter((user)=>user.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteUserFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            builder.addCase(updateUserProfileList.fulfilled, (state, action) => {
              const { id, updatedUserData, newUser } = action.payload;
              const index = state.userList.findIndex(user => user.id === id);
          
              if (index !== -1) {
                // Update existing user
                state.userList[index] = { ...state.userList[index], ...updatedUserData };
              } else {
                // Add new user
                state.userList.push(newUser);
              }
              state.error = "";
            });
  },
});

export const { setCurrentUser,addUser,removeUser,updateUser,setSelectedUser} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default userSlice.reducer;


