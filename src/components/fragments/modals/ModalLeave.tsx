import { useLeave, useLeaveTypes } from "@/lib/hooks/useActions";
import { leaveSchema, TypeLeaveSchema } from "@/types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type Props = {
  modal: {
    open: boolean;
    close: () => void;
    OpenChange: (isOpen: boolean) => void;
  }
  role?: string
}

interface ITypeLeave {
  id: number;
  role_type: string;
  name: string;
  slug: string;
}

export const ModalLeave = ({ modal: {open, OpenChange, close}, role }: Props): React.ReactElement => {
  const { data: leaveTypes, isLoading } = useLeaveTypes(role === 'Administration' ? 'staff' : role ?? '');
  const { mutate, isLoading: isLoadingLeave } = useLeave()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeLeaveSchema>({
    mode: "all",
    resolver: zodResolver(leaveSchema),
  });
  
  const onSubmit = (data: TypeLeaveSchema) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('leave_type_id', data.leave_type_id);
    formData.append('end', data.end);
    formData.append('description', data.description);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]); // Mengambil file pertama dari input type="file"
    }

    mutate(formData, {
      onError: () => reset(),
    });
    close()
  };
  
  return (
    <Modal isOpen={open} onOpenChange={OpenChange}  isKeyboardDismissDisabled={true} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              Pengajukan Izin
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Judul"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Masukkan judul pengajuan izin"
                    errorMessage={errors.title?.message?.toString()}
                    isInvalid={Boolean(errors.title)}
                    {...register("title")}
                  />
                   <Select label="Tipe Izin" labelPlacement="outside" placeholder="Pilih tipe anda" errorMessage={errors.leave_type_id?.message?.toString()} isInvalid={Boolean(errors.leave_type_id)} {...register("leave_type_id")}>
                    {isLoading ? <SelectItem value="">Loading...</SelectItem> : leaveTypes?.data?.length === 0 ? <SelectItem value="">Tidak ada tipe izin tersedia</SelectItem>  : (
                       leaveTypes?.data?.data?.map((leaveType: ITypeLeave) => (
                         <SelectItem key={leaveType.id} value={leaveType.id}>
                           {leaveType.name}
                         </SelectItem>
                       ))
                     )}
                    </Select>
                  <Input
                    label="Sampai Tanggal"
                    labelPlacement="outside"
                    type="date"
                    errorMessage={errors.end?.message?.toString()}
                    isInvalid={Boolean(errors.end)}
                    {...register("end")}
                  /> 
                  <Input
                    label="Gambar"
                    labelPlacement="outside"
                    type="file"
                    placeholder="Masukan Gambar"
                    description="Unggah dokumen atau gambar pendukung (opsional)"
                    errorMessage={errors.image?.message?.toString()}
                    isInvalid={Boolean(errors.image)}
                    {...register("image")}
                    
                  />
                  <Textarea
                    label="Keterangan Tambahan"
                    placeholder="Tuliskan keterangan tambahan terkait izin Anda"
                    labelPlacement="outside"
                    type="text"
                    errorMessage={errors.description?.message?.toString()}
                    isInvalid={Boolean(errors.description)}
                    {...register("description")}
                  />
                </div>
                <Button type="submit" color="warning" className="text-white mt-4 font-semibold mb-6" isLoading={isLoadingLeave} isDisabled={isLoadingLeave} fullWidth>
                  Submit
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
