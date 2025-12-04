import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
    const [addData, setAddData] = useState({
        title:"",
        body:"",
    });

    let isEmpty = Object.keys(updateDataApi).length === 0;

    // get the update data into the input field
    useEffect(()=>{
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || "",
        })
    }, [updateDataApi]);

    // e: event object: which data we want to add...
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return{
                ...prev,
                [name]: value,
            }
        })
    };

    // Form Submission
    const addPostData = async () => {
        const res = await postData(addData);
        console.log("res", res);
        if(res.status === 201){
            setData([...data, res.data])
            setAddData({ title: "", body: "" });
        }
    };

    // Update Post Data
    const updatePostData = async() =>{
        try{
            const res = await updateData(updateDataApi.id, addData);
            console.log(res);

            if(res.status === 200){
                setData((prev) =>{
                    // console.log(prev);
                    return prev.map((curElem) =>{
                        return curElem.id === res.data.id ? res.data : curElem; 
                    });
                });

                setAddData({ title: "", body: "" });
                setUpdateDataApi({});
            }
        } catch ({ error }){
            console.log(error);
        }
    }

    const handleFormSubmit = (e) => {
        // To prevent from reload the page, after submission of form
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "Add"){
            addPostData();
        }else if(action === "Edit"){
            updatePostData();
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input 
                type="text" 
                autoComplete="off" 
                id="title" 
                name="title" 
                placeholder="Add Title" 
                value={addData.title} 
                onChange={handleInputChange}/>
            </div>

            <div>
                <label htmlFor="body"></label>
                <input 
                type="text" 
                autoComplete="off" 
                placeholder="Add Post" 
                id="body" 
                name="body"
                value={addData.body}
                onChange={handleInputChange}/>
            </div>

            <button type="submit" value={isEmpty ? "Add" : "Edit"}>
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    )
};