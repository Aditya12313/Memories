import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Form from "../components/Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-2">
          <Posts />
        </div>

        <div>
          <Form />
        </div>

      </div>

    </div>
  );
}