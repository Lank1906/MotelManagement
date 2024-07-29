import RoomCard from "./roomcard";
import Search from "./search";

export default function Content() {
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"></div>
      </div>
      <div className="body-content">
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
}
