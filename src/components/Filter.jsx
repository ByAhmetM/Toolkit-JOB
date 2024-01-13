import { useDispatch } from "react-redux";
import { sortOpt, typeOpt } from "../constant";
import { statusOpt } from "./../constant/index";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = ({ jobs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState();

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(filterBySearch({ field: "company", text })),
      1000
    );
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtrele</h2>
      <form>
        <div>
          <label>Şirket İsmine Göre Ara</label>
          <input
            onChange={(e) => setText(e.target.value)}
            list="company"
            type="text"
            name="company"
          />
          <datalist id="company">
            {jobs.map((job, i) => (
              <option key={i} value={job.company}></option>
            ))}
          </datalist>
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option hidden>Seçiniz</option>
            {statusOpt.map((a, i) => (
              <option key={i}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option hidden>Seçiniz</option>
            {typeOpt.map((a, i) => (
              <option key={i}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sıralama</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            {sortOpt.map((a, i) => (
              <option key={i}>{a}</option>
            ))}
          </select>
        </div>

        <div className="filtreBtn">
          <button onClick={() => dispatch(clearFilters())} type="reset">
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
            <span>Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
