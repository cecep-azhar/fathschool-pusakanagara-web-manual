import ImageSchool from "../../public/bg.jpeg";
import SmknKawali from "../../public/Logo.png";
import FathSchoolLight from "../../public/FathSchool Light.png";
import FathSchoolDark from "../../public/FathSchool Dark.png";

export const Images = {
  ImageSchool,
  SmknKawali,
  FathSchoolLight,
  FathSchoolDark
};


import { RiLockPasswordLine, RiCustomerService2Line, RiUser3Line } from "react-icons/ri";
import { MdOutlineNotifications, MdLogout, MdOutlineEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineEyeOff  } from "react-icons/hi";
import { LuMoonStar, LuSun, LuClock8  } from "react-icons/lu";
import { IoSettingsOutline, IoChevronBackOutline } from "react-icons/io5"
import { TbCalendarClock } from "react-icons/tb";
import { BsInfo } from "react-icons/bs";
import { LiaPhoneSolid, LiaUserShieldSolid } from "react-icons/lia";

type IconProps = {
  size?: number;
  className?: string;
  color?: string;
};

const IconSize = 20

export const Icons = {
  Email: ({ size = IconSize, className = "", color }: IconProps) => (
    <MdOutlineEmail size={size} className={className} color={color} />
  ),
  Password: ({ size = IconSize, className = "", color }: IconProps) => (
    <RiLockPasswordLine size={size} className={className} color={color} />
  ),
  ShowEye: ({ size = IconSize, className = "", color }: IconProps) => (
    <MdOutlineRemoveRedEye size={size} className={className} color={color} />
  ),
  EyeOff: ({ size = IconSize, className = "", color }: IconProps) => (
    <HiOutlineEyeOff size={size} className={className} color={color} />
  ),
  Moon: ({ size = IconSize, className = "", color }: IconProps) => (
    <LuMoonStar size={size} className={className} color={color} />
  ),
  Sun: ({ size = IconSize, className = "", color }: IconProps) => (
    <LuSun size={size} className={className} color={color} />
  ),
  Customer: ({ size = IconSize, className = "", color }: IconProps) => (
    <RiCustomerService2Line size={size} className={className} color={color} />
  ), 
  User: ({ size = IconSize, className = "", color }: IconProps) => (
    <RiUser3Line size={size} className={className} color={color} />
  ),
  Logout: ({ size = IconSize, className = "", color }: IconProps) => (
    <MdLogout size={size} className={className} color={color} />
  ),
  Settings: ({ size = IconSize, className = "", color }: IconProps) => (
    <IoSettingsOutline size={size} className={className} color={color} />
  ),
  Notification: ({ size = IconSize, className = "", color }: IconProps) => (
    <MdOutlineNotifications size={size} className={className} color={color} />
  ),
  CalendarClock : ({ size = 18, className = "", color }: IconProps) => (
    <TbCalendarClock size={size} className={className} color={color} />
  ),
  Info : ({ size = IconSize, className = "", color }: IconProps) => (
    <BsInfo size={size} className={className} color={color} />
  ),
  Clock : ({ size = IconSize, className = "", color }: IconProps) => (
    <LuClock8 size={size} className={className} color={color} />
  ),
  Phone: ({ size = IconSize, className = "", color }: IconProps) => (
    <LiaPhoneSolid size={size} className={className} color={color} />
  ),
  Back: ({ size = IconSize, className = "", color }: IconProps) => (
    <IoChevronBackOutline size={size} className={className} color={color} />
  ),
  Role: ({ size = IconSize, className = "", color }: IconProps) => (
    <LiaUserShieldSolid size={size} className={className} color={color} />
  ),
};
