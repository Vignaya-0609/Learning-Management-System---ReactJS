
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getMaterialsFromJson=createAsyncThunk("material/getMaterialsFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/materials/");
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
export const addMaterialToJson=createAsyncThunk("material/addMaterialToJson",async(material,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(material), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/materials/",options);
  if(response.ok){
      const data= await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})

export const deleteMaterialFromJson=createAsyncThunk("material/deleteMaterialFromJson",async(material,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/materials/${material.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})


const MaterialSlice = createSlice({
  name: 'MaterialSlice',
  initialState: {
    materialList:[],
    selectedMaterial:{},
    error:"",
  },
  reducers: {
    setSelectedmaterial:(state,action)=>{
      state.selectedMaterial=action.payload;
    },
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getMaterialsFromJson.pending,(state)=>{})
            .addCase(getMaterialsFromJson.fulfilled,(state,action)=>{
                state.materialList=action.payload;
                state.error="";
                
            })
            .addCase(getMaterialsFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.materialList=[];
            })
            .addCase(addMaterialToJson.pending,(state)=>{})
            .addCase(addMaterialToJson.fulfilled,(state,action)=>{
                state.materialList.push(action.payload);
                state.error="";
            })
            .addCase(addMaterialToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })  
            .addCase(deleteMaterialFromJson.pending,(state)=>{})
            .addCase(deleteMaterialFromJson.fulfilled,(state,action)=>{
                state.materialList=state.materialList.filter((material)=>material.id!==action.payload.id);
                state.error="";
            })
            .addCase(deleteMaterialFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
  },
});

export const {setSelectedmaterial} = MaterialSlice.actions;
export default MaterialSlice.reducer;


