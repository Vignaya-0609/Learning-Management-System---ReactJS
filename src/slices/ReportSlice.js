
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getReportFromJson=createAsyncThunk("report/getReportFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/report/");
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No Reports Found"});
  }
})

const ReportSlice = createSlice({
  name: 'ReportSlice',
  initialState: {
    reportList:[],
    error:"",
  },
  reducers: {
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getReportFromJson.pending,(state)=>{})
            .addCase(getReportFromJson.fulfilled,(state,action)=>{
                state.reportList=action.payload;
                state.error="";
                
            })
            .addCase(getReportFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.reportList=[];
            }) 
  },
});

export default ReportSlice.reducer;


