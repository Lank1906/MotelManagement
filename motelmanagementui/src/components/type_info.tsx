export default function TypeInfo(){
    return (
        <div className="form">
            <div className="input">
                <label htmlFor="name">Ten loai</label><br/>
                <input type="text" name="name"/>
            </div>
            <div className="input">
                <label htmlFor="price">Gia phong</label><br/>
                <input type="number" name="price"/>
            </div>
            <div className="input">
                <label htmlFor="electric">So dien</label><br/>
                <input type="number" name="electric"/>
            </div>
            <div className="input">
                <label htmlFor="water">So nuoc</label><br/>
                <input type="text" name="water"/>
            </div>
            <div className="input">
                <label htmlFor="water-follow">Nuoc tinh theo </label><br/>
                <input type="text" name="water-follow"/>
            </div>
        </div>
    )
}