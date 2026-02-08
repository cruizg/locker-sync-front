import { redirect } from 'next/navigation';
import { getLoginByUser } from "@/actions";
import ShopLayoutClient from './ShopLayoutClient';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
    const { ok, cliente } = await getLoginByUser();
    if (!ok) {
        redirect("/auth/login");
    }
    // console.log(cliente)
    // console.log("GAAAAAA")
    return <ShopLayoutClient cliente={cliente}>{children}</ShopLayoutClient>;
}