import '../styles/dropDown.css'; // Import your CSS file
interface Props {
  className?:string
  visible?:boolean
}


const Dropdown = ({className,visible }: Props) => {


  return (


    <ul className={`dropdown ${visible ? 'visible' : ''} ${className ? className :''}`}>
      <li className="dropdown-item">New Group</li>
      <li className="dropdown-item">New Broadcast</li>
      <li className="dropdown-item">WhatsApp Web</li>
      <li className="dropdown-item">Starred Messages</li>
      <li className="dropdown-item">Settings</li>
    </ul>



  )
}

export default Dropdown;
