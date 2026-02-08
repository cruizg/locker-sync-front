import { auth } from "@/auth.config";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
        // redirect('/auth/login?returnTo=/perfil');
        redirect('/');
    }
    const avatarSrc = session.user?.logo || "/imgs/user-not-found.jpeg"; // Ruta de la imagen por defecto

    return (
        <div className="px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"> */}
            <div className="text-center mb-6">
                <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full mx-auto border-4 border-gray-200"
                />
                <h3 className="text-xl mt-4">{session.user.name}</h3>
                <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>

            <div className="grid  gap-4 px-20">
            <div className="bg-gray-200 p-4 rounded-md mb-10">
                <h4 className="text-sm font-medium text-gray-600">Rol</h4>
                <p className="text-lg font-semibold">{session.user.rol}</p>
                {/* </div> */}
            </div>
            <Link
                href={'/admin/change-password'}
                className="btn-primary w-full">
                Cambiar password
            </Link>
            </div>
        </div>
        // <div>
        //     <Title title="Perfil" />
        //     <pre>
        //         {
        //             JSON.stringify(session.user, null, 2)
        //         }
        //     </pre>
        //     <h3 className="text-3xl mb-10">{ session.user.rol }</h3>
        // </div>
    )
}

