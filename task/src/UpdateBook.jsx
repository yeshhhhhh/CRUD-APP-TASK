import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });
  const navigate = useNavigate;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localHost:3030/update/"+id, values)
      .then((res) => navigate("/"))
      .cath((res) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http//localhost:3030/getrecord/" + id)
      .then((res) =>
        setValues({
          ...values,
          publisher: res.data[0].publisher,
          name: res.data[0].name,
          date: res.data[0].date,
        })
      )
      .cath((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex align-items-center flex-coloumn mt-3">
      <h1>Update Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div class="mb-3 mt-3">
          <label for="publisher" class="form-label">
            Publisher
          </label>
          <input
            type="text"
            class="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            name="publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">
            Book Name:
          </label>
          <input
            type="text"
            class="form-control"
            value={values.name}
            placeholder="Enter Book Name"
            name="name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            class="form-control"
            name="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
