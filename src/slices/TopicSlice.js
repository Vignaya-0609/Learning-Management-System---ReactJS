
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getTopicsFromJson=createAsyncThunk("topic/getTopicsFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/topics/");
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
export const addTopicToJson=createAsyncThunk("topic/addTopicToJson",async(topic,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(topic), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/topics/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const updateTopicToJson=createAsyncThunk("topic/updateTopicToJson",async(topic,{rejectWithValue})=>{
  const options={
      method:"PATCH",
      body:JSON.stringify(topic), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch(`http://localhost:5000/topics/${topic.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deleteTopicFromJson=createAsyncThunk("topic/deleteTopicFromJson",async(topic,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/topics/${topic.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})


const TopicSlice = createSlice({
  name: 'TopicSlice',
  initialState: {
    topicList:[],
    selectedTopic:{},
    error:"",
  },
  reducers: {
    setSelectedTopic:(state,action)=>{
      state.selectedTopic=action.payload;
    },
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getTopicsFromJson.pending,(state)=>{})
            .addCase(getTopicsFromJson.fulfilled,(state,action)=>{
                state.topicList=action.payload;
                state.error="";
                
            })
            .addCase(getTopicsFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.topicList=[];
            })
            .addCase(addTopicToJson.pending,(state)=>{})
            .addCase(addTopicToJson.fulfilled,(state,action)=>{
                state.topicList.push(action.payload);
                state.error="";
            })
            .addCase(addTopicToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(updateTopicToJson.pending,(state)=>{})
            .addCase(updateTopicToJson.fulfilled,(state,action)=>{
                state.topicList=state.topicList.map((topic)=>topic.id===action.payload.id?action.payload:topic)
                state.error="";
            })
            .addCase(updateTopicToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })  
            .addCase(deleteTopicFromJson.pending,(state)=>{})
            .addCase(deleteTopicFromJson.fulfilled,(state,action)=>{
                state.topicList=state.topicList.filter((topic)=>topic.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteTopicFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export const {setSelectedTopic} = TopicSlice.actions;
export default TopicSlice.reducer;


