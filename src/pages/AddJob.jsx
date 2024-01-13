import { toast } from "react-toastify";
import { statusOpt, typeOpt } from "./../constant/index";
import { v4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store) => store.jobs);
  console.log(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError()));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.id = v4();
    data.date = new Date().toLocaleDateString();

    axios
      .post("http://localhost:4500/jobs", data)
      .then(() => {
        navigate("/");
        dispatch(createJob(data));
        toast.success("Ekleme İşlemi Başarılı");
      })
      .catch((err) => dispatch(setError()));
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" type="text" name="position" required />
            <datalist id="positions">
              {state.jobs.map((job, i) => (
                <option key={i} value={job.position}></option>
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="companies" type="text" name="company" required />
            <datalist id="companies">
              {state.jobs.map((job, i) => (
                <option key={i} value={job.company}></option>
              ))}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="locations" type="text" name="location" required />
            <datalist id="locations">
              {state.jobs.map((job, i) => (
                <option key={i} value={job.location}></option>
              ))}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOpt.map((a, i) => (
                <option key={i}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOpt.map((a, i) => (
                <option key={i}>{a}</option>
              ))}
            </select>
          </div>

          <div className="eklemebtn">
            <button type="submit">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Oluştur</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
