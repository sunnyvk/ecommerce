
function Search({setData, data}) {
    return (
        <form className="d-flex" role="search">
        <input className="form-control me-2" onChange={(e) => setData(e.target.value)} value={data} type="search" placeholder="Search" aria-label="Search" />
        </form>
        )
}

export default Search;