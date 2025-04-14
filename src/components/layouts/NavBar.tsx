import { Button } from "@nextui-org/react";
import { RiCustomerService2Line, RiMoonCloudyLine } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="py-2 flex justify-end">
      <div>
        <Button isIconOnly variant="light">
          <RiCustomerService2Line size={22}/>
        </Button>
        <Button isIconOnly variant="light">
          <RiMoonCloudyLine size={22}/>
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;