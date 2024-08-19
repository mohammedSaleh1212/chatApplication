import {  Outlet } from 'react-router-dom'


const Layout = () => {
    
return (
        <>
            <div className="outlet-container container-fluid p-0 " style={{minHeight:'100vh'}}>
                
                <Outlet />
            </div>
        </>
    ) 
  

    
}

export default Layout