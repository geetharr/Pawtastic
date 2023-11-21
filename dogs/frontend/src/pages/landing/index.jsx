import { useEffect } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"

const Landing = ({ children, page })=> {
    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])
    return (
        <div>
            <Header page={page} />
            {children}
            <Footer />
        </div>
    )
}

export default Landing