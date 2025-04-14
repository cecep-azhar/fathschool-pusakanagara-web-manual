"use client";

import { useGetSettings } from "@/lib/hooks/useGetSettings";
import { useTheme } from "@/lib/utils/useTheme";
import { Icons } from "@/resource";
import { Button, Tooltip,   Popover, PopoverContent, PopoverTrigger, } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

/**
 * * Buttons component that renders two icon-only buttons with tooltips.
 *
 * - The first button toggles the theme between dark and light modes.
 * - The second button links to a WhatsApp chat with a predefined phone number and message.
 *
 * @returns {JSX.Element} A JSX element containing the buttons.
 */
export const Buttons = () => {
  const { data } = useGetSettings();
  const { isDarkMode: isTheme, toggleDarkMode: toggleTheme } = useTheme();
  const url = `https://api.whatsapp.com/send?phone=${data?.data.data?.app_phone ?? "6281321828144"}&text=Hallo%20Admin`;
  
  const clock = data?.data.data.time_settings
  const ClockMasuk = clock?.time_in
  const ClockPulang = clock?.time_out

  return (
    <>
      <Tooltip content="Thema" placement="bottom">
        <Button isIconOnly onPress={toggleTheme} variant="bordered">
          {isTheme ? <Icons.Sun /> : <Icons.Moon />}
        </Button>
      </Tooltip>

      <Popover placement="bottom">
        <PopoverTrigger>
          <Button isIconOnly variant="bordered">
            <Icons.Clock />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">
              {ClockMasuk?.slice(0, 5) || "00:00"} -{" "}
              {ClockPulang?.slice(0, 5) || "00:00"}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Tooltip content="Hubungi Customer" placement="bottom">
        <Button
          isIconOnly
          as={Link}
          href={url}
          target="_blank"
          variant="bordered"
        >
          <Icons.Customer />
        </Button>
      </Tooltip>
    </>
  );
};
