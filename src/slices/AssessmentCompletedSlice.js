
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAssessmentCompletedFromJson=createAsyncThunk("publish/getAssessmentCompletedFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/assessmentCompleted/");
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No assessment Completed Found"});
  }
})
export const addAssessmentCompletedToJson=createAsyncThunk("publish/addAssessmentCompletedToJson",async(complete,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(complete), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/assessmentCompleted/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})

const AssessmentCompletedSlice = createSlice({
  name: 'AssessmentCompletedSlice',
  initialState: {
  assessmentCompletedList:[],
  error:"",
  },
  reducers: {
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getAssessmentCompletedFromJson.pending,(state)=>{})
            .addCase(getAssessmentCompletedFromJson.fulfilled,(state,action)=>{
                state.assessmentCompletedList=action.payload;
                state.error="";
                
            })
            .addCase(getAssessmentCompletedFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.assessmentCompletedList=[];
            })
            .addCase(addAssessmentCompletedToJson.pending,(state)=>{})
            .addCase(addAssessmentCompletedToJson.fulfilled,(state,action)=>{
                state.assessmentCompletedList.push(action.payload);
                state.error="";
            })
            .addCase(addAssessmentCompletedToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export default AssessmentCompletedSlice.reducer;


