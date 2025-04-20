import ContentProps from "../../interface/content_props";
import Search from "./search";

export default function Content({children}:ContentProps) {
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"><div className="like-search-content">This is an announce</div></div>
      </div>
      {children}
    </div>
  );
}
