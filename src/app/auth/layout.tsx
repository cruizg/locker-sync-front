import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();
    // console.log({ session });
    if (session?.user) {
        redirect('/');
    }

    return (
        <main className="flex justify-center"
            style={{
                // backgroundImage: `url('/imgs/background2.png')`, // Ajusta la ruta según tu estructura
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="w-full sm:w-[350px] px-10"
            >
                {children}
            </div>
        </main>

    )
}