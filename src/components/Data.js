import React from "react";

const DataRectangle = ({ label, count, color }) => {
    const formatCount=(count)=>{
        if(count >= 1000000){
            return  `${(count/1000000).toFixed(1)}M`
        }
        else {
            return count;
          }
    }
    console.log(count)

  return (
    <div className="rounded-lg flex justify-between shadow-md" style={{backgroundColor: color}}>
          <p className="ml-2 text-2xl font-semibold text-black-800">{label}:</p>
        <div className="ml-2 pl-2 bg-white p-1 rounded">
          <p className="text-2xl font-bold text-black-600">{formatCount(count)}</p>
        </div>
      </div>
  );
};

export default DataRectangle;
