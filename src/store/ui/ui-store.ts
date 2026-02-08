import { create } from 'zustand'

interface State {

    isSideMenuOpen:boolean;
    openSideMenu:()=>void
    closeSideMenu:()=>void
}


export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen:false,
    openSideMenu:()=> set({isSideMenuOpen:true}),
    closeSideMenu:()=> set({isSideMenuOpen:false}),
    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 })
}))