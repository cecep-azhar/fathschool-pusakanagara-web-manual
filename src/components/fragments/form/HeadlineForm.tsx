import { Images } from "@/resource";
import { JSX } from "react";
import Image from "next/image";

/**
 * * A React component that renders a headline with a logo of SMK Negeri 1 Kawali
 * 
 * @returns {JSX.Element} - The JSX element representing the headline.
 */
export const HeadlineForm: React.FC<{title: string; desc: string}> = (props): JSX.Element => {
  return (
    <div className="flex flex-col items-center pb-6">
      <Image src={Images.SmknKawali.src} alt="Image" width={90} height={90} blurDataURL={Images.SmknKawali.blurDataURL}  />
      <p className="text-xl font-bold mt-8 mb-2 dark:text-slate-100 text-slate-900">
        {props.title}
      </p>
      <p className="text-small text-default-500 w-3/4 text-center">
        {props.desc}
      </p>
    </div>
  );
};
