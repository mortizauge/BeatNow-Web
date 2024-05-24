import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../Layout/Header/Header";
import LeftSlide from "../../Layout/LeftSlide/LeftSlide";
import UserSingleton from "../../Model/UserSingleton";
import "./Dashboard.css";
import userSingleton from "../../Model/UserSingleton";

interface Post {
    _id: string;
    title: string;
    publication_date: string;
    likes: number;
    saves: number;
}

function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [popularPosts, setPopularPosts] = useState<Post[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const username = UserSingleton.getInstance().getUsername();
        const token = localStorage.getItem("token");

        axios.get(`http://217.182.70.161:6969/v1/api/users/posts/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                const data = response.data;
                setPosts(data);

                // Ordenar las publicaciones por la suma de likes y saves
                const sortedPosts = [...data].sort((a, b) => (b.likes + b.saves) - (a.likes + a.saves));
                setPopularPosts(sortedPosts);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    function handleClick() {
        window.location.href = "/Upload";
    }

    return (
        <div className="app">
            <Header/>
            <div className="leftSlide">
                <LeftSlide/>
            </div>
            <div className="content">
                <div className="dash-header">
                    <h1 className={"home"}>{UserSingleton.getInstance().getUsername()}'s dashboard</h1>
                    <button className={"uploadButton"} onClick={handleClick} title="Upload a beat">
                        <i className={"fa-solid fa-arrow-up-from-bracket"}/>
                    </button>
                    <h1 className={"rt-clock"}>{currentTime.toLocaleTimeString()}</h1>
                </div>
                <div className={"section-container"}>
                <h3>Recent Uploads</h3>
                <div className={"section-container"}>
                    {posts.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()).map(post => (
                        <div className="card" key={post._id}>
                            <img className={'post-picture'} src={`http://172.203.251.28/beatnow/${userSingleton.getInstance().getId()}/posts/${post._id}/caratula.jpg`} alt="Post" />
                            <h4><b>{post.title}</b></h4>
                            <p>{new Date(post.publication_date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                </div>
            <div className={"section-container"}>
                <h3>Popular Uploads</h3>
                <div className={"section-container"}>
                    {popularPosts.map(post => (
                        <div className="card" key={post._id}>
                            <img className={'post-picture'} src={`http://172.203.251.28/beatnow/${userSingleton.getInstance().getId()}/posts/${post._id}/caratula.jpg`} alt="Post" />
                            <h4><b>{post.title}</b></h4>
                            <p>{new Date(post.publication_date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Dashboard;