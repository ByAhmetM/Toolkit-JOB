import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  jobs: [],
  mainJobs: [],
};
export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();
      const filtred = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );
      state.jobs = filtred;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;

        default:
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((i) => i.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setJobs,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
  deleteJob,
} = jobsSlice.actions;
export default jobsSlice.reducer;
