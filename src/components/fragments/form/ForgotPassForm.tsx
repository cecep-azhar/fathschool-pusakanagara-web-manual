"use client";

import { Button, Image, Input } from "@nextui-org/react";
import { HeadlineForm } from "./HeadlineForm";
import { Icons, Images } from "@/resource";
import { useForgotPass } from "@/lib/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema, TypeForgotPassSchema } from "@/types/Schema";

const ForgotPassForm = () => {
  const { mutate, status } = useForgotPass();
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TypeForgotPassSchema>({
    mode: "all",
    resolver: zodResolver(forgotPassSchema),
  });

  const onSubmit: SubmitHandler<TypeForgotPassSchema> = (data) => {
    mutate(data)
    reset();
  };
 
  return (
    <div className="block pt-16 sm:pt-24 lg:flex justify-center gap-8 xl:gap-12">
      <div className="w-full hidden lg:flex items-center justify-center cursor-pointer">
        <Image
          isZoomed
          alt="Image"
          src={Images.ImageSchool.src}
          width={500}
          height={400}
        />
      </div>

      {/* Form */}
      <div className="flex h-full w-full py-8 items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <HeadlineForm
            title="Reset Password"
            desc="Masukkan No WhatsApp Anda untuk Memulai Proses Reset Password"
          />

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              startContent={<Icons.Phone />}
              labelPlacement="outside"
              label="No WhatsApp"
              placeholder="Masukan No WhatsApp Anda"
              type="text"
              variant="bordered"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
              {...register("phone")}
            />
            <div>
              <Button
                className="w-full font-semibold mt-2.5"
                color="primary"
                type="submit"
                isLoading={status === "loading"}
                isDisabled={status === "loading"}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassForm;
