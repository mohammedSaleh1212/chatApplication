import {  Outlet } from 'react-router-dom'


const Layout = () => {
    
return (
        <>
            <div className="outlet-container " style={{ paddingTop: '100px' }}>
                
                <Outlet />
            </div>
        </>
    ) 
  

    
}

export default Layout