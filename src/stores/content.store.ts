import { create } from 'zustand';

export type Page = 'accueil' | 'technos' | 'projets' | 'contact';

interface ContentStore {
    page: Page;

    setPage: (page: Page) => void;
}


export const useContentStore = create<ContentStore>((set) => ({
    page: (localStorage.getItem('page-portfolio') !== null ? localStorage.getItem('page-portfolio') as Page : 'accueil'),
    setPage: (page: Page) => {
        set({ page });
        localStorage.setItem('page-portfolio', page);
    },
}));