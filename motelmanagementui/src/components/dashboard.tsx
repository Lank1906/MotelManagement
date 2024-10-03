import Search from "./search";

export default function Dashboard() {
    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content"> here is dashboard</div>
        </div>
    )
}