"use client";

import { ModalLeave } from "@/components/fragments/modals/ModalLeave";
import {
  useCheckIn,
  useCheckOut,
  useQrin,
  useQrout,
} from "@/lib/hooks/useActions";
import { useGeolocation } from "@/lib/utils/useGeolocation";
import {
  Button,
  ButtonVariantProps,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useState, useEffect, useRef, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const defaultStyle: ButtonVariantProps & { className: string } = {
  size: "lg",
  variant: "shadow",
  className:
    "px-10 py-2 text-medium md:px-16 sm:py-3.5 text-white font-semibold",
};

type Props = {
  checkIn: boolean;
  checkOut: boolean;
  leave: string;
  roleUser: string;
};

export const Actions = ({ checkIn, checkOut, leave, roleUser }: Props) => {
  const { getLocation } = useGeolocation();
  const { In, loadIn } = useCheckIn();
  const { Out, loadOut } = useCheckOut();
  const { Qrin, loadQrin } = useQrin();
  const { Qrout, loadQrout } = useQrout();
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [scanMode, setScanMode] = useState<"qrin" | "qrout" | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleActionQrin = useCallback(
    async (qrCodeId: string) => {
      try {
        const locationData = await getLocation();
        if (!locationData) return;

        await Qrin({
          qr_code_id: qrCodeId,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });

        toast.success("Berhasil Check-in dengan QR");
      } catch {
        toast.error("Terjadi kesalahan saat check-in.");
      }
    },
    [getLocation, Qrin]
  );

  const handleActionQrout = useCallback(
    async (qrCodeId: string) => {
      try {
        const locationData = await getLocation();
        if (!locationData) return;

        await Qrout({
          qr_code_id: qrCodeId,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });

        toast.success("Berhasil Check-out dengan QR");
      } catch {
        toast.error("Terjadi kesalahan saat check-out.");
      }
    },
    [getLocation, Qrout]
  );

  const handleScan = useCallback(
    (data: { text?: string } | null) => {
      if (!data?.text) {
        toast.error("QR Code tidak valid atau tidak terbaca.");
        return;
      }

      let qrCodeId = data.text;
      try {
        const parsedData = JSON.parse(data.text);
        if (parsedData?.qr_code_id) {
          qrCodeId = parsedData.qr_code_id;
        }
      } catch {
        // QR Code bukan format JSON, gunakan langsung
      }

      setQrScannerOpen(false);

      if (scanMode === "qrin") {
        handleActionQrin(qrCodeId);
      } else if (scanMode === "qrout") {
        handleActionQrout(qrCodeId);
      }
    },
    [scanMode, handleActionQrin, handleActionQrout]
  );

useEffect(() => {
  if (qrScannerOpen) {
    const scanner = new Html5QrcodeScanner(
      "qr-scanner", 
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false // Pass `false` here to indicate we are not using `useWasm` mode
    );

    // Now we can use `render` for success and error handling
    scanner.render(
      (decodedText) => {
        handleScan({ text: decodedText });
      },
      () => {
        console.warn("QR Scan Error");
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }
}, [qrScannerOpen, handleScan]); // Ensure handleScan is included in the dependencies.


  const handleAction = async (actionType: "checkin" | "checkout") => {
    try {
      const locationData = await getLocation();
      if (!locationData) return;

      if (actionType === "checkin") {
        await In({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
        toast.success("Berhasil Check-in");
      } else {
        await Out({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
        toast.success("Berhasil Check-out");
      }
    } catch {
      toast.error("Terjadi kesalahan saat memproses aksi.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          <Button
            onPress={() => handleAction("checkin")}
            color="primary"
            {...defaultStyle}
            isDisabled={
              checkIn || checkOut || leave === "accepted" || leave === "pending"
            }
          >
            {loadIn ? "Memproses..." : "Datang"}
          </Button>
          <Button
            onPress={() => handleAction("checkout")}
            color="danger"
            {...defaultStyle}
            isDisabled={
              !checkIn ||
              checkOut ||
              leave === "accepted" ||
              leave === "pending"
            }
          >
            {loadOut ? "Memproses..." : "Pulang"}
          </Button>
          <Button onPress={onOpen} color="warning" {...defaultStyle}>
            Izin
          </Button>
        </div>

        {roleUser?.trim().toLowerCase() === "teacher" && (
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            <Button
              color="success"
              {...defaultStyle}
              onPress={() => {
                setScanMode("qrin");
                setQrScannerOpen(true);
              }}
              isDisabled={
                checkIn ||
                checkOut ||
                leave === "accepted" ||
                leave === "pending"
              }
            >
              {loadQrin ? "Memproses..." : "Masuk QR."}
            </Button>

            <Button
              color="secondary"
              {...defaultStyle}
              onPress={() => {
                setScanMode("qrout");
                setQrScannerOpen(true);
              }}
              isDisabled={
                !checkIn ||
                checkOut ||
                leave === "accepted" ||
                leave === "pending"
              }
            >
              {loadQrout ? "Memproses..." : "Keluar QR"}
            </Button>
          </div>
        )}
      </div>

      <ModalLeave
        modal={{ open: isOpen, close: onClose, OpenChange: onOpenChange }}
        role={roleUser}
      />

      <Modal
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        size="md"
      >
        <ModalContent>
          <ModalHeader>
            {scanMode === "qrin"
              ? "Scan QR untuk Masuk"
              : scanMode === "qrout"
              ? "Scan QR untuk Keluar"
              : "Scan QR"}
          </ModalHeader>
          <ModalBody>
            <div id="qr-scanner" ref={scannerRef}></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
