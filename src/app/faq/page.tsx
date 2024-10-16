import FAQSection from "@/components/faq/FAQSection";
import faqsApi from "@/services/faqs/faqs.service";

export default async function FAQPage() {
  const fagPages = await faqsApi.getFAQPages();

  return (
    <>
    <main>
        <FAQSection sections={fagPages.data}/>
    </main>
    </>
  );
}
