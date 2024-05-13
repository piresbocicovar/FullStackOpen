const PersonFilter = ( {personFilter, handleFilterChange} ) => {
    return(
        <div>
            filter: <input value={personFilter} onChange={handleFilterChange}/>
        </div>
    )
}

export default PersonFilter