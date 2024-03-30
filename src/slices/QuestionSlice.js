
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getQuestionsFromJson=createAsyncThunk("questions/getQuestionsFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/questions/");
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No Users Found"});
  }
})
export const addQuestionToJson=createAsyncThunk("questions/addQuestionToJson",async(question,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(question), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/questions/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deleteQuestionFromJson=createAsyncThunk("question/deleteQuestionFromJson",async(question,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/questions/${question.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})


const QuestionSlice = createSlice({
  name: 'QuestionSlice',
  initialState: {
    questionList:[],
    selectedQuestion:{},
    error:"",
  },
  reducers: {
    setSelectedQuestion:(state,action)=>{
      state.selectedQuestion=action.payload;
    },
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getQuestionsFromJson.pending,(state)=>{})
            .addCase(getQuestionsFromJson.fulfilled,(state,action)=>{
                state.questionList=action.payload;
                state.error="";
                
            })
            .addCase(getQuestionsFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.questionList=[];
            })
            .addCase(addQuestionToJson.pending,(state)=>{})
            .addCase(addQuestionToJson.fulfilled,(state,action)=>{
                state.questionList.push(action.payload);
                state.error="";
            })
            .addCase(addQuestionToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            }) 
            .addCase(deleteQuestionFromJson.pending,(state)=>{})
            .addCase(deleteQuestionFromJson.fulfilled,(state,action)=>{
                state.questionList=state.questionList.filter((qu)=>qu.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteQuestionFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export const {setSelectedQuestion} = QuestionSlice.actions;
export default QuestionSlice.reducer;


