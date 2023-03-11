import React from "react";
import qr from "../assets/qr.png";

const QRGenerator = () => {
  return (
    <div
      id="qr"
      className="bg-dotted-spacing-[22px] bg-dotted-gray-300 text-center py-4 text-gray-900"
    >
      <p className="text-5xl font-bold">Get the App</p>
      <div className=" flex items-center py-8 justify-around">
        <div>
          <p className="text-4xl font-bold pb-8 text-left">
            Download the ConnecTen App today by Scanning the QR
          </p>
          <p className="text-xl">
            Alternatively you can download from{" "}
            <span className="text-blue-500">
              <a href="">Here</a>
            </span>
          </p>
        </div>
        <div className="shadow-[5px_5px_0px_0px_rgba(59,130,246)]  max-w-xs  border-4 border-blue-500 rounded-lg">
          <img className="rounded-lg p-2 " src={qr} alt="" />
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
