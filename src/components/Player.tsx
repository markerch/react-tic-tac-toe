import { useState } from "react";

export default function Player({
  name,
  symbol,
  isActive,
  onNameChanged,
}: Readonly<{
  name: string;
  symbol: string;
  isActive: boolean;
  onNameChanged: (symbol: string, newName: string) => void;
}>) {
  const [currentName, setCurrentName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onNameChanged(symbol, currentName);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentName(event.target.value);

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{currentName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            defaultValue={currentName}
            onChange={handleChange}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
