import { deletePost, getPost } from "../api/PostApi";
import { useEffect, useState } from "react";
import "../App.css"
import { Form } from "./Form";

export const Post = () => {

    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

    // Handle getPost method
    // console.log(getPost());
    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    };

    useEffect(() => {
        getPostData();
    }, []);

    // handle delte method
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            // console.log(res);
            if (res.status === 200) {
                const newUpdatedPost = data.filter((curPost) => {
                    return curPost.id !== id;
                })
                setData(newUpdatedPost);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // handle update method
    const handleUpdtePost = (curElem) => setUpdateDataApi(curElem);

    return (
        <>
            <section className="section-form">
                {/* Pass props */}
                <Form
                    data={data}
                    setData={setData}
                    updateDataApi={updateDataApi}
                    setUpdateDataApi={setUpdateDataApi}
                />
            </section>
            <section className="section-post">
                <ol>
                    {
                        data.map((curElem) => {
                            // Distructure
                            const { id, body, title } = curElem;
                            return <li key={id}>
                                <p>Title: {title}</p>
                                <p>Body: {body}</p>
                                <button onClick={() => handleUpdtePost(curElem)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                            </li>;
                        })}
                </ol>
            </section>
        </>
    )
}