import { doc, getDoc, getFirestore } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaSuitcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



const Connection = ({ id }) => {
  const [dbData, setDbData] = useState({});
  const db = getFirestore();

  useEffect(() => {
    const getDb = async () => {
      const docRef = doc(db, "users", id);
      try {
        const docSnap = await getDoc(docRef);
        setDbData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    getDb();
  }, [id]);
  
  return (
    <div className="flex justify-between items-between rounded-sm border-t-2 mb-4 gap-6 p-4">
      <img
        className="rounded-full w-[70px] h-[70px]"
        src={dbData.imageUrl}
        alt=""
      />
      <div className="flex flex-row justify-around w-full">
        <div className="flex flex-col ">
          <p className="text-2xl font-bold text-[#E7AB9A]">{dbData.name}</p>
          <div className="flex items-center gap-2">
            <MdEmail />
            {dbData.email}
          </div>
        </div>
        <div className="flex w-[10vw] items-center justify-start gap-4 text-xl text-white ">
          <FaSuitcase />
          <p className="">{dbData.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default Connection;
