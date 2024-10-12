import Single from "../../components/single/Single"
import SingleUser from "../../components/single/SingleUser"
import { singleUser } from "../../data"
import "./user.scss"

const User = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="user">
      <SingleUser {...singleUser}/>
    </div>
  )
}

export default User