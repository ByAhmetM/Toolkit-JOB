import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import Loader from "./../components/Loader";
import Card from "./../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobs);

  const fetchData = () => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError()));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="listContainer">
      <Filter jobs={state.jobs} />

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <p className="error">
          Üzgünüz verilere erişirken bir sorun oluştu
          <button onClick={fetchData} type="button" class="button">
            <span class="button__text">Yenile</span>
            <span class="button__icon">
              <img className="svg" src="refresh.svg" alt="" />
            </span>
          </button>
        </p>
      ) : (
        <div className="jobsContainer">
          {state.jobs?.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
