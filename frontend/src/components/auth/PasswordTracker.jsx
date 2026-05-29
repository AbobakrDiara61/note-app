import { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import FormContext from "../../contexts/FormContext";


const PasswordTracker = () => {
  const reqRef = useRef(null);
  const { password } = useContext(FormContext);

  const passwordRequirements = [
    { condition: password.length > 6, req: "At least 6 characters" },
    { condition: /[A-Z]/.test(password), req: "Contains uppercase letter" },
    { condition: /[a-z]/.test(password), req: "Contains lowercase letter" },
    { condition: /\d/.test(password), req: "Contains a number" },
    { condition: /[^A-Za-z0-9]/.test(password), req: "Contains special character" }
  ];
  const strength = passwordRequirements.filter(req => req.condition).length;
  const passwordStrength = () => {
    switch (strength) {
      case 1:
        return { colorStyle: "bg-red-500", msg: "Very Weak" };
      case 2:
        return { colorStyle: "bg-red-400", msg: "Weak" };
      case 3:
        return { colorStyle: "bg-yellow-400", msg: "Fair" };
      default:
        return { colorStyle: "bg-emerald-500", msg: "Strong" };
    }
  }
  return (
    <>
      <p className="text-white/60 text-sm flex justify-between items-center"><span>Password Strength</span> <span>{passwordStrength().msg}</span></p>
      <div className="flex items-center gap-2 my-4">
        {Array.from({ length: 4 }).map((_, index) =>
          <div key={`pass-progress-${index}`} className={`${index < strength ? passwordStrength().colorStyle : "bg-white/30"} h-1 rounded-lg flex-1 duration-500 transition-all`}>
          </div>
        )}
      </div>
      <ul className=' text-sm flex flex-col gap-2 *:flex *:gap-2.5' ref={reqRef}>
        {passwordRequirements.map(req => <li key={`pass-req-${req.req}`} className="*:first:size-5 font-medium" >
          {req.condition ? <FontAwesomeIcon icon={faCheck} className="text-emerald-500" /> : <FontAwesomeIcon icon={faXmark} className="text-white/60" />} <span className={`${req.condition ? "text-emerald-500" : "text-white/60"}`}>{req.req}</span></li>)}
      </ul>
    </>
  )
}

export default PasswordTracker