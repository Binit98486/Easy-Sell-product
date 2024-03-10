import Card from "@/components/card";
import createClient  from "@/utils/superbase/server";

export const revalidate = 3600
const Home = async () => {
  const supabase = createClient();
  const { data } = await (await supabase).from("easysell-products ").select();
  const { data:boostedProduct } = await (await supabase).from("easysell-products ").select().eq("boost",true);




  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
            {boostedProduct ? boostedProduct.map((item: any) => (

              <Card key={item.id} {...item} imageUrl={item.imageUrl} />
            )) :<p>No products available</p>}
          
          </div>
        </div>

        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data && data.map((item: any) => (

              <Card key={item.id} {...item} imageUrl={item.imageUrl} />
            ))}

          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
    </main>
  );
}

export default Home