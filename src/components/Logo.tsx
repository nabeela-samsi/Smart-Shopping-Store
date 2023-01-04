import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <div className="header__logo">
            <Link to={"/"}>
                <img src="/logo.svg" alt="Brand Logo" width={200}/>
            </Link>
        </div>
    )
}

export default Logo