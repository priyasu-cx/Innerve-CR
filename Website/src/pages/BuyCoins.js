import { ethers } from "ethers";
import { useState, useEffect } from "react";
import React from "react";
import abi from "../constants/abi.json";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

const BuyCoins = () => {
  const [muser, setMuser] = useState("");
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [error, setError] = useState("");
  const [dbData, setDbData] = useState({});
  const [greeting, setGreeting] = useState("Connect Wallet");
  const { user, authState } = useUserAuth();
  const contractAddress = "0x027fc52f721E932B1B480D3C728ca83e24975857";
  const db = getFirestore();

  const provider = new ethers.BrowserProvider(window.ethereum);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setMuser(accounts[0]);
    }
  };
  const getDb = async () => {
    const docRef = doc(db, "users", user?.uid);
    try {
      const docSnap = await getDoc(docRef);
      setDbData(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccChange = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setMuser(accounts[0]);
  };

  const handleBuy = async () => {
    if (!muser) {
      setGreeting("Connecting");
      if (window.ethereum) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setMuser(accounts[0]);
      }
      setGreeting("Buy");
    } else {
      try {
        setGreeting("Loading");
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress, abi, signer);
        let _price = price.toString();
        setFinalPrice(_price);

        const tx = await signer.sendTransaction({
          to: "0x83f5ebac3c2806ef448946c19a371076b6a6d0ca",
          value: ethers.parseEther(_price),
        });
        setGreeting("Processing");
        let receipt = await tx.wait();
        handleCoins();
        setGreeting("Buy");
        console.log("Transaction Complete", receipt);
      } catch (error) {
        console.log(error);
        setGreeting("Buy");
      }
    }
  };

  const handleCoins = async () => {
    setError("");
    let change = 500 * finalPrice;

    try {
      const docRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(docRef, {
          coins: dbData?.coins + change,
        });
        getDb();
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const changePrice = (operation) => {
    if (!operation) {
      if (price > 0) setPrice(price - 1);
    } else setPrice(price + 1);
  };
  useEffect(() => {
    if (muser) setGreeting("Buy");
  }, []);

  useEffect(() => {
    getDb();
  }, [user]);

  return (
    <div className="bg-gray-900 bg-dotted-spacing-[40px] bg-dotted-gray-500 text-white py-10">
      <p className="text-5xl font-bold text-center py-10 ">
        Buy ConnecTen Burst Tokens
      </p>
      <div className="text-center m-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {/* <h5 className="mb-4 text-3xl font-black text-white uppercase">
          Burst Tokens
        </h5> */}

        <div className="flex flex-col  justify-center items-center text-gray-900 dark:text-white">
          <span className="text-5xl font-bold tracking-tight">1 5ire</span>
          <span className="ml-1 text-2xl font-normal text-gray-700 dark:text-gray-400">
            =
          </span>
          <span className="ml-1 text-xl font-normal text-white">
            500 burst tokens
          </span>
        </div>

        <div className="w-[40%] mt-12 m-auto flex  justify-evenly items-center mb-12 py-1 border-2 border-white rounded-sm">
          <button
            className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
            onClick={() => changePrice(false)}
          >
            -
          </button>
          <input
            type="number"
            className="w-[40%] scrolling  m-auto outline-none bg-inherit text-center"
            value={price}
          />
          <button
            className="hover:bg-gray-500 px-2 text-xl rounded-sm text-center font-bold"
            onClick={() => changePrice(true)}
          >
            +
          </button>
        </div>
        <div className="text-center pb-4">
          {!muser ? (
            <div className="addr">{muser}</div>
          ) : (
            <div className="addr text-2xl">
              {muser.substring(0, 4) + "..." + muser.substring(38)}
            </div>
          )}
        </div>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-lg px-4 py-2 inline-flex justify-center w-full text-center"
          onClick={handleBuy}
        >
          {greeting}
        </button>
        {/* <button onClick={handleCoins}>change</button> */}
      </div>
    </div>
  );
};

export default BuyCoins;
