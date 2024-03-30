
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getPublishFromJson=createAsyncThunk("publish/getPublishFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/publish/");
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No publish Found"});
  }
})
export const addPublishToJson=createAsyncThunk("publish/addPublishToJson",async(topic,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(topic), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/publish/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})

const PublishSlice = createSlice({
  name: 'PublishSlice',
  initialState: {
  publishList:[],
  error:"",
  },
  reducers: {
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getPublishFromJson.pending,(state)=>{})
            .addCase(getPublishFromJson.fulfilled,(state,action)=>{
                state.publishList=action.payload;
                state.error="";
                
            })
            .addCase(getPublishFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.publishList=[];
            })
            .addCase(addPublishToJson.pending,(state)=>{})
            .addCase(addPublishToJson.fulfilled,(state,action)=>{
                state.publishList.push(action.payload);
                state.error="";
            })
            .addCase(addPublishToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export default PublishSlice.reducer;


