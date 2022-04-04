import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode,useContext, useEffect } from "react";

interface SidebarDrawerProviderProps{
    children: ReactNode;
}

type SidebarDrawerProviderData = UseDisclosureReturn
const SidebarDrawerContext = createContext({} as UseDisclosureReturn);

export function SidebarDrawerProvider({children}:SidebarDrawerProviderProps ){
    const disClosure = useDisclosure();
    const router = useRouter();

    useEffect(() => {disClosure.onClose()},[router.asPath])

    return(
        <SidebarDrawerContext.Provider value={disClosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);