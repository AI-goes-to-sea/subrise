
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "./logo";

interface SidebarSubredditSearchProps {
  visible: boolean;
  setVisible: () => void;
  className?: string;
}

export default function SidebarSubredditSearch({ visible, setVisible, className }: SidebarSubredditSearchProps) {
  return (
    <Sheet open={visible} onOpenChange={setVisible}>
      <SheetContent
        side="left"
        role="navigation"
        className="bg-white"
        iconClass="text-black w-6 h-6"
      >
        <SheetHeader>
          <SheetTitle className="h-16 py-2 border-b border-zinc-200">
            <Logo />
          </SheetTitle>
          <SheetDescription asChild>
            
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}