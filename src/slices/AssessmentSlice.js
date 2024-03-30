
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAssessmentsFromJson=createAsyncThunk("assessment/getAssessmentsFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/assessments/");
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
export const addAssessmentToJson=createAsyncThunk("assessment/addTopicToJson",async(assessment,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(assessment), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/assessments/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const updateAssessmentToJson=createAsyncThunk("assessment/updateAssessmentToJson",async(assessment,{rejectWithValue})=>{
  const options={
      method:"PATCH",
      body:JSON.stringify(assessment), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch(`http://localhost:5000/assessments/${assessment.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deleteAssessmentFromJson=createAsyncThunk("assessment/deleteAssessmentFromJson",async(assessment,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/assessments/${assessment.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})


const AssessmentSlice = createSlice({
  name: 'AssessmentSlice',
  initialState: {
    assessmentList:[],
    selectedAssessment:{},
    error:"",
  },
  reducers: {
    setSelectedAssessment:(state,action)=>{
      state.selectedAssessment=action.payload;
    }
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getAssessmentsFromJson.pending,(state)=>{})
            .addCase(getAssessmentsFromJson.fulfilled,(state,action)=>{
                state.assessmentList=action.payload;
                state.error="";
                
            })
            .addCase(getAssessmentsFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.assessmentList=[];
            })
            .addCase(addAssessmentToJson.pending,(state)=>{})
            .addCase(addAssessmentToJson.fulfilled,(state,action)=>{
                state.assessmentList.push(action.payload);
                state.error="";
            })
            .addCase(addAssessmentToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(updateAssessmentToJson.pending,(state)=>{})
            .addCase(updateAssessmentToJson.fulfilled,(state,action)=>{
                state.assessmentList=state.assessmentList.map((assessment)=>assessment.id===action.payload.id?action.payload:assessment)
                state.error="";
            })
            .addCase(updateAssessmentToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })  
            .addCase(deleteAssessmentFromJson.pending,(state)=>{})
            .addCase(deleteAssessmentFromJson.fulfilled,(state,action)=>{
                state.assessmentList=state.assessmentList.filter((topic)=>topic.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteAssessmentFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export const {setSelectedAssessment} = AssessmentSlice.actions;
export default AssessmentSlice.reducer;


