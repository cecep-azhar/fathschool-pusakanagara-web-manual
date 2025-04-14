import { GetTime } from "@/lib/utils/moment";
import { Icons } from "@/resource";
import { Chip, ChipVariantProps } from "@nextui-org/react";
import { Actions } from "./Actions";
import { Greet } from "@/components/elements/Greet";

/**
 * This is a strongly typed React Functional Component that renders a hero
 * section. It takes no props and returns a React.ReactElement.
 *
 * @returns {React.ReactElement} A Hero component.
 */
export const Hero = ({
  greeting: { nameUser, description, role },
  actions: { In, Out, Leave },
}: Props): React.ReactElement => {
  const roleText =
    role === "Student"
      ? "Siswa"
      : role === "Teacher"
      ? "Guru"
      : role === "Administration"
      ? "Tata Usaha"
      : "Admin";

  const styleDefault: ChipVariantProps & {
    classNames: { base: string; content: string };
  } = {
    variant: "flat",
    classNames: {
      base: "px-4 py-2",
      content: "px-2",
    },
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-28">
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Chip
              startContent={<Icons.Role />}
              {...styleDefault}
              color="secondary"
            >
              <span>{roleText}</span>
            </Chip>
            <Chip
              startContent={<Icons.CalendarClock />}
              {...styleDefault}
              color="primary"
            >
              <span>{GetTime()}</span>
            </Chip>
            <Chip
              startContent={<Icons.Info />}
              {...styleDefault}
              color={
                Leave === "pending" ? "warning" : Leave === "accepted" ? "success" : !In && !Out ? "danger" : "success"
              }
            >
              {Leave === "pending" && "Menunggu Persetujuan"}
              {Leave === "accepted" && "Izin Disetujui"}
              
              {Leave === "rejected" && In && !Out && "Anda sudah Check In"}
              {Leave === "rejected" && In && Out && "Anda sudah Check Out"}
              {Leave === "rejected" && !In && !Out && "Belum Check In"}

              {Leave === "none" && In && !Out && "Anda sudah Check In"}
              {Leave === "none" && In && Out && "Anda sudah Check Out"}
              {Leave === "none" && !In && !Out && "Belum Check In"}
            </Chip>
          </div>

          <div className="my-4 sm:my-6">
            <Greet />
            <h2 className="sm:w-5/6 lg:w-3/4 mx-auto line-clamp-2 text-center">
              {nameUser}
            </h2>
          </div>
          <p className="sm:w-4/6 lg:w-3/5 mx-auto">
            {description ??
              "Bagi siswa dan guru yang tidak dapat menggunakan fitur biometrik dapat menggunakan fitur ini. Pastikan aktifasi lokasi sudah sesuai dengan area di sekolah."}
          </p>
        </div>

        <Actions checkIn={In} checkOut={Out} roleUser={role} leave={Leave} />
      </div>
    </section>
  );
};

type Props = {
  actions: {
    In: boolean;
    Out: boolean;
    Leave: string;
  };
  greeting: {
    nameUser: string;
    description: string;
    role: string;
  };
};
