import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import z from "zod";

export async function generateMetadata({ params }: { params: { cabinId: string } }) {
    const { name } = await getCabin(params.cabinId);
    return { title: `Cabin ${name}` }
}

export async function generateStaticParams() {
    const cabins = await getCabins()
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }))
    return ids
}

const CabinSchema = z.object({
    id: z.number(),
    name: z.string(),
    maxCapacity: z.number(),
    regularPrice: z.number(),
    discount: z.number(),
    image: z.string(),
    description: z.string(),
});

export type SafeCabinType = z.infer<typeof CabinSchema>;

export default async function Page({ params }: { params: { cabinId: string } }) {
    const cabin = await getCabin(params.cabinId);

    const safeCabin = CabinSchema.safeParse(cabin);
    if (!safeCabin.success) throw new Error("Cabin not found");
    const { id, name, maxCapacity, regularPrice, discount, image, description } = safeCabin.data;


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="flex flex-col md:grid md:grid-cols-[3fr_4fr] gap-2 xs:gap-8 md:gap-20 border border-primary-800 py-3 px-3 sm:px-7 md:px-10 mb-24">
                <div className="relative md:scale-[1.15] md:-translate-x-3 min-h-[35vh]">
                    <Image src={image} fill className="object-cover" alt={`Cabin ${name}`} />
                </div>

                <div>
                    <h3 className="text-center text-accent-100 font-black text-4xl md:text-7xl mb-5 p-6 pb-1 md:translate-x-[-254px] bg-primary-950 md:w-[150%]">
                        Cabin {name}
                    </h3>

                    <p className="text-lg text-primary-300 mb-10">{description}</p>

                    <ul className="flex flex-col gap-4 mb-7">
                        <li className="flex gap-3 items-center">
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                                guests
                            </span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <MapPinIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Located in the heart of the{" "}
                                <span className="font-bold">Dolomites</span> (Italy)
                            </span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Privacy <span className="font-bold">100%</span> guaranteed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-2xl md:text-5xl pb-4 font-semibold text-center">
                    Reserve today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={safeCabin.data} />
                </Suspense>
            </div>
        </div>
    );
}
