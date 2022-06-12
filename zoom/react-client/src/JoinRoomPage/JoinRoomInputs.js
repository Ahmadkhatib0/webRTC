import React from "react";

const Input = ({ value, changeHandler, placeholder }) => {
  return (
    <input
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
      className="join_room_input"
    />
  );
};

const JoinRoomInputs = (props) => {
  const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
    props;

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.targe.value);
  };
  const handleNameValueChange = (event) => {
    setNameValue(event.targe.value);
  };
  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          placeholder="Enter meeting ID"
          value={roomIdValue}
          changeHandler={handleRoomIdValueChange}
        />
      )}
      <Input
        placeholder="Enter your Name"
        value={nameValue}
        changeHandler={handleNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInputs;
