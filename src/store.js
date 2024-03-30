import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import CourseReducer from "./slices/CourseSlice";
import AnnouncementReducer from "./slices/AnnouncementSlice";
import TopicReducer from "./slices/TopicSlice";
import MaterialReducer from "./slices/MaterialSlice";
import AssessmentReducer from "./slices/AssessmentSlice";
import QuestionReducer from "./slices/QuestionSlice";
import ReportReducer from "./slices/ReportSlice";
import PublishReducer from "./slices/PublishSlice";
import AssessmentCompletedReducer from "./slices/AssessmentCompletedSlice";
export const store=configureStore({
    reducer:{
        user:UserReducer,
        course:CourseReducer,
        announcement:AnnouncementReducer,
        topic:TopicReducer,
        material:MaterialReducer,
        assessment:AssessmentReducer,
        question:QuestionReducer,
        report:ReportReducer,
        publish:PublishReducer,
        assessmentCompleted:AssessmentCompletedReducer,
    },
})