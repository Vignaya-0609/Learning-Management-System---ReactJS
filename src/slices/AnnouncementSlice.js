import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAnnouncementFromJson=createAsyncThunk("announcement/getAnnouncementFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/announcement/");
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
    console.error("Error fetching users. Response not okay:", response);
      return rejectWithValue({error:"No Users Found"});
  }
})
export const addAnnouncementToJson=createAsyncThunk("announcement/addAnnouncementToJson",async(announcement,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(announcement), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/announcement/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const updateAnnouncementToJson=createAsyncThunk("announcement/updateAnnouncementToJson",async(announcement,{rejectWithValue})=>{
  const options={
      method:"PATCH",
      body:JSON.stringify(announcement), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch(`http://localhost:5000/announcement/${announcement.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deleteAnnouncementFromJson=createAsyncThunk("announcement/deleteAnnouncementFromJson",async(announcement,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/announcement/${announcement.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})


const AnnouncementSlice = createSlice({
  name: 'AnnouncementSlice',
  initialState: {
    AnnounceList:[],
    selectedAnnouncement:{},
    error:"",
  },
  reducers: {
  
    setSelectedAnnouncement:(state,action)=>{
      state.selectedAnnouncement=action.payload;
    },
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getAnnouncementFromJson.pending,(state)=>{})
            .addCase(getAnnouncementFromJson.fulfilled,(state,action)=>{
                state.AnnounceList=action.payload;
                state.error="";
                
                
            })
            .addCase(getAnnouncementFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.AnnounceList=[];
            })
            .addCase(addAnnouncementToJson.pending,(state)=>{})
            .addCase(addAnnouncementToJson.fulfilled,(state,action)=>{
                state.AnnounceList.push(action.payload);
                state.error="";
            })
            .addCase(addAnnouncementToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(updateAnnouncementToJson.pending,(state)=>{})
            .addCase(updateAnnouncementToJson.fulfilled,(state,action)=>{

                state.AnnounceList=state.AnnounceList.map((announce)=>announce.id===action.payload.id?action.payload:announce)
                state.error="";
            })
            .addCase(updateAnnouncementToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(deleteAnnouncementFromJson.pending,(state)=>{})
            .addCase(deleteAnnouncementFromJson.fulfilled,(state,action)=>{
                state.AnnounceList=state.AnnounceList.filter((announce)=>announce.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteAnnouncementFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export const { setSelectedAnnouncement} = AnnouncementSlice.actions;
export default AnnouncementSlice.reducer;


