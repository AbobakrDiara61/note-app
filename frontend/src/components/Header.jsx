import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <header className="bg-base p-4 mb-5">
            <div className="main-container flex justify-between items-center">
                <h1 className="text-xl md:text-2xl text-primary tracking-wide font-bold font-mono">ThinkBoard</h1>
                <Link to='/create' className="text-sm font-medium text-black bg-primary hover:bg-primary-hover outline-0 focus:outline-0 py-1.5 md:py-2 px-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5" >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">New Note</span>    
                </Link>
            </div>
        </header>
    );
};

export default Header;
