// import React from "react";

export default function Card() {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "330px" }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">I will chnge this text in future!</p>
          <div className=" container w-100">
            <select className="m-2 h-100 bg-success">
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className=" m-2 h-100 bg-success">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
