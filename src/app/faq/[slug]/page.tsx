import FAQSection from "@/components/faq/FAQSection";
import faqsApi from "@/services/faqs/faqs.service";

//Ahora ir a Strapi, y crear un Componente Anidado
export default async function FAQPage({params}: {params: {slug: string}}) {
  const fagPages = await faqsApi.getFAQPages();
  const fagPage = fagPages.data.find(page => page.slug === `/${params.slug}`)
  
  return (
    <>
    <main>
        <FAQSection sections={fagPages.data}/>
        <section className="flex flex-col">
            <h2>{fagPage?.title}</h2>
            <div>{fagPage?.body[0].children[0].text}</div>
        </section>
    </main>
    </>
  );
}
