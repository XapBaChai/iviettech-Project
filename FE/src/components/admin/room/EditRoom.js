import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const EditRoom = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [categoryId, setCategory] = useState("");
  const { id } = useParams();
  
  let navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        let { data } = await axios.get(
          `http://localhost:8001/room/getRoomById?id=${id}`
        );
        setTitle(data.title);
        setPrice(data.price);
        setDiscount(data.discount);
        setDesc(data.desc);
        setCategory(data.categoryId);
        setPreview(data.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUser();
  }, []);

  

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        let { data } = await axios.get(
          `http://localhost:8001/categories/getAllCategories`
        );
        setCategories(data.getAllCategories);
        console.log("check data", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);
   z
  const updateRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("desc", desc);
    formData.append("categoryId", categoryId);
    formData.append("file", file);

    try {
      await axios.patch(
        `http://localhost:8001/room/updateRoom?id=${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      navigate("/room");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto px-4">
      {/* <div className=" xl:ml-20 xl:w-3/12 lg:w-7/12 md:w-6/12 xl:mb-12 lg:mb-96 md:mb-96"> */}
      <form>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0 text-slate-500">
            Edit Room
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-500 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-500 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-500 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="discount"
            name="discount"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-500 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="description"
            name="description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="mb-6">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Select Categories
          </label>
          <select
            id="countries"
            onChange={(e) => setCategory(e.target.value)}
            value={categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          > 
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-6">
          <input type="file" onChange={loadImage} />
        </div>
        {preview ? (
          <figure className="image is-128x128">
            <img src={preview} alt="Preview Image" />
          </figure>
        ) : (
          ""
        )}

        {/* <div className="text-gray-800">{data.msg}</div> */}

        <div className="flex justify-end mr-20 text-center lg:text-left mt-10">
          <button
            type="button"
            onClick={updateRoom}
            className="inline-block px-7 py-3 bg-slate-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800  active:shadow-lg transition duration-300 ease-in-out hover:scale-110"
          >
            Update Room
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default EditRoom;
