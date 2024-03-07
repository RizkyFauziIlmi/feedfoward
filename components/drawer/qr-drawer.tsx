import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";

interface QrDrawerProps {
  children: React.ReactNode;
  googleMapsUrl: string;
}

export const QrDrawer = ({ children, googleMapsUrl }: QrDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-accent">
        <DrawerHeader>
          <DrawerTitle>Scan QR Code to Open Map</DrawerTitle>
          <DrawerDescription>
            Use your device's camera to scan the QR code. This will open the
            location in your Google Maps app.
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full flex justify-center py-6">
          <div className="h-auto mx-0 my-auto max-w-64">
            <QRCode
              className="h-auto max-w-full w-full"
              value={googleMapsUrl}
            />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
