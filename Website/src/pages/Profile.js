import React, { useEffect, useState } from "react";
import { FaSuitcase } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import coin from "../assets/coin.png";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import Connection from "../components/Connection";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useUserAuth();
  const [dbData, setDbData] = useState({});
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const getDb = async () => {
      const docRef = doc(db, "users", user?.uid);
      try {
        const docSnap = await getDoc(docRef);
        setDbData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };
    getDb();
  }, [user]);

  console.log(user);

  return (
    <div className="font-roboto pl-20 pr-20 bg-[#111827] h-[100vh] text-white">
      <div className="flex justify-between items-center pt-6 pb-8">
        <div className="px-8">
          <p className=" text-5xl font-bold mb-3">{dbData.name}</p>
          <div className="flex flex-col justify-start items-start gap-6 text-gray-500 font-light">
            <div className="flex items-center gap-2 text-xl">
              <div className="flex items-center gap-3 text-xl mr-3">
                <MdEmail />
                {dbData.email}
              </div>
              <FaSuitcase />
              {dbData.designation}
            </div>
            <div className="flex items-center gap-2 text-xl">
              <img
                className="w-8 bg-gray-500 rounded-full "
                src={coin}
                alt=""
              />{" "}
              <p className="text-4xl">{dbData.coins}</p>
            </div>
          </div>
        </div>
        <div className="px-12">
          <button className="relative mr-5 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              onClick={() => navigate("/")}
            >
              Go Back
            </span>
          </button>
        </div>
      </div>


      <div className="flex flex-col py-10 px-8 ">
        <div className="justify-center items-center flex">
          <p className=" text-5xl font-bold mb-10">Your ConnecTen</p>
        </div>
        {dbData.connectedList?.map((connect) => {
          return <Connection key={connect} id={connect} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
