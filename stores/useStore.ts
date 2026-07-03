import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface User {
    first_name: string;
    last_name: string;
}


type AuthState = {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
    clearAccessToken: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({accessToken: token}),
            clearAccessToken: () => set({accessToken: null}),
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
)

interface StoreState {
    count: number;
    setCount: (value: number) => void;

    showNotification: boolean;
    setShowNotification: (value: boolean) => void;

    active: string;
    setActive: (value: string) => void;

    user: User;
    setUser: (value: User) => void;


    notes: string[];
    setNotes: (value: string[]) => void;

    endTime: number | null;
    setEndTime: (seconds: number) => void;
    clearEndTime: () => void;

    time_end: number | null;
    setTimeEnd: (timestamp: number | null) => void;

    accessToken: string | null;
    setAccessToken: (token: string) => void;


    otpToken: string | null;
    setOtpToken: (token: string | null) => void;

    otpTokenAttempt: number;
    setOtpTokenAttempt: (number: number) => void;

    accounts: object[];
    setAccounts: (val: object[]) => void;

    selectedAccount: string,
    setSelectedAccount: (val: string) => void;

    otpStore: string,
    setOtpStore: (val: string) => void;


}

export const Store = create<StoreState>()(persist((set) => ({

        count: 1,
        setCount: (value) => set({count: value}),

        showNotification: false,
        setShowNotification: (value) => set({showNotification: value}),

        active: '',
        setActive: (value) => set({active: value}),

        user: {
            first_name: 'Johnny',
            last_name: 'Doe',
        },
        setUser: (value) => set({user: value}),


        notes: [],
        setNotes: (value) => set({notes: value}),

        endTime: null,
        setEndTime: (seconds) => {
            const end = Date.now() + seconds * 1000;
            set({endTime: end});
        },
        clearEndTime: () => set({endTime: null}),

        time_end: null,
        setTimeEnd: (timestamp) => set({time_end: timestamp}),

        accessToken: null,
        setAccessToken: (token) => set({accessToken: token}),

        otpToken: null,
        setOtpToken: (token) => set({otpToken: token}),
        otpTokenAttempt: 0,
        setOtpTokenAttempt: (number) => set({otpTokenAttempt: number}),

        accounts: [],
        setAccounts: (val) => set({accounts: val}),

        selectedAccount: '',
        setSelectedAccount: (val) => set({selectedAccount: val}),


        otpStore: '',
        setOtpStore: (val) => set({otpStore: val}),


    }),
    {name: 'schema-manager-store'}));


type Toast = {
    id: number;
    message: string;
    status: 'success' | 'error' | 'info';
    visible: boolean;
};

type ToastStore = {
    toasts: Toast[];
    addToast: (message: string, status: 'success' | 'error' | 'info', id?: any) => void;
    hideToast: (id: number) => void;
    removeToast: (id: number) => void;
    setToastVisible: (id: number, visible: boolean) => void;
};

export const useToastStore = create<ToastStore>((set) => ({

    toasts: [],

    addToast: (message, status, idMain = null) => {

        const id = idMain || Date.now();


        set((state) => ({

            toasts: [...state.toasts, {id, message, status, visible: true}],

        }));


        // Start fade-out after 2.7s, remove after 3s
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.map((t) =>
                    t.id === id ? {...t, visible: false} : t
                ),
            }));
        }, 2700);

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 4000);
    },
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

    // setToastVisible: (id, visible) =>
    //     set((state) => ({
    //         toasts: state.toasts.map((toast) =>
    //             toast.id === id ? {...toast, visible} : toast
    //         ),
    //     })),
    setToastVisible: (id, visible) =>
        set((state) => {
            const newToasts = state.toasts.map((toast) => {
                if (toast.id === id) {
                    console.log('Updating toast id', id, 'visible:', visible);
                    return {...toast, visible};
                }
                return toast;
            });
            return {toasts: newToasts};
        }),


    hideToast: (id) =>
        set((state) => ({
            toasts: state.toasts.map((t) =>
                t.id === id ? {...t, visible: false} : t
            ),
        })),

    // removeToast: (id) =>
    //     set((state) => ({
    //         toasts: state.toasts.filter((t) => t.id !== id),
    //     })),

}));


type NormalStoreType = {
    search: string,
    setSearch: (search: string) => void
    track: string,
    setTrack: (track: string) => void

}


export const StateStore = create<NormalStoreType>((set) => ({

    search: '',
    setSearch: (value) => set({search: value}),
    track: '',
    setTrack: (value) => set({track: value}),

}));
