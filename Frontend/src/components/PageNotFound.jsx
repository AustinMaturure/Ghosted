import { Link } from "react-router-dom"

export default function PageNotFound(){
    return(
        <>
        <h1>You're in Another Dimension...</h1>
        <p>This page does not exsist, go back <Link to={'/'}>Home</Link></p>
        </>
    )
}