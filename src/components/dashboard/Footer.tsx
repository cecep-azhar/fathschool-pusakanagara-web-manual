import { Images } from "@/resource";
import Image from "next/image";
import { JSX } from "react";

/**
 * Footer component that returns a JSX.Element.
 *
 * @returns {JSX.Element} The JSX element representing the footer.
 */
export const Footer: React.FC = (): JSX.Element => {

  return (
    <footer className="pt-6 border-t">

      <div className="flex items-center justify-between flex-col gap-4 sm:flex-row">
        <div className="block dark:hidden">
          <Image src={Images.FathSchoolDark} alt="Image" width={170} height={170} />
        </div>
        <div className="hidden dark:block">
          <Image src={Images.FathSchoolLight} alt="Image" width={170} height={170} />
        </div>
        <small className="font-semibold text-medium text-center">Copyright &copy; {new Date().getFullYear()} by FathSchool</small>
      </div>

    </footer>
  );
}
