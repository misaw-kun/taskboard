import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import List from "../List/List";
import ListModal from "../ListModal/ListModal";
import "./taskboard.scoped.css";

import { auth, db } from "../../firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Taskboard({ user }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      currentUser = currentUser ?? "";
      let q = query(
        collection(db, "lists"),
        orderBy("timestamp", "desc"),
        where("userId", "==", currentUser.uid)
      );
      onSnapshot(q, (snapshot) => {
        setLists(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: currentUser.uid,
            data: doc.data().title,
          }))
        );
      });
    });
  }, [lists]);

  function addList(newList) {
    // setLists((prevLists) => {
    //   return [...prevLists, newList];
    // });

    addDoc(collection(db, "lists"), {
      title: newList.title,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <Container className="background" fluid>
      <ListModal onAdd={addList} />
      {lists.map((listItem, index) => {
        return <List key={index} listRef={listItem.id} title={listItem.data} />;
      })}
    </Container>
  );
}
