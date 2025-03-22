import ContentProps from "../../interface/content_props";
import Search from "./search";

export default function Content({children}:ContentProps) {
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"><div className="like-search-content">This is like search</div></div>
      </div>
      {children}
    </div>
  );
}
