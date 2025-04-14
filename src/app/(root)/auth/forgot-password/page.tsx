'use client';

import { Buttons } from "@/components/fragments/Buttons";
import ForgotPassForm from "@/components/fragments/form/ForgotPassForm";
import { Icons } from "@/resource";
import { Button } from "@nextui-org/react";

export default function ForgotPassword() {
  return (
    <section>
      <div className="flex items-center justify-between relative z-50">
        <Button isIconOnly onPress={() => window.location.href = "/"} variant="bordered">
          <Icons.Back/>
        </Button>
        <div className="gap-2 flex items-center justify-between">
          <Buttons />
        </div>
      </div>
      <ForgotPassForm/>
    </section>
  );
}
