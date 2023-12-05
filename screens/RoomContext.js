import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";

const RoomContext = createContext();

export const RoomProvider = ({ children, gameFilter }) => {
  const [roomPosts, setRoomPosts] = useState([]);

  useEffect(() => {
    let query = db.collection("rooms");

    if (gameFilter) {
      query = query.where("game", "==", gameFilter);
    }

    const unsubscribe = query.onSnapshot((snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Fetched Data: ", roomsData); // Debugging log
      setRoomPosts(roomsData);
    });

    return () => unsubscribe();
  }, [gameFilter]); // useEffect hook'unun kapanış süslü parantezi burada olmalı

  // Oda ekleme
  const addRoomPost = async (title, content, userId, gameName) => {
    try {
      const newRoom = { title, content, createdBy: userId, game: gameName };
      await db.collection("rooms").add(newRoom);
    } catch (error) {
      console.error("Oda eklenirken hata oluştu: ", error);
    }
  };

  // Oda güncelleme
  const updateRoomPost = async (roomId, newTitle, newContent) => {
    try {
      await db.collection("rooms").doc(roomId).update({
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      console.error("Oda güncellenirken hata oluştu: ", error);
    }
  };

  // Oda silme
  const removeRoomPost = async (id) => {
    try {
      await db.collection("rooms").doc(id).delete();
    } catch (error) {
      console.error("Oda silinirken hata oluştu: ", error);
    }
  };

  return (
    <RoomContext.Provider
      value={{ data: roomPosts, addRoomPost, updateRoomPost, removeRoomPost }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
