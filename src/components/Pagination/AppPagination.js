import { useEffect, useState, useCallback } from 'react'
import  Pagination  from "@mui/material/Pagination";
import "./App-Pagination.scss";

 


const AppPagination = ({setPage, pageNumber}) =>{


    const handleChange = (page) =>{
        setPage(page)
    } 
    
    return(
    <div className="container">
        <div className="root">
            <Pagination 
            onChange={(e) => handleChange(e.target.textContent)}
            style={{
                display:"flex",
                justifyContent: "center"

            }} variant="outlined" data-testid="count" count={pageNumber}/>
        </div>
    </div>

    )
}



export default AppPagination



















