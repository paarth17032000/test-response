import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { GetPeopleData } from "../../redux/actions/global";
import styles from "./style.module.css";
const Home = () => {
  const dataLimit = 10;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedPeoplesdata, setSortedPeoplesdata] = useState(null);
  const [sort, setSort] = useState("asc");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const Peoplesdata = useSelector((state) => state?.global?.peoplesdata);

  const doSorting = (res) => {
    if (sort === "asc") {
      assendingSort(res);
    } else {
      descendingSort(res);
    }
  };

  useEffect(() => {
    dispatch(GetPeopleData())
      .then((res) => {
        setSort("asc");
        doSorting(res);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const prevPage = () => {
    setCurrentPage((page) => page - 1);
    setLoading(true);
    if (search === "") {
      const query = `?page=${currentPage - 1}`;
      dispatch(GetPeopleData(query))
        .then((res) => {
          setLoading(false);
          doSorting(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      const query = `?search=${search}&page=${currentPage - 1}`;
      dispatch(GetPeopleData(query))
        .then((res) => {
          setLoading(false);
          doSorting(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
    setLoading(true);
    if (search === "") {
      const query = `?page=${currentPage + 1}`;
      dispatch(GetPeopleData(query))
        .then((res) => {
          setLoading(false);
          doSorting(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      const query = `?search=${search}&page=${currentPage + 1}`;
      dispatch(GetPeopleData(query))
        .then((res) => {
          setLoading(false);
          doSorting(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setLoading(true);
      setCurrentPage(1);
      dispatch(GetPeopleData())
        .then((res) => {
          setLoading(false);
          doSorting(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };

  const handleSearch = () => {
    const query = `?search=${search}`;
    setLoading(true);
    setCurrentPage(1);
    dispatch(GetPeopleData(query))
      .then((res) => {
        setLoading(false);
        doSorting(res);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const descendingSort = (res) => {
    setSort("desc");
    if (res) {
      const sortedData = res?.results.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setSortedPeoplesdata(sortedData);
    } else {
      const sortedData = Peoplesdata?.results.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setSortedPeoplesdata(sortedData);
    }
  };

  const assendingSort = (res) => {
    setSort("asc");
    if (res) {
      const sortedData = res?.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setSortedPeoplesdata(sortedData);
    } else {
      const sortedData = Peoplesdata?.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setSortedPeoplesdata(sortedData);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.tableHeader}>
        <div>Total count: {Peoplesdata?.count}</div>
        <div className="d-flex align-items-center">
          <input
            value={search}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="search name"
          />
          <button
            disabled={search.length < 1}
            onClick={handleSearch}
            className="btn btn-primary mx-2"
          >
            Search
          </button>
        </div>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>S.No.</th>
            <th
              className={styles.cursorPointer}
              onClick={
                sort === "asc"
                  ? () => descendingSort(null)
                  : () => assendingSort(null)
              }
            >
              <span>Name</span>
              <span className="mx-4">
                {sort === "asc" ? (
                  <i className="fa-solid fa-arrow-down-a-z"></i>
                ) : (
                  <i className="fa-solid fa-arrow-up-a-z"></i>
                )}
              </span>
            </th>
            <th>Icon</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <div className="d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-3x fa-spinner"></i>
                <span className="mx-3">Loading...</span>
              </div>
            </tr>
          ) : sortedPeoplesdata && sortedPeoplesdata?.length > 0 ? (
            sortedPeoplesdata?.map((val, index) => {
              return (
                <tr key={index}>
                  <td>
                    {currentPage * dataLimit - dataLimit + index + 1 + "."}
                  </td>
                  <td>{val?.name}</td>
                  <th>
                    {val?.species[0] === "https://swapi.dev/api/species/1/" ? (
                      <i class="fa-solid fa-2x fa-circle-user"></i>
                    ) : val?.species[0] ===
                      "https://swapi.dev/api/species/2/" ? (
                      <i class="fa-brands fa-2x fa-android"></i>
                    ) : (
                      <i class="fa-solid fa-2x fa-question"></i>
                    )}
                  </th>
                  <td>{val?.height}</td>
                  <td>{val?.mass}</td>
                  <td>{val?.hair_color}</td>
                  <td>{val?.skin_color}</td>
                  <td>{val?.eye_color}</td>
                  <td>{val?.birth_year}</td>
                  <td>{val?.gender}</td>
                </tr>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-3x fa-triangle-exclamation"></i>
              <span>No data found</span>
            </div>
          )}
          {error === null ? null : (
            <div className="d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-3x fa-circle-exclamation"></i>
              <span>Something went wrong!</span>
            </div>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center my-2">
        <button
          disabled={Peoplesdata?.previous === null || currentPage === 1}
          className="btn btn-primary mx-3"
          onClick={() => dispatch(prevPage())}
        >
          Prev
        </button>
        <button
          disabled={Peoplesdata?.next === null}
          className="btn btn-primary mx-3"
          onClick={() => dispatch(nextPage())}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
