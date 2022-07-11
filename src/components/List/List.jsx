import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { db } from "../../firebase-config";
import "./list.scoped.css";

export default function List({ title, listRef }) {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);

  //rendering tasks(todo) from firestore
  useEffect(() => {
    let q = query(
      collection(db, "tasks"),
      where("list_ref", "==", listRef),
      where("isCompleted", "==", false),
      orderBy("timestamp", "asc")
    );

    onSnapshot(q, (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().task,
          isCompleted: doc.data().isCompleted,
        }))
      );
    });
  }, [items, listRef]);

  //rendering tasks(done) from firestore
  useEffect(() => {
    let q = query(
      collection(db, "tasks"),
      where("list_ref", "==", listRef),
      where("isCompleted", "==", true)
    );

    onSnapshot(q, (snapshot) => {
      setCompleted(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().task,
          isCompleted: doc.data().isCompleted,
        }))
      );
    });
  });

  async function addItem(inputText) {
    if (inputText === "") {
      alert("cannot be blank!");
    } else {
      // setItems((prevItems) => {
      //   return [...prevItems, inputText];
      // });
      await addDoc(collection(db, "tasks"), {
        task: inputText,
        isCompleted: false,
        list_ref: listRef,
        timestamp: serverTimestamp(),
      });
    }
  }

  function handleChange(e) {
    const newValue = e.target.value;
    setInputText(newValue);
  }

  async function markCompleted(item) {
    // setItems((prevItems) => {
    //   return prevItems.filter((item, index) => {
    //     return index !== id;
    //   });
    // });

    setCompleted((prevItems) => [...prevItems, item]);
    await updateDoc(doc(db, "tasks", item.id), {
      isCompleted: true,
    });
  }

  function deleteTask(task) {
    deleteDoc(doc(db, "tasks", task.id));
  }

  return (
    <div className="list">
      <div className="heading">
        <h1>{title}</h1>
      </div>
      <div className="form">
        <input type="text" value={inputText} onChange={handleChange} />
        <button
          className="add"
          onClick={() => {
            addItem(inputText);
            setInputText("");
          }}
        >
          <span>Add</span>
        </button>
        <ListGroup className="custom-list" variant="flush">
          {items.map((listItem, index) => {
            return (
              <ListGroup.Item
                action
                onClick={() => markCompleted(listItem)}
                key={index}
              >
                <XCircle
                  className="delete-icon"
                  onClick={() => deleteTask(listItem)}
                />{" "}
                {listItem.content}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      {completed.length !== 0 ? (
        <div className="heading completed">
          <h2>{"done"}</h2>
          <Badge bg="dark">{completed.length}</Badge>
        </div>
      ) : (
        ""
      )}
      <ListGroup
        className="custom-list"
        variant="flush"
        style={{ textDecorationLine: "line-through" }}
      >
        {completed.map((listItem, index) => {
          return (
            <ListGroup.Item variant="success" key={index}>
              <XCircle
                className="delete-icon"
                onClick={() => deleteTask(listItem)}
              />{" "}
              {listItem.content}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
