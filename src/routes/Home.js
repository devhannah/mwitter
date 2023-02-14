import { dbService } from "fBase";
import { query, serverTimestamp } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    console.log(userObj);
    const [ mweet, setMweet] = useState("");
    const [ mweets, setMweets ] = useState([]);
    /*
    const getMweets = async () => {
        const dbmweets = await getDocs(collection(dbService, "mweets"));
        // Querysnapshot을 return
        console.log(dbmweets);
        dbmweets.forEach(document=> {
            const mweetObject = {
                ...document.data(),
                id: document.id,
            }
            setMweets((prev) => [mweetObject, ...prev]);
        });
    }
    */
    useEffect(()=> {
        const q = query(collection(dbService, "mweets"), orderBy("createdAt","desc"));
        onSnapshot(q, (snapshot) => {
            const mweetArray = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))
            setMweets(mweetArray);
        })
        
    }, []) 
    const onSubmit = async (event) => {
        event.preventDefault()
        const docRef = await addDoc(collection(dbService, "mweets"), {
            text: mweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
        });
        setMweet("");
    };
    const onChange = (event) => {
        const { target : { value } } = event;
        setMweet(value);
    }
    console.log(mweets);
    return (
        <div>    
            <form onSubmit={onSubmit}>
                <input 
                    value={mweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}/>
                <input 
                    type="submit" 
                    value="Mweet" />
            </form>
            <div>
                {mweets.map((mweet, id) => (
                    <div key={id}>
                        <h4>{mweet.text}</h4>
                    </div>))}
            </div>
    </div>
    );
};
export default Home; 