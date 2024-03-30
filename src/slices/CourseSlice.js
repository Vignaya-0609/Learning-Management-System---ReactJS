
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 
export const getEnrolledCoursesDetails = createAsyncThunk(
  'course/getEnrolledCoursesDetails',
  async (enrolledCourses, { rejectWithValue }) => {
    try {
      const response = await Promise.all(
        enrolledCourses.map(async (coursenameId) => {
          const courseResponse = await fetch(`http://localhost:5000/courseList/${coursenameId}`);
          if (courseResponse.ok) {
            const data = await courseResponse.json();
            // console.log(data);
            return data; 
          } else {
            throw new Error(`Failed to fetch details for ${coursenameId}`);
          }
        })
      );

      return response;
    } catch (error) {
      return rejectWithValue({ error: 'Something went wrong while fetching enrolled course details' });
    }
  }
);


export const getCoursesFromJson=createAsyncThunk("course/getCoursesFromJson",async(_,{rejectWithValue})=>{
  const response=await fetch("http://localhost:5000/courseList/");
  if(response.ok){
      const data=await response.json();
      // console.log(data)
      return data;
  }
  else{
      return rejectWithValue({error:"No courses Found"});
  }
})
export const addcourseToJson=createAsyncThunk("course/addcourseToJson",async(course,{rejectWithValue})=>{
  const options={
      method:"POST",
      body:JSON.stringify(course), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch("http://localhost:5000/courseList/",options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const updatecourseToJson=createAsyncThunk("course/updatecourseToJson",async(course,{rejectWithValue})=>{
  const options={
      method:"PATCH",
      body:JSON.stringify(course), 
      headers:{"content-type":"application/json;charset-UTF-8"}
  }
  const response=await fetch(`http://localhost:5000/courseList/${course.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong"});
  }
})
export const deletecourseFromJson=createAsyncThunk("course/deletecourseFromJson",async(course,{rejectWithValue})=>{
  const options={
      method:"DELETE",
  }
  const response=await fetch(`http://localhost:5000/courseList/${course.id}`,options);
  if(response.ok){
      const data=await response.json();
      return data;
  }
  else{
      return rejectWithValue({error:"Something went wrong in deletion"});
  }
})

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    courseList:[],
    enrolledCourses:[],
    selectedCourse:{},
    error:"",
  },
  reducers: {
    setSelectedcourse:(state,action)=>{
      state.selectedCourse=action.payload;
    },
    updateEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getCoursesFromJson.pending,(state)=>{})
            .addCase(getCoursesFromJson.fulfilled,(state,action)=>{
                state.courseList=action.payload;
                state.error="";
            })
            .addCase(getCoursesFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
                state.courseList=[];
            })
            .addCase(addcourseToJson.pending,(state)=>{})
            .addCase(addcourseToJson.fulfilled,(state,action)=>{
                state.courseList.push(action.payload);
                state.error="";
            })
            .addCase(addcourseToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(updatecourseToJson.pending,(state)=>{})
            .addCase(updatecourseToJson.fulfilled,(state,action)=>{
                state.courseList=state.courseList.map((course)=>course.id===action.payload.id?action.payload:course)
                state.error="";
            })
            .addCase(updatecourseToJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(deletecourseFromJson.pending,(state)=>{})
            .addCase(deletecourseFromJson.fulfilled,(state,action)=>{
                state.courseList=state.courseList.filter((course)=>course.id!==action.payload.id);
                state.error="";
            })
            .addCase(deletecourseFromJson.rejected,(state,action)=>{
                state.error=action.payload.error;
            })
            .addCase(getEnrolledCoursesDetails.fulfilled, (state, action) => {
              state.enrolledCourses = action.payload;
              state.error = "";
            })
}
});

export const {addCourse,removecourse,updateCourse,setSelectedcourse } = courseSlice.actions;
export default courseSlice.reducer;


