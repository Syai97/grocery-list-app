import * as React from "react"
import Header from "../../components/Header/header.component";

interface MainLayoutProps {
    children: React.ReactNode
}
 
const MainLayout: React.FC<MainLayoutProps> = (props) => {
    return ( 
        <>
        <Header/>
        {props.children}
        </>
     );
}
 
export default MainLayout;
