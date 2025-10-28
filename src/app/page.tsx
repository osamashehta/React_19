
import Link from "next/link";

export default function Home() {

  return (
    <>

      <div className="container w-[95%] mx-auto my-12 ">
        <Link className="text-blue-800 underline" href="/onMutate">On Mutate Page</Link>
        <br />
        <Link className="text-blue-800 underline" href="/useOptimistic">Use Optimistic Page</Link>
        <br />
        <Link className="text-blue-800 underline" href="/">Home Page</Link>
      </div>
    </>
  );
}
