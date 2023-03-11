import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineNetworkCheck, MdSecurity } from "react-icons/md";

const Features = () => {
  return (
    <div id="features" className="py-12">
      <p className="text-5xl text-center font-bold underline decoration-blue-500 ">
        Features
      </p>
      <div class="bg-dotted-spacing-[22px] bg-dotted-gray-300 py-10 text-center">
        <p className="text-4xl font-bold mb-8">
          One stop solution to connect with your peers
        </p>

        <div className="flex gap-4 pt-8 justify-center">
          <div className="px-24   ">
            <p className="text-blue-500 font-bold  text-3xl  pb-4">
              <FaUserFriends className="inline mx-2" />
              Peer-2-Peer
            </p>
            <p className="  text-xl">
              Each user in the network is both a client as well as a server.
            </p>
          </div>
          <div className="px-24 ">
            <p className="text-blue-500 font-bold text-3xl  pb-4">
              <MdOutlineNetworkCheck className="inline mx-2" />
              Low Latency
            </p>
            <p className="   text-xl  mx-2">
              Due to its low network usage, ConnecTen provides real time
              iteraction and instant responses
            </p>
          </div>
          <div className="px-24 ">
            <p className="text-blue-500 font-bold text-3xl  pb-4">
              <MdSecurity className="inline" />
              Highly Secured
            </p>
            <p className="  text-xl mx-2 ">
              ConnecTen ensures security of your data. You control who can and
              cannot view your data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
